(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var ErrorType;
(function (ErrorType) {
    ErrorType[ErrorType["UNEXPECTED_ERROR"] = 0] = "UNEXPECTED_ERROR";
    ErrorType[ErrorType["INVALID_PARAMS"] = 1] = "INVALID_PARAMS";
})(ErrorType = exports.ErrorType || (exports.ErrorType = {}));

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(3);
module.exports = __webpack_require__(4);


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var express = __webpack_require__(0);
var ApiController_1 = __webpack_require__(5);
var port = 5858;
var app = express();
app.use(ApiController_1.default);
app.listen(port, function () {
    console.log("Server (worker " + process.pid + ") running on port " + port);
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var HttpRequestError_1 = __webpack_require__(6);
var ErrorType_1 = __webpack_require__(1);
var bodyParser = __webpack_require__(8);
var express_1 = __webpack_require__(0);
var expressValidator = __webpack_require__(9);
var router = express_1.Router();
router.use(bodyParser.json());
router.use(expressValidator());
router.get('/ping', function (req, res) {
    res.json({ time: +new Date() });
});
router.post('/v1/catch', function (req, res) {
    res.json({ time: +new Date() });
});
router.use(function (req, res, next) {
    return res.status(404).json({ error: 'Not found' });
});
router.use(function (err, req, res, next) {
    if (err instanceof HttpRequestError_1.HttpRequestError) {
        res.status(400).json(err);
        return;
    }
    res.status(err.status || 500);
    // log.error('Internal error(%d): %s',res.statusCode,err.message);
    res.json(new HttpRequestError_1.HttpRequestError(ErrorType_1.ErrorType.UNEXPECTED_ERROR, err.message));
});
exports.default = router;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
Object.defineProperty(exports, "__esModule", { value: true });
var BaseError_1 = __webpack_require__(7);
var ErrorType_1 = __webpack_require__(1);
var HttpRequestError = /** @class */function (_super) {
    __extends(HttpRequestError, _super);
    function HttpRequestError(errorType, details) {
        var _this = _super.call(this) || this;
        _this.error = {
            code: errorType,
            details: details || { messsage: ErrorType_1.ErrorType[errorType] }
        };
        if (typeof _this.error.details === 'string') {
            _this.error.details = { messsage: _this.error.details };
        }
        return _this;
    }
    return HttpRequestError;
}(BaseError_1.default);
exports.HttpRequestError = HttpRequestError;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var BaseError = /** @class */function () {
    function BaseError() {
        Error.apply(this, arguments);
    }
    return BaseError;
}();
exports.default = BaseError;
BaseError.prototype = new Error();

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("express-validator");

/***/ })
/******/ ])));
//# sourceMappingURL=server.js.map