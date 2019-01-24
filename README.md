# finscrapers [![Build Status](https://travis-ci.org/finscrapers/finscrapers.svg?branch=master)](https://travis-ci.org/finscrapers/finscrapers)

Finscrapers is a [Node-based](https://nodejs.org/) CLI that helps investors to scrape data from websites with [Puppeteer](https://pptr.dev). That is how private investors can take sophisticated decisions based on facts, instead of solely gut instincts. Without paying thousands of dollars for a [Bloomberg Terminal](https://en.wikipedia.org/wiki/Bloomberg_Terminal). Instead Finscrapers will collect data from a financial website and save them to [Elasticsearch](https://www.elastic.co/) to display them in any report, or dashboard. The best is, it's free and open source!

Currently supported financial sources:

- [Yahoo Finance](https://finance.yahoo.com)

## Installation

Add Finscrapers as global package.

```bash
npm install -g @finscrapers/finscrapers
```

## Usage

### 1. See `--help`

Run the script with Node and you will see flags listed below.

```bash
finscrapers --help`
```

| Flag                | Required                        | Description                                                             | Example                           |
| ------------------- | ------------------------------- | ----------------------------------------------------------------------- | --------------------------------- |
| --elasticsearch, -e | yes                             | Path to Elasticsearch host, default is http://localhost:9200            | https://myelasticsearchserver.com |
| --symbols, -s       | no (defaults to ./symbols.json) | Relative path of the files with the symbols to scrape                   | `~/symbols.json`                  |
| --headless, -h      | no                              | Runs Puppeteer in headless mode (you will not see the browser)          |                                   |
| --slowMo, -m        | no (defaults to 300)            | Slows down Puppeteer operations by the specified amount of milliseconds | 1000                              |

### 2. Start Elasticsearch server

Take the manual installation route with [Elasticsearch Reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html), easier, but more costly, subscribe [Elasticsearch Service](https://www.elastic.co/cloud) or [AWS Elasticsearch Service](https://aws.amazon.com/de/elasticsearch-service/).

### 3. Configure `symbols.json`

A file containing the symbols needs to be created before executing the script. Let's create a file called `symbols.json`:

```json
{
  "symbols": ["IBM", "MSFT", "FB", "AMZN"]
}
```

### 4. Run Finscrapers:

```bash
finscrapers -e https://myelasticsearchserver.com -s symbols.json
```

### 5. Run Kibana:

You need to install Kibana, as mentioned in the section **Start Elasticsearch server**, investigate the data, and finally invest like Warren Buffet. If you get rich, don't forget to buy us a coffee.

## Legal disclaimer

We are not affiliated with Oath (EMEA) Limited. Please make yourself familiar with [Yahoo Terms](https://policies.yahoo.com/us/en/yahoo/terms/index.htm) before using finscrapers-cli.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
