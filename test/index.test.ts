import anyTest, {TestInterface} from 'ava';
import fs from 'fs';
import {Yahoo} from '../src';

const configFile = './test/symbols.test.json';
const host = process.env.ELASTIC_HOST as string;
const test = anyTest as TestInterface<{bot: Yahoo}>;

test.serial.before(t => {
  const data = fs.readFileSync(configFile, {encoding: 'utf8'});
  const symbols = JSON.parse(data).symbols;
  t.context = {bot: new Yahoo(symbols, host, {headless: true, slowMo: 300})};
});

test.serial('starts puppeteer', async t => {
  await t.context.bot.scrape();
  t.pass();
});

test.serial('saves results in Elasticsearch', async t => {
  // t.context.bot.save();
  t.pass();
});
