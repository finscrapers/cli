import * as elasticsearch from 'elasticsearch';
import {Bot, IBotData} from './';
import {IMeta, IOptions, ISymbol} from './interfaces';
import {Types, validate} from './models';

export default class Yahoo extends Bot {
  constructor(symbols: string[], host: string, options: IOptions) {
    super(symbols, host, options);
  }

  public async scrape(): Promise<void> {
    // Initialize puppeteer
    await this.launch();
    if (this.browser) {
      const page = this.page;
      const symbols = this.symbols;
      if (!page) {
        return Promise.reject(new Error('Puppeteer not initialized'));
      }

      // Visit Yahoo
      try {
        await page.goto('https://finance.yahoo.com/');

        // Click on consent
        const consent = await page.$('button[name=agree]');
        if (consent) {
          await consent.click();
          await page.waitForSelector('#app');
        }

        // Saving results for return value
        const result: object[] = [];

        // Iterate symbols
        let i: number = 0;
        for (const symbol of symbols) {
          await page.goto(`https://finance.yahoo.com/quote/${symbol}`);
          await page.waitForSelector('#Main table');

          // Scrape Summary page
          const summary = await page.$$eval(
            '#Main table tbody tr',
            (rows, shallowSymbol) => {
              const obj: object = {Symbol: shallowSymbol};
              // Iterate through table
              Array.from(rows).map(row => {
                (obj as any)[`${row.children[0].textContent}`] = `${
                  row.children[1].textContent
                }`;
              });
              return obj;
            },
            // symbol injected in $$eval function
            symbol,
          );
          result[i] = summary;

          // Scrape Historical Data Page
          await page.goto(`https://finance.yahoo.com/quote/${symbol}/history`);
          await page.waitForSelector('#Main table');

          // Scroll down to load data
          await page.evaluate(() => {
            window.scrollBy(0, window.innerHeight * 10);
          });

          // Scrape pricing table
          const prices = await page.$$eval(
            '#Main table tbody tr',
            (rows, symbolShadow) => {
              const obj: any = {Symbol: symbolShadow, Prices: []};
              Array.from(rows).map(row => {
                const price: object = {};
                (price as any)[`${row.children[0].textContent}`] = `${
                  row.children[1].textContent
                }`;
                obj.Prices.push(price);
              });
              return obj;
            },
            symbol,
          );
          // Assign prices to result map
          Object.assign(result[i], prices);

          // Iterate
          i++;
        }
        this.data = result;
        await this.browser.close();
      } catch (error) {
        this.browser.close();
        return Promise.reject(new Error('Puppeteer error: ' + error));
      }
    }
    return Promise.resolve();
  }

  // Saves scraped data to Elasticsearch
  public async save(): Promise<ISymbol[]> {
    const model = {
      '1y Target Est': Types.number,
      '52 Week Range': Types.string,
      Ask: Types.string,
      'Avg. Volume': Types.number,
      'Beta (3Y Monthly)': Types.number,
      Bid: Types.string,
      'EPS (TTM)': Types.number,
      'Earnings Date': Types.string,
      'Ex-Dividend Date': Types.string,
      'Forward Dividend & Yield': Types.string,
      'Market Cap': Types.string,
      Open: Types.number,
      'PE Ratio (TTM)': Types.number,
      'Previous Close': Types.number,
      Prices: Types.array(Types.number, {key: 'Date', value: 'Price'}),
      Symbol: Types.string,
      Volume: Types.number,
    };
    const client = new elasticsearch.Client({
      host: this.host,
      // log: 'trace',
    });

    const toOperations = (
      meta: IMeta,
      source: ISymbol[],
      modelShadow: object,
    ) => {
      const ops: object[] = [];
      source.map((row: ISymbol) => {
        ops.push(
          {index: {_index: meta.index, _type: meta.type, _id: row.Symbol}},
          validate({...row}, modelShadow),
        );
      });
      return ops;
    };
    try {
      await client.bulk({
        body: toOperations({index: 'symbols', type: '_doc'}, this.data, model),
      });
    } catch (error) {
      throw new Error(error);
    }
    return Promise.resolve(this.data);
  }
}
