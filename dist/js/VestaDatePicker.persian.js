
/* Persian Calendar */
(function () {
    var PERSIAN_EPOCH = 1948320.5;
    var persianCalendar = function (_year, _month, _day) {
        this.year = _year;
        this.month = _month;
        this.day = _day;
        var weekdays = new Array("یکشنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنج شنبه", "جمعه", "شنبه");
        var weekdaysAbbr = new Array("ی", "د", "س", "چ", "پ", "ج", "ش");
        var months = new Array("فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند");
        var monthsAbbr = new Array("فروردین", "اردی", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند");
        var firstDayOfWeek = 6;//window.VestaDatePicker.WeekDayEnum.Saturday;
 
        this.defaultDateFormat = "yy/mm/dd";

        this.addDay = function (dayN) {
            if (dayN == 0)
                return this.getJulianDay();
            if (typeof(dayN) === "undefined")
                dayN = 1;
            var jd = this.getJulianDay();
            jd = jd + dayN;
            var date = persianCalendar.fromJulianDay(jd);
            this.year = date.year;
            this.month = date.month;
            this.day = date.day;
            return jd;
        };

        this.addYear = function(year) {
            if (year == 0)
                return this.getJulianDay();
            if (typeof(year) === "undefined")
                year = 1;
            this.year += year;
            return this.getJulianDay();
        };

        this.setDay = function (day) {
            if (typeof (day) === "undefined" || day < 1)
                return this.getJulianDay();
            var dayN = persianCalendar.getDaysInMonth(this.year, this.month);
            if (day > dayN)
                day = dayN;
            this.day = day;
            return this.getJulianDay();
        };
        
        this.setYear = function (year) {
            if (typeof (year) === "undefined" || year < 1300 || year > 1440)
                return this.getJulianDay();

            this.year = year;
            this.day = persianCalendar.getDaysInMonth(this.year, this.month) < this.day ? persianCalendar.getDaysInMonth(this.year, this.month) : this.day;
            return this.getJulianDay();
        };
        
        this.setMonth = function(month) {
            if (typeof(month) === "undefined" || month < 0 || month > months.length)
                return this.getJulianDay();

            this.month = month;
            this.day = persianCalendar.getDaysInMonth(this.year, this.month) < this.day ? persianCalendar.getDaysInMonth(this.year, this.month) : this.day;
            return this.getJulianDay();
        };

        this.setDate = function (year, month, day) {
            this.setDay(day);
            this.setMonth(month);
            this.setYear(year);
        };
        
        this.addMonth = function (month) {
            if (month == 0)
                return this.getJulianDay();
            if (typeof(month) === "undefined")
                month = 1;
            var year = this.year, day = this.day;
            if (month > 0) {
                month += this.month;
                year += Math.floor(month / 13);
                month = month > 12 ? mod(month, 12) : month;
            } else {
                month += this.month;
                if (month < 0) {
                    month -= this.month;
                    year -= Math.ceil(-month / 13);
                    month *= -1;
                    month = 12 - (month > 12 ? mod(month, 12) : month);
                }
                if (month == 0) {
                    year -= 1;
                    month = 12;
                }
            }
            day = persianCalendar.getDaysInMonth(year, month) < day ? persianCalendar.getDaysInMonth(year, month) : day;
            this.year = year;
            this.month = month;
            this.day = day;
            return this.getJulianDay();
        };

        this.goFirstOfMonth = function () {
            this.day = 1;
            return this.getJulianDay();
        };

        this.getJulianDay = function () {
            return persianCalendar.toJulianDay(this.year, this.month, this.day);
        };

        this.setJulianDay = function (jd) {
            var date = persianCalendar.fromJulianDay(jd);
            this.year = date.year;
            this.month = date.month;
            this.day = date.day;
            return date;
        };

        this.getWeekday = function () {
            var jd = persianCalendar.toJulianDay(this.year, this.month, this.day);
            var wday = mod(Math.floor((jd + 1.5)), 7);
            return this.getWeekdayList().indexOf(weekdays[wday]);
        };

        this.getWeekdayList = function (abbr) {
            var wds = new Array();
            for (var i = 0; i < 7; i++) {
                var index = i + firstDayOfWeek;
                if (index < 7)
                    wds.push(abbr ? weekdaysAbbr[index] : weekdays[index]);
                else
                    wds.push(abbr ? weekdaysAbbr[index-7] : weekdays[index-7]);
            }
            return wds;
        };

        this.isSameMonth = function(jd) {
            var date = persianCalendar.fromJulianDay(jd);
            return this.year == date.year && this.month == date.month;
        };

        this.isSameYear = function (jd) {
            var date = persianCalendar.fromJulianDay(jd);
            return this.year == date.year;
        };
        
        this.getFirstDayOfWeek = function () {
            return firstDayOfWeek;
        };

        this.setFirstDayOfWeek = function (fdow) {
            firstDayOfWeek = fdow;
        };
        
        this.getMonthList = function (abbr) {
            if (abbr)
                return monthsAbbr;
            return months;
        };

        this.toString = function (format) {
            var date = format;
         
            var mapObj = {
                dd: zeroPad(this.day, 2),
                mm: zeroPad(this.month, 2),
                yy: zeroPad(this.year, 4),
                d: this.day,
                m: this.month,
                y: this.year,
                DD: this.getWeekdayList()[this.getWeekday()],
                D: this.getWeekdayList(true)[this.getWeekday()],
                MM: this.getMonthList()[this.month - 1],
                M: this.getMonthList(false)[this.month - 1]
            };

            var reg = new RegExp(Object.keys(mapObj).join("|"), "gi");
            date = date.replace(reg, function (matched) {
                return mapObj[matched];
            });

            return date;
        };
    };
    persianCalendar.isLeap = function (year) {
        return ((((((year - ((year > 0) ? 474 : 473)) % 2820) + 474) + 38) * 682) % 2816) < 682;
    };
    persianCalendar.toJulianDay = function (year, month, day) {
        var epbase, epyear;

        epbase = year - ((year >= 0) ? 474 : 473);
        epyear = 474 +mod(epbase, 2820);

        return day +
                ((month <= 7) ?
                    ((month - 1) * 31) :
                    (((month - 1) * 30) + 6)
                ) +
                Math.floor(((epyear * 682) - 110) / 2816) +
                (epyear - 1) * 365 +
                Math.floor(epbase / 2820) * 1029983 +
                (PERSIAN_EPOCH - 1);
    };
    persianCalendar.fromJulianDay = function (jd) {
        var year, month, day, depoch, cycle, cyear, ycycle,
            aux1, aux2, yday;


        jd = Math.floor(jd) + 0.5;

        depoch = jd - persianCalendar.toJulianDay(475, 1, 1);
        cycle = Math.floor(depoch / 1029983);
        cyear = mod(depoch, 1029983);
        if (cyear == 1029982) {
            ycycle = 2820;
        } else {
            aux1 = Math.floor(cyear / 366);
            aux2 = mod(cyear, 366);
            ycycle = Math.floor(((2134 * aux1) + (2816 * aux2) + 2815) / 1028522) +
                        aux1 + 1;
        }
        year = ycycle + (2820 * cycle) + 474;
        if (year <= 0) {
            year--;
        }
        yday = (jd - persianCalendar.toJulianDay(year, 1, 1)) + 1;
        month = (yday <= 186) ? Math.ceil(yday / 31) : Math.ceil((yday - 6) / 30);
        day = (jd - persianCalendar.toJulianDay(year, month, 1)) + 1;

        return { year: year, month: month, day: day };
    };
    persianCalendar.getDaysInMonth = function (year, month) {
        if (month<1 || month>12 || !year)
            return -1;
        var numOfDays = [
            31, //Farvardin
            31, //Oridibehest
            31, //Khordad
            31, //Tir
            31, //Mordad
            31, //Shahrivar
            30, //Mehr
            30, //Aban
            30, //Azar
            30, //Day
            30, //Bahman
            persianCalendar.isLeap(year) ? 30 : 29  //Esfand
        ];        
        return numOfDays[month-1];
    };
    function zeroPad(num, places) {
        var zero = places - num.toString().length + 1;
        return Array(+(zero > 0 && zero)).join("0") + num;
    };  
    function mod(a, b) {
        return a - (b * Math.floor(a / b));
    }; 
    window.persianCalendar = persianCalendar;
})();

