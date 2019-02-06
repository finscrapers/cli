#!/usr/bin/env node
"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
exports.__esModule = true;
var commander_1 = __importDefault(require("commander"));
var fs_1 = __importDefault(require("fs"));
var package_json_1 = require("../package.json");
var src_1 = require("../src");
(function () { return __awaiter(_this, void 0, void 0, function () {
    var data, symbols, host, options, bot;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                commander_1["default"]
                    .description('run Puppeteer bot on Yahoo Finance and save results to Elasticsearch')
                    .version(package_json_1.version)
                    .option('-e, --elasticsearch [value]', 'Path to Elasticsearch host, defaults to http://localhost:9200', function (input) { return input; })
                    .option('-s, --symbols <items>', 'Relative path of the files with the symbols to scrape, e.g. ~/symbols.json', function (input) { return input; })
                    .option('-h, --headless', 'Runs Puppeteer in headless mode if the flag is given. You will not see the browser', function (input) { return input; })
                    .option('-m, --slowMo [value]', 'Slows down Puppeteer operations by the specified amount of milliseconds', function (input) { return input; })
                    .parse(process.argv);
                data = fs_1["default"].readFileSync(commander_1["default"].symbols || './symbols.json', {
                    encoding: 'utf8'
                });
                symbols = JSON.parse(data).symbols;
                host = commander_1["default"].elasticsearch;
                options = {
                    headless: commander_1["default"].headless || false,
                    slowMo: Number(commander_1["default"].slowMo) || 300
                };
                bot = new src_1.Yahoo(symbols, host, options);
                return [4 /*yield*/, bot.scrape()];
            case 1:
                _a.sent();
                return [4 /*yield*/, bot.save()];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })();
//# sourceMappingURL=finscrapers.js.map