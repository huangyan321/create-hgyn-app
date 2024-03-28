'use strict';

var yParser = require('yargs-parser');
var chalk = require('chalk');
var execa = require('execa');
var path = require('path');
require('@clack/prompts');

var name = "create-dnk-cms";
var version$1 = "1.0.0";
var description = "";
var main = "dist/index.js";
var types = "dist/index.d.ts";
var type = "module";
var bin = {
	"create-dnk-cms": "bin/create-dnk-cms.js"
};
var scripts = {
	build: "rollup -c rollup.config.js"
};
var files = [
	"dist",
	"templates"
];
var publishConfig = {
	access: "public"
};
var keywords = [
	"cli",
	"dnk",
	"Dnake"
];
var author = "";
var license = "MIT";
var dependencies = {
	"@clack/prompts": "^0.7.0",
	chalk: "^5.3.0",
	execa: "^8.0.1",
	"yargs-parser": "^21.1.1"
};
var devDependencies = {
	"@rollup/plugin-commonjs": "^25.0.7",
	"@rollup/plugin-json": "^6.1.0",
	"@rollup/plugin-node-resolve": "^15.2.3",
	"@rollup/plugin-typescript": "^11.1.6",
	"@types/node": "^20.11.30",
	"@types/yargs-parser": "^21.0.3",
	rollup: "^4.13.1",
	"rollup-plugin-node-builtins": "^2.1.2",
	"rollup-plugin-node-globals": "^1.4.0",
	tslib: "^2.6.2"
};
var pkg = {
	name: name,
	version: version$1,
	description: description,
	main: main,
	types: types,
	type: type,
	bin: bin,
	scripts: scripts,
	files: files,
	publishConfig: publishConfig,
	keywords: keywords,
	author: author,
	license: license,
	dependencies: dependencies,
	devDependencies: devDependencies
};

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/** @format */
var ERegistry;
(function (ERegistry) {
    ERegistry["npm"] = "https://registry.npmjs.com/";
    ERegistry["taobao"] = "https://registry.npmmirror.com/";
})(ERegistry || (ERegistry = {}));

/** @format */
function getGitInfo() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, username, email;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Promise.all([
                            execa.execaCommand('git config --global user.name'),
                            execa.execaCommand('git config --global user.email'),
                        ])];
                case 1:
                    _a = _b.sent(), username = _a[0].stdout, email = _a[1].stdout;
                    return [2 /*return*/, { username: username, email: email }];
                case 2:
                    _b.sent();
                    return [2 /*return*/, {
                            username: '',
                            email: '',
                        }];
                case 3: return [2 /*return*/];
            }
        });
    });
}

var ENpmClient;
(function (ENpmClient) {
    ENpmClient["npm"] = "npm";
    ENpmClient["cnpm"] = "cnpm";
    ENpmClient["tnpm"] = "tnpm";
    ENpmClient["yarn"] = "yarn";
    ENpmClient["pnpm"] = "pnpm";
})(ENpmClient || (ENpmClient = {}));
var ETemplate;
(function (ETemplate) {
    ETemplate["cms"] = "cms";
})(ETemplate || (ETemplate = {}));
var DEFAULT_DATA = {
    name: 'create-dnk-cms',
    email: '1604549268@qq.com',
    author: 'dnk',
    version: pkg.version,
    npmClient: ENpmClient.npm,
    registry: ERegistry.npm,
    withHusky: false,
    extraNpmrc: '',
    appTemplate: ETemplate.cms,
};
var run = (function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var name, _c;
    var cwd = _b.cwd, args = _b.args, _d = _b.defaultData, defaultData = _d === void 0 ? DEFAULT_DATA : _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                name = args._[0];
                ENpmClient.pnpm;
                ERegistry.npm;
                (defaultData === null || defaultData === void 0 ? void 0 : defaultData.appTemplate) || ETemplate.cms;
                return [4 /*yield*/, getGitInfo()];
            case 1:
                _c = _e.sent(), _c.username, _c.email;
                name ? path.join(cwd, name + '') : cwd;
                return [2 /*return*/];
        }
    });
}); });

/** @format */
var args = yParser(process.argv.slice(2), {
    alias: {
        version: ['v'],
        help: ['h'],
    },
    boolean: ['version'],
});
if (args.version && !args._[0]) {
    args._[0] = 'version';
    var local = chalk.cyan('@local');
    var name_1 = pkg.name, version = pkg.version;
    console.log("".concat(name_1, "@").concat(version).concat(local));
}
else {
    run({
        cwd: process.cwd(),
        args: args,
    }).catch(function (err) {
        console.error("Create failed, ".concat(err.message));
        console.error(err);
    });
}
