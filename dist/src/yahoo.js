"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var elasticsearch = __importStar(require("elasticsearch"));
var _1 = require("./");
var models_1 = require("./models");
var Yahoo = /** @class */ (function (_super) {
    __extends(Yahoo, _super);
    function Yahoo(symbols, host, options) {
        return _super.call(this, symbols, host, options) || this;
    }
    Yahoo.prototype.scrape = function () {
        return __awaiter(this, void 0, void 0, function () {
            var page, symbols, consent, result, i, _i, symbols_1, symbol, summary, prices;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Initialize puppeteer
                    return [4 /*yield*/, this.launch()];
                    case 1:
                        // Initialize puppeteer
                        _a.sent();
                        if (!this.browser) return [3 /*break*/, 17];
                        page = this.page;
                        symbols = this.symbols;
                        if (!page) {
                            return [2 /*return*/, Promise.reject(new Error('Puppeteer not initialized'))];
                        }
                        // Visit Yahoo
                        return [4 /*yield*/, page.goto('https://finance.yahoo.com/')];
                    case 2:
                        // Visit Yahoo
                        _a.sent();
                        return [4 /*yield*/, page.$('button[name=agree]')];
                    case 3:
                        consent = _a.sent();
                        if (!consent) return [3 /*break*/, 6];
                        return [4 /*yield*/, consent.click()];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, page.waitForSelector('#app')];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        result = [];
                        i = 0;
                        _i = 0, symbols_1 = symbols;
                        _a.label = 7;
                    case 7:
                        if (!(_i < symbols_1.length)) return [3 /*break*/, 15];
                        symbol = symbols_1[_i];
                        return [4 /*yield*/, page.goto("https://finance.yahoo.com/quote/" + symbol)];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, page.waitForSelector('#Main table')];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, page.$$eval('#Main table tbody tr', function (rows, shallowSymbol) {
                                var obj = { Symbol: shallowSymbol };
                                // Iterate through table
                                Array.from(rows).map(function (row) {
                                    obj["" + row.children[0].textContent] = "" + row.children[1].textContent;
                                });
                                return obj;
                            }, 
                            // symbol injected in $$eval function
                            symbol)];
                    case 10:
                        summary = _a.sent();
                        result[i] = summary;
                        // Scrape Historical Data Page
                        return [4 /*yield*/, page.goto("https://finance.yahoo.com/quote/" + symbol + "/history")];
                    case 11:
                        // Scrape Historical Data Page
                        _a.sent();
                        return [4 /*yield*/, page.waitForSelector('#Main table')];
                    case 12:
                        _a.sent();
                        // Scroll down to load data
                        page.evaluate(function () {
                            window.scrollBy(0, window.innerHeight * 10);
                        });
                        return [4 /*yield*/, page.$$eval('#Main table tbody tr', function (rows, symbolShadow) {
                                var obj = { Symbol: symbolShadow, Prices: [] };
                                Array.from(rows).map(function (row) {
                                    var price = {};
                                    price["" + row.children[0].textContent] = "" + row.children[1].textContent;
                                    obj.Prices.push(price);
                                });
                                return obj;
                            }, symbol)];
                    case 13:
                        prices = _a.sent();
                        // Assign prices to result map
                        Object.assign(result[i], prices);
                        // Iterate
                        i++;
                        _a.label = 14;
                    case 14:
                        _i++;
                        return [3 /*break*/, 7];
                    case 15:
                        this.data = result;
                        return [4 /*yield*/, this.browser.close()];
                    case 16:
                        _a.sent();
                        _a.label = 17;
                    case 17: return [2 /*return*/, Promise.resolve()];
                }
            });
        });
    };
    // Saves scraped data to Elasticsearch
    Yahoo.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            var model, client, toOperations, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        model = {
                            '1y Target Est': models_1.Types.number,
                            '52 Week Range': models_1.Types.string,
                            Ask: models_1.Types.string,
                            'Avg. Volume': models_1.Types.number,
                            'Beta (3Y Monthly)': models_1.Types.number,
                            Bid: models_1.Types.string,
                            'EPS (TTM)': models_1.Types.number,
                            'Earnings Date': models_1.Types.string,
                            'Ex-Dividend Date': models_1.Types.string,
                            'Forward Dividend & Yield': models_1.Types.string,
                            'Market Cap': models_1.Types.string,
                            Open: models_1.Types.number,
                            'PE Ratio (TTM)': models_1.Types.number,
                            'Previous Close': models_1.Types.number,
                            Prices: models_1.Types.array(models_1.Types.number, { key: 'Date', value: 'Price' }),
                            Symbol: models_1.Types.string,
                            Volume: models_1.Types.number
                        };
                        client = new elasticsearch.Client({
                            host: this.host
                        });
                        toOperations = function (meta, source, modelShadow) {
                            var ops = [];
                            source.map(function (row) {
                                ops.push({ index: { _index: meta.index, _type: meta.type, _id: row.Symbol } }, models_1.validate(__assign({}, row), modelShadow));
                            });
                            return ops;
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, client.bulk({
                                body: toOperations({ index: 'symbols', type: '_doc' }, this.data, model)
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        throw new Error(error_1);
                    case 4: return [2 /*return*/, Promise.resolve(this.data)];
                }
            });
        });
    };
    return Yahoo;
}(_1.Bot));
exports["default"] = Yahoo;
//# sourceMappingURL=yahoo.js.map