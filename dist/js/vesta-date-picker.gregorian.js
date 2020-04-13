/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/ts/vesta-date-picker-gregorian-calendar.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/ts/vesta-date-picker-date.ts":
/*!******************************************!*\
  !*** ./src/ts/vesta-date-picker-date.ts ***!
  \******************************************/
/*! exports provided: VestaDatePickerDate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"VestaDatePickerDate\", function() { return VestaDatePickerDate; });\nvar VestaDatePickerDate = /** @class */ (function () {\n    function VestaDatePickerDate(year, month, day) {\n        this.day = day;\n        this.month = month;\n        this.year = year;\n    }\n    return VestaDatePickerDate;\n}());\n\n\n\n//# sourceURL=webpack:///./src/ts/vesta-date-picker-date.ts?");

/***/ }),

/***/ "./src/ts/vesta-date-picker-fdow.enum.ts":
/*!***********************************************!*\
  !*** ./src/ts/vesta-date-picker-fdow.enum.ts ***!
  \***********************************************/
/*! exports provided: VestaDatePickerFirstDayOfWeek */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"VestaDatePickerFirstDayOfWeek\", function() { return VestaDatePickerFirstDayOfWeek; });\nvar VestaDatePickerFirstDayOfWeek;\n(function (VestaDatePickerFirstDayOfWeek) {\n    VestaDatePickerFirstDayOfWeek[VestaDatePickerFirstDayOfWeek[\"Sunday\"] = 0] = \"Sunday\";\n    VestaDatePickerFirstDayOfWeek[VestaDatePickerFirstDayOfWeek[\"Monday\"] = 1] = \"Monday\";\n    VestaDatePickerFirstDayOfWeek[VestaDatePickerFirstDayOfWeek[\"Tuesday\"] = 2] = \"Tuesday\";\n    VestaDatePickerFirstDayOfWeek[VestaDatePickerFirstDayOfWeek[\"Wednasday\"] = 3] = \"Wednasday\";\n    VestaDatePickerFirstDayOfWeek[VestaDatePickerFirstDayOfWeek[\"Thursday\"] = 4] = \"Thursday\";\n    VestaDatePickerFirstDayOfWeek[VestaDatePickerFirstDayOfWeek[\"Friday\"] = 5] = \"Friday\";\n    VestaDatePickerFirstDayOfWeek[VestaDatePickerFirstDayOfWeek[\"Saturday\"] = 6] = \"Saturday\";\n})(VestaDatePickerFirstDayOfWeek || (VestaDatePickerFirstDayOfWeek = {}));\n\n\n//# sourceURL=webpack:///./src/ts/vesta-date-picker-fdow.enum.ts?");

/***/ }),

/***/ "./src/ts/vesta-date-picker-gregorian-calendar.ts":
/*!********************************************************!*\
  !*** ./src/ts/vesta-date-picker-gregorian-calendar.ts ***!
  \********************************************************/
