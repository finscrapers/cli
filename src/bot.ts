import puppeteer from 'puppeteer';
import {IOptions, ISymbol} from './interfaces';

export default abstract class Bot {
  // Puppeteer browser object
  protected browser: puppeteer.Browser | undefined;
  // Store for scraped data
  protected data: ISymbol[];
  // Elasticsearch host
  protected host: string;
  // Puppeteer page object
  protected page: puppeteer.Page | undefined;
  // Storing symbols to scrape
  protected symbols: string[];
  // Run in headless mode?
  protected headless: boolean;
  // Slow down puppeteer
  protected slowMo: number;

  // Constructor, initializing symbols array
  constructor(symbols: string[], host: string, options: IOptions) {
    this.headless = options ? options.headless : false;
    this.slowMo = options ? options.slowMo : 300;
    this.host = host ? host : 'http://localhost:9200';
    this.symbols = symbols;
    this.page = undefined;
    this.data = [{}];
  }

  // Needs to be implemented by bots
  public abstract async scrape(): Promise<void>;

  // Launching puppeteer and returning page object
  protected async launch(): Promise<void> {
    this.browser = await puppeteer.launch({
      args: ['--no-sandbox'],
      headless: this.headless,
      slowMo: this.slowMo,
    });
    this.page = await this.browser.newPage();
  }
}
