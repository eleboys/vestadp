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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/ts/vesta-date-picker-hijri-calendar.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/ts/vesta-date-picker-fdow.enum.ts":
/*!***********************************************!*\
  !*** ./src/ts/vesta-date-picker-fdow.enum.ts ***!
  \***********************************************/
/*! exports provided: VestaDatePickerFirstDayOfWeek */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"VestaDatePickerFirstDayOfWeek\", function() { return VestaDatePickerFirstDayOfWeek; });\nvar VestaDatePickerFirstDayOfWeek;\n(function (VestaDatePickerFirstDayOfWeek) {\n    VestaDatePickerFirstDayOfWeek[VestaDatePickerFirstDayOfWeek[\"Sunday\"] = 0] = \"Sunday\";\n    VestaDatePickerFirstDayOfWeek[VestaDatePickerFirstDayOfWeek[\"Monday\"] = 1] = \"Monday\";\n    VestaDatePickerFirstDayOfWeek[VestaDatePickerFirstDayOfWeek[\"Tuesday\"] = 2] = \"Tuesday\";\n    VestaDatePickerFirstDayOfWeek[VestaDatePickerFirstDayOfWeek[\"Wednasday\"] = 3] = \"Wednasday\";\n    VestaDatePickerFirstDayOfWeek[VestaDatePickerFirstDayOfWeek[\"Thursday\"] = 4] = \"Thursday\";\n    VestaDatePickerFirstDayOfWeek[VestaDatePickerFirstDayOfWeek[\"Friday\"] = 5] = \"Friday\";\n    VestaDatePickerFirstDayOfWeek[VestaDatePickerFirstDayOfWeek[\"Saturday\"] = 6] = \"Saturday\";\n})(VestaDatePickerFirstDayOfWeek || (VestaDatePickerFirstDayOfWeek = {}));\n\n\n//# sourceURL=webpack:///./src/ts/vesta-date-picker-fdow.enum.ts?");

/***/ }),

/***/ "./src/ts/vesta-date-picker-hijri-calendar.ts":
/*!****************************************************!*\
  !*** ./src/ts/vesta-date-picker-hijri-calendar.ts ***!
  \****************************************************/