/*! exports provided: VestaDatePickerGregorianCalendar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"VestaDatePickerGregorianCalendar\", function() { return VestaDatePickerGregorianCalendar; });\n/* harmony import */ var _vesta_date_picker_date__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vesta-date-picker-date */ \"./src/ts/vesta-date-picker-date.ts\");\n/* harmony import */ var _vesta_date_picker_fdow_enum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vesta-date-picker-fdow.enum */ \"./src/ts/vesta-date-picker-fdow.enum.ts\");\n\n\nvar VestaDatePickerGregorianCalendar = /** @class */ (function () {\n    function VestaDatePickerGregorianCalendar() {\n        this.GREGORIAN_EPOCH = 1721425.5;\n        this.weekdays = new Array(\"Sunday\", \"Monday\", \"Tuesday\", \"Wednesday\", \"Thursday\", \"Friday\", \"Saturday\");\n        this.weekdaysAbbr = new Array(\"Sun\", \"Mon\", \"Tue\", \"Wed\", \"Thu\", \"Fri\", \"Sat\");\n        this.months = new Array(\"January\", \"February\", \"March\", \"April\", \"May\", \"June\", \"July\", \"August\", \"September\", \"October\", \"November\", \"December\");\n        this.monthsAbbr = new Array(\"Jan\", \"Feb\", \"Mar\", \"Apr\", \"May\", \"Jun\", \"Jul\", \"Aug\", \"Sept\", \"Oct\", \"Nov\", \"Dec\");\n        this.firstDayOfWeek = _vesta_date_picker_fdow_enum__WEBPACK_IMPORTED_MODULE_1__[\"VestaDatePickerFirstDayOfWeek\"].Monday;\n        this.defaultDateFormat = \"yy-mm-dd\";\n    }\n    VestaDatePickerGregorianCalendar.prototype.isLeap = function (year) {\n        return ((year % 4) == 0) && (!(((year % 100) == 0) && ((year % 400) != 0)));\n    };\n    VestaDatePickerGregorianCalendar.prototype.toJulianDay = function (year, month, day) {\n        return (this.GREGORIAN_EPOCH - 1) +\n            (365 * (year - 1)) +\n            Math.floor((year - 1) / 4) +\n            (-Math.floor((year - 1) / 100)) +\n            Math.floor((year - 1) / 400) +\n            Math.floor((((367 * month) - 362) / 12) +\n                ((month <= 2) ? 0 :\n                    (this.isLeap(year) ? -1 : -2)) + day);\n    };\n    VestaDatePickerGregorianCalendar.prototype.fromJulianDay = function (jd) {\n        var wjd, depoch, quadricent, dqc, cent, dcent, quad, dquad, yindex, month, day, year, yearday, leapadj;\n        wjd = Math.floor(jd - 0.5) + 0.5;\n        depoch = wjd - this.GREGORIAN_EPOCH;\n        quadricent = Math.floor(depoch / 146097);\n        dqc = this.mod(depoch, 146097);\n        cent = Math.floor(dqc / 36524);\n        dcent = this.mod(dqc, 36524);\n        quad = Math.floor(dcent / 1461);\n        dquad = this.mod(dcent, 1461);\n        yindex = Math.floor(dquad / 365);\n        year = (quadricent * 400) + (cent * 100) + (quad * 4) + yindex;\n        if (!((cent == 4) || (yindex == 4))) {\n            year++;\n        }\n        yearday = wjd - this.toJulianDay(year, 1, 1);\n        leapadj = ((wjd < this.toJulianDay(year, 3, 1)) ? 0 : (this.isLeap(year) ? 1 : 2));\n        month = Math.floor((((yearday + leapadj) * 12) + 373) / 367);\n        day = (wjd - this.toJulianDay(year, month, 1)) + 1;\n        return new _vesta_date_picker_date__WEBPACK_IMPORTED_MODULE_0__[\"VestaDatePickerDate\"](year, month, day);\n    };\n    VestaDatePickerGregorianCalendar.prototype.getDaysInMonth = function (year, month) {\n        if (month < 1 || month > 12 || !year)\n            return -1;\n        var numOfDays = [\n            31,\n            this.isLeap(year) ? 29 : 28,\n            31,\n            30,\n            31,\n            30,\n            31,\n            31,\n            30,\n            31,\n            30,\n            31 //December\n        ];\n        return numOfDays[month - 1];\n    };\n    VestaDatePickerGregorianCalendar.prototype.setJulianDay = function (jd) {\n        var date = this.fromJulianDay(jd);\n        this.year = date.year;\n        this.month = date.month;\n        this.day = date.day;\n        return date;\n    };\n    VestaDatePickerGregorianCalendar.prototype.setDate = function (year, month, day) {\n        this.setYear(year);\n        this.setMonth(month);\n        this.setDay(day);\n    };\n    VestaDatePickerGregorianCalendar.prototype.setDay = function (day) {\n        if (typeof (day) === \"undefined\" || day < 1)\n            return this.getJulianDay();\n        var dayN = this.getDaysInMonth(this.year, this.month);\n        if (day > dayN)\n            day = dayN;\n        this.day = day;\n        return this.getJulianDay();\n    };\n    VestaDatePickerGregorianCalendar.prototype.setMonth = function (month) {\n        if (typeof (month) === \"undefined\" || month < 0 || month > this.months.length)\n            return this.getJulianDay();\n        this.month = month;\n        this.day = this.getDaysInMonth(this.year, this.month) < this.day ? this.getDaysInMonth(this.year, this.month) : this.day;\n        return this.getJulianDay();\n    };\n    VestaDatePickerGregorianCalendar.prototype.setYear = function (year) {\n        if (typeof (year) === \"undefined\" || year < 1900 || year > 2099)\n            return this.getJulianDay();\n        this.year = year;\n        this.day = this.getDaysInMonth(this.year, this.month) < this.day ? this.getDaysInMonth(this.year, this.month) : this.day;\n        return this.getJulianDay();\n    };\n    VestaDatePickerGregorianCalendar.prototype.toString = function (format) {\n        var date = format;\n        var mapObj = {\n            dd: this.zeroPad(this.day, 2),\n            mm: this.zeroPad(this.month, 2),\n            yy: this.zeroPad(this.year, 4),\n            d: this.day,\n            m: this.month,\n            y: this.year,\n            DD: this.weekdays[this.getWeekday()],\n            D: this.weekdaysAbbr[this.getWeekday()],\n            MM: this.months[this.month - 1],\n            M: this.monthsAbbr[this.month - 1]\n        };\n        var reg = new RegExp(Object.keys(mapObj).join(\"|\"), \"gi\");\n        date = date.replace(reg, function (matched) {\n            return mapObj[matched];\n        });\n        return date;\n    };\n    VestaDatePickerGregorianCalendar.prototype.getJulianDay = function () {\n        return this.toJulianDay(this.year, this.month, this.day);\n    };\n    VestaDatePickerGregorianCalendar.prototype.getDay = function () {\n        return this.day;\n    };\n    VestaDatePickerGregorianCalendar.prototype.getMonth = function () {\n        return this.month;\n    };\n    VestaDatePickerGregorianCalendar.prototype.getYear = function () {\n        return this.year;\n    };\n    VestaDatePickerGregorianCalendar.prototype.getMonthList = function (abbr) {\n        if (abbr)\n            return this.monthsAbbr;\n        return this.months;\n    };\n    VestaDatePickerGregorianCalendar.prototype.getDefaultDateFormat = function () {\n        return this.defaultDateFormat;\n    };\n    VestaDatePickerGregorianCalendar.prototype.getWeekday = function () {\n        var jd = this.toJulianDay(this.year, this.month, this.day);\n        var wday = this.mod(Math.floor((jd + 1.5)), 7);\n        return this.getWeekdayList(false).indexOf(this.weekdays[wday]);\n    };\n    VestaDatePickerGregorianCalendar.prototype.getWeekdayList = function (abbr) {\n        var wds = new Array();\n        for (var i = 0; i < 7; i++) {\n            var index = i + this.firstDayOfWeek;\n            if (index < 7)\n                wds.push(abbr ? this.weekdaysAbbr[index] : this.weekdays[index]);\n            else\n                wds.push(abbr ? this.weekdaysAbbr[index - 7] : this.weekdays[index - 7]);\n        }\n        return wds;\n    };\n    VestaDatePickerGregorianCalendar.prototype.goFirstOfMonth = function () {\n        this.day = 1;\n        return this.getJulianDay();\n    };\n    VestaDatePickerGregorianCalendar.prototype.addDay = function (dayN) {\n        if (dayN == 0)\n            return this.getJulianDay();\n        if (typeof (dayN) === \"undefined\")\n            dayN = 1;\n        var jd = this.getJulianDay();\n        jd = jd + dayN;\n        var date = this.fromJulianDay(jd);\n        this.year = date.year;\n        this.month = date.month;\n        this.day = date.day;\n        return jd;\n    };\n    VestaDatePickerGregorianCalendar.prototype.addMonth = function (month) {\n        if (month == 0)\n            return this.getJulianDay();\n        if (typeof (month) === \"undefined\")\n            return undefined;\n        var year = this.year, day = this.day;\n        if (month > 0) {\n            month += this.month;\n            year += Math.floor(month / 13);\n            month = month > 12 ? this.mod(month, 12) : month;\n        }\n        else {\n            month += this.month;\n            if (month < 0) {\n                month -= this.month;\n                year -= Math.ceil(-month / 13);\n                month *= -1;\n                month = 12 - (month > 12 ? this.mod(month, 12) : month);\n            }\n            if (month == 0) {\n                year -= 1;\n                month = 12;\n            }\n        }\n        day = this.getDaysInMonth(year, month) < day ? this.getDaysInMonth(year, month) : day;\n        this.year = year;\n        this.month = month;\n        this.day = day;\n        return this.getJulianDay();\n    };\n    VestaDatePickerGregorianCalendar.prototype.addYear = function (year) {\n        if (year == 0)\n            return this.getJulianDay();\n        if (typeof (year) === \"undefined\")\n            year = 1;\n        this.year += year;\n        return this.getJulianDay();\n    };\n    VestaDatePickerGregorianCalendar.prototype.isSameMonth = function (jd) {\n        var date = this.fromJulianDay(jd);\n        return this.year == date.year && this.month == date.month;\n    };\n    VestaDatePickerGregorianCalendar.prototype.isSameYear = function (jd) {\n        var date = this.fromJulianDay(jd);\n        return this.year == date.year;\n    };\n    VestaDatePickerGregorianCalendar.prototype.getFirstDayOfWeek = function () {\n        return this.firstDayOfWeek;\n    };\n    VestaDatePickerGregorianCalendar.prototype.setFirstDayOfWeek = function (fdow) {\n        this.firstDayOfWeek = fdow;\n    };\n    VestaDatePickerGregorianCalendar.prototype.zeroPad = function (num, places) {\n        var zero = places - num.toString().length + 1;\n        return Array(+(zero > 0 && zero)).join(\"0\") + num;\n    };\n    ;\n    VestaDatePickerGregorianCalendar.prototype.mod = function (a, b) {\n        return a - (b * Math.floor(a / b));\n    };\n    ;\n    return VestaDatePickerGregorianCalendar;\n}());\n\nif (!window[\"VestaDatePicker\"]) {\n    throw \"VestaDatePicker main library not found\";\n}\nwindow[\"VestaDatePicker\"].calendars[\"gregorian\"] = new VestaDatePickerGregorianCalendar();\n\n\n//# sourceURL=webpack:///./src/ts/vesta-date-picker-gregorian-calendar.ts?");

/***/ })

/******/ });