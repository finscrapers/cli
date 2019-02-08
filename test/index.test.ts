import anyTest, {TestInterface} from 'ava';
import fs from 'fs';
import {Yahoo} from '../src';

const configFile = './test/symbols.test.json';
const host = process.env.ELASTIC_HOST as string;
const test = anyTest as TestInterface<{bot: Yahoo}>;

test.serial.before(t => {
  const data = fs.readFileSync(configFile, {encoding: 'utf8'});
  const symbols = JSON.parse(data).symbols;
  const opts = JSON.parse(data).opts || {headless: true, slowMo: 300};
  t.context = {bot: new Yahoo(symbols, host, opts)};
});

test.serial('starts puppeteer', async t => {
  await t.context.bot.scrape();
  t.pass();
});