/*! exports provided: VestaDatePickerPersianCalendar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"VestaDatePickerPersianCalendar\", function() { return VestaDatePickerPersianCalendar; });\n/* harmony import */ var _vesta_date_picker_fdow_enum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vesta-date-picker-fdow.enum */ \"./src/ts/vesta-date-picker-fdow.enum.ts\");\n\nvar VestaDatePickerPersianCalendar = /** @class */ (function () {\n    function VestaDatePickerPersianCalendar() {\n        this.HIJRI_EPOCH = 1948439.5;\n        this.weekdays = new Array(\"الأحد\", \"الإثنين\", \"الثلاثاء\", \"الأربعاء\", \"الخميس\", \"الجمعة\", \"السبت\");\n        this.weekdaysAbbr = new Array(\"اح\", \"اث\", \"ثل\", \"ار\", \"خم\", \"جم\", \"سب\");\n        this.months = new Array(\"محرم\", \"صفر\", \" ربیع‌الاول\", \"ربیع‌الثانی\", \"جمادی‌الاول\", \"جمادی‌الثانی\", \"رجب\", \"شعبان\", \"رمضان\", \"شوال\", \"ذیقعده\", \"ذیحجه\");\n        this.monthsAbbr = new Array(\"محرم\", \"صفر\", \" ربیع‌1\", \"ربیع2\", \"جمادی1\", \"جمادی2\", \"رجب\", \"شعبان\", \"رمضان\", \"شوال\", \"ذیقعده\", \"ذیحجه\");\n        this.firstDayOfWeek = _vesta_date_picker_fdow_enum__WEBPACK_IMPORTED_MODULE_0__[\"VestaDatePickerFirstDayOfWeek\"].Saturday;\n        this.defaultDateFormat = \"yy/mm/dd\";\n    }\n    VestaDatePickerPersianCalendar.prototype.isLeap = function (year) {\n        return (((year * 11) + 14) % 30) < 11;\n    };\n    VestaDatePickerPersianCalendar.prototype.toJulianDay = function (year, month, day) {\n        return (day +\n            Math.ceil(29.5 * (month - 1)) +\n            (year - 1) * 354 +\n            Math.floor((3 + (11 * year)) / 30) +\n            this.HIJRI_EPOCH) - 1;\n    };\n    VestaDatePickerPersianCalendar.prototype.fromJulianDay = function (jd) {\n        var year, month, day;\n        jd = Math.floor(jd) + 0.5;\n        year = Math.floor(((30 * (jd - this.HIJRI_EPOCH)) + 10646) / 10631);\n        month = Math.min(12, Math.ceil((jd - (29 + this.toJulianDay(year, 1, 1))) / 29.5) + 1);\n        day = (jd - this.toJulianDay(year, month, 1)) + 1;\n        return { year: year, month: month, day: day };\n    };\n    VestaDatePickerPersianCalendar.prototype.getDaysInMonth = function (year, month) {\n        if (month < 1 || month > 12 || !year)\n            return -1;\n        var numOfDays = [\n            29,\n            30,\n            29,\n            30,\n            29,\n            30,\n            29,\n            30,\n            29,\n            30,\n            29,\n            this.isLeap(year) ? 30 : 29 //ZulHaje\n        ];\n        return numOfDays[month - 1];\n    };\n    VestaDatePickerPersianCalendar.prototype.setJulianDay = function (jd) {\n        var date = this.fromJulianDay(jd);\n        this.year = date.year;\n        this.month = date.month;\n        this.day = date.day;\n        return date;\n    };\n    VestaDatePickerPersianCalendar.prototype.setDate = function (year, month, day) {\n        this.setYear(year);\n        this.setMonth(month);\n        this.setDay(day);\n    };\n    VestaDatePickerPersianCalendar.prototype.setDay = function (day) {\n        if (typeof (day) === \"undefined\" || day < 1)\n            return this.getJulianDay();\n        var dayN = this.getDaysInMonth(this.year, this.month);\n        if (day > dayN)\n            day = dayN;\n        this.day = day;\n        return this.getJulianDay();\n    };\n    VestaDatePickerPersianCalendar.prototype.setMonth = function (month) {\n        if (typeof (month) === \"undefined\" || month < 0 || month > this.months.length)\n            return this.getJulianDay();\n        this.month = month;\n        var dayN = this.getDaysInMonth(this.year, this.month);\n        this.day = dayN < this.day ? dayN : this.day;\n        return this.getJulianDay();\n    };\n    VestaDatePickerPersianCalendar.prototype.setYear = function (year) {\n        if (typeof (year) === \"undefined\" || year < 1300 || year > 1440)\n            return this.getJulianDay();\n        this.year = year;\n        var dayN = this.getDaysInMonth(this.year, this.month);\n        this.day = dayN < this.day ? dayN : this.day;\n        return this.getJulianDay();\n    };\n    VestaDatePickerPersianCalendar.prototype.toString = function (format) {\n        var date = format;\n        var mapObj = {\n            dd: this.zeroPad(this.day, 2),\n            mm: this.zeroPad(this.month, 2),\n            yy: this.zeroPad(this.year, 4),\n            d: this.day,\n            m: this.month,\n            y: this.year,\n            DD: this.getWeekdayList()[this.getWeekday()],\n            D: this.getWeekdayList(true)[this.getWeekday()],\n            MM: this.getMonthList(false)[this.month - 1],\n            M: this.getMonthList(false)[this.month - 1]\n        };\n        var reg = new RegExp(Object.keys(mapObj).join(\"|\"), \"gi\");\n        date = date.replace(reg, function (matched) {\n            return mapObj[matched];\n        });\n        return date;\n    };\n    VestaDatePickerPersianCalendar.prototype.getJulianDay = function () {\n        return this.toJulianDay(this.year, this.month, this.day);\n    };\n    VestaDatePickerPersianCalendar.prototype.getDay = function () {\n        return this.day;\n    };\n    VestaDatePickerPersianCalendar.prototype.getMonth = function () {\n        return this.month;\n    };\n    VestaDatePickerPersianCalendar.prototype.getYear = function () {\n        return this.year;\n    };\n    VestaDatePickerPersianCalendar.prototype.getMonthList = function (abbr) {\n        if (abbr)\n            return this.monthsAbbr;\n        return this.months;\n    };\n    VestaDatePickerPersianCalendar.prototype.getDefaultDateFormat = function () {\n        return this.defaultDateFormat;\n    };\n    VestaDatePickerPersianCalendar.prototype.getWeekday = function () {\n        var jd = this.toJulianDay(this.year, this.month, this.day);\n        var wday = this.mod(Math.floor((jd + 1.5)), 7);\n        return this.getWeekdayList().indexOf(this.weekdays[wday]);\n    };\n    VestaDatePickerPersianCalendar.prototype.getWeekdayList = function (abbr) {\n        var wds = new Array();\n        for (var i = 0; i < 7; i++) {\n            var index = i + this.firstDayOfWeek;\n            if (index < 7)\n                wds.push(abbr ? this.weekdaysAbbr[index] : this.weekdays[index]);\n            else\n                wds.push(abbr ? this.weekdaysAbbr[index - 7] : this.weekdays[index - 7]);\n        }\n        return wds;\n    };\n    VestaDatePickerPersianCalendar.prototype.goFirstOfMonth = function () {\n        this.day = 1;\n        return this.getJulianDay();\n    };\n    VestaDatePickerPersianCalendar.prototype.addDay = function (dayN) {\n        if (dayN == 0)\n            return this.getJulianDay();\n        if (typeof (dayN) === \"undefined\")\n            dayN = 1;\n        var jd = this.getJulianDay();\n        jd = jd + dayN;\n        var date = this.fromJulianDay(jd);\n        this.year = date.year;\n        this.month = date.month;\n        this.day = date.day;\n        return jd;\n    };\n    VestaDatePickerPersianCalendar.prototype.addMonth = function (month) {\n        if (month == 0)\n            return this.getJulianDay();\n        if (typeof (month) === \"undefined\")\n            month = 1;\n        var year = this.year, day = this.day;\n        if (month > 0) {\n            month += this.month;\n            year += Math.floor(month / 13);\n            month = month > 12 ? this.mod(month, 12) : month;\n        }\n        else {\n            month += this.month;\n            if (month < 0) {\n                month -= this.month;\n                year -= Math.ceil(-month / 13);\n                month *= -1;\n                month = 12 - (month > 12 ? this.mod(month, 12) : month);\n            }\n            if (month == 0) {\n                year -= 1;\n                month = 12;\n            }\n        }\n        var dayN = this.getDaysInMonth(year, month);\n        this.year = year;\n        this.month = month;\n        this.day = dayN < day ? dayN : day;\n        return this.getJulianDay();\n    };\n    VestaDatePickerPersianCalendar.prototype.addYear = function (year) {\n        if (year == 0)\n            return this.getJulianDay();\n        if (typeof (year) === \"undefined\")\n            year = 1;\n        this.year += year;\n        return this.getJulianDay();\n    };\n    VestaDatePickerPersianCalendar.prototype.isSameMonth = function (jd) {\n        var date = this.fromJulianDay(jd);\n        return this.year == date.year && this.month == date.month;\n    };\n    VestaDatePickerPersianCalendar.prototype.isSameYear = function (jd) {\n        var date = this.fromJulianDay(jd);\n        return this.year == date.year;\n    };\n    VestaDatePickerPersianCalendar.prototype.getFirstDayOfWeek = function () {\n        return this.firstDayOfWeek;\n    };\n    VestaDatePickerPersianCalendar.prototype.setFirstDayOfWeek = function (fdow) {\n        this.firstDayOfWeek = fdow;\n    };\n    VestaDatePickerPersianCalendar.prototype.zeroPad = function (num, places) {\n        var zero = places - num.toString().length + 1;\n        return Array(+(zero > 0 && zero)).join(\"0\") + num;\n    };\n    ;\n    VestaDatePickerPersianCalendar.prototype.mod = function (a, b) {\n        return a - (b * Math.floor(a / b));\n    };\n    ;\n    return VestaDatePickerPersianCalendar;\n}());\n\nif (!window[\"VestaDatePicker\"]) {\n    throw \"VestaDatePicker main library not found\";\n}\nwindow[\"VestaDatePicker\"].calendars[\"hijri\"] = new VestaDatePickerPersianCalendar();\n\n\n//# sourceURL=webpack:///./src/ts/vesta-date-picker-hijri-calendar.ts?");

/***/ })

/******/ });