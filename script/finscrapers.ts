#!/usr/bin/env node

import program from 'commander';
import fs from 'fs';
import {Yahoo} from '../src';
import {IOptions} from '../src/interfaces';

(async () => {
  program
    .description(
      'run Puppeteer bot on Yahoo Finance and save results to Elasticsearch',
    )
    .version('1.0.0')
    .option(
      '-e, --elasticsearch [value]',
      'Path to Elasticsearch host, defaults to http://localhost:9200',
      input => input,
    )
    .option(
      '-s, --symbols <items>',
      'Relative path of the files with the symbols to scrape, e.g. ~/symbols.json',
      input => input,
    )
    .option(
      '-h, --headless',
      'Runs Puppeteer in headless mode if the flag is given. You will not see the browser',
      input => input,
    )
    .option(
      '-m, --slowMo [value]',
      'Slows down Puppeteer operations by the specified amount of milliseconds',
      input => input,
    )
    .parse(process.argv);

  const data = fs.readFileSync(program.symbols || './symbols.json', {
    encoding: 'utf8',
  });
  const symbols = JSON.parse(data).symbols;
  const host = program.elasticsearch;
  const options: IOptions = {
    headless: program.headless || false,
    slowMo: Number(program.slowMo) || 300,
  };
  const bot = new Yahoo(symbols, host, options);
  await bot.scrape();
  await bot.save();
})();
