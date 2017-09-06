/* Gregorian Calendar */
(function () {
    var GREGORIAN_EPOCH = 1721425.5;
    var gregorianCalendar = function (_year, _month, _day) {
        this.year = _year;
        this.month = _month;
        this.day = _day;
        var weekdays = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
        var weekdaysAbbr = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");
        var months = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
        var monthsAbbr = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec");
        var firstDayOfWeek = 0;//window.VestaDatePicker.WeekDayEnum.Sunday;
 
        this.defaultDateFormat = "yy-mm-dd";

        this.addDay = function (dayN) {
            if (dayN == 0)
                return this.getJulianDay();
            if (typeof (dayN) === "undefined")
                dayN = 1;
            var jd = this.getJulianDay();
            jd = jd + dayN;
            var date = gregorianCalendar.fromJulianDay(jd);
            this.year = date.year;
            this.month = date.month;
            this.day = date.day;
            return jd;
        };

        this.addYear = function (year) {
            if (year == 0)
                return this.getJulianDay();
            if (typeof (year) === "undefined")
                year = 1;
            this.year += year;
            return this.getJulianDay();
        };

        this.setDay = function (day) {
            if (typeof (day) === "undefined" || day < 1)
                return this.getJulianDay();
            var dayN = gregorianCalendar.getDaysInMonth(this.year, this.month);
            if (day > dayN)
                day = dayN;
            this.day = day;
            return this.getJulianDay();
        };

        this.setMonth = function (month) {
            if (typeof (month) === "undefined" || month < 0 || month > months.length)
                return this.getJulianDay();

            this.month = month;
            this.day = gregorianCalendar.getDaysInMonth(this.year, this.month) < this.day ? gregorianCalendar.getDaysInMonth(this.year, this.month) : this.day;
            return this.getJulianDay();
        };

        this.setYear = function (year) {
            if (typeof (year) === "undefined" || year < 1900 || year > 2099)
                return this.getJulianDay();

            this.year = year;
            this.day = gregorianCalendar.getDaysInMonth(this.year, this.month) < this.day ? gregorianCalendar.getDaysInMonth(this.year, this.month) : this.day;
            return this.getJulianDay();
        };

        this.setDate = function(year, month, day) {
            this.setYear(year);
            this.setMonth(month);
            this.setDay(day);
        };

        this.addMonth = function (month) {
            if (month == 0)
                return this.getJulianDay();
            if (typeof (month) === "undefined")
                return undefined;
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
            day = gregorianCalendar.getDaysInMonth(year, month) < day ? gregorianCalendar.getDaysInMonth(year, month) : day;
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
            return gregorianCalendar.toJulianDay(this.year, this.month, this.day);
        };

        this.setJulianDay = function (jd) {
            var date = gregorianCalendar.fromJulianDay(jd);
            this.year = date.year;
            this.month = date.month;
            this.day = date.day;
            return date;
        };

        this.getWeekday = function () {
            var jd = gregorianCalendar.toJulianDay(this.year, this.month, this.day);
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
                    wds.push(abbr ? weekdaysAbbr[index - 7] : weekdays[index - 7]);
            }
            return wds;
        };

        this.isSameMonth = function (jd) {
            var date = gregorianCalendar.fromJulianDay(jd);
            return this.year == date.year && this.month == date.month;
        };

        this.isSameYear = function (jd) {
            var date = gregorianCalendar.fromJulianDay(jd);
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
                DD: weekdays[this.getWeekday()],
                D: weekdaysAbbr[this.getWeekday()],
                MM: months[this.month - 1],
                M: monthsAbbr[this.month - 1]
            };

            var reg = new RegExp(Object.keys(mapObj).join("|"), "gi");
            date = date.replace(reg, function (matched) {
                return mapObj[matched];
            });

            return date;
        };
    };
    gregorianCalendar.isLeap = function (year) {
        return ((year % 4) == 0) && (!(((year % 100) == 0) && ((year % 400) != 0)));
    };
    gregorianCalendar.toJulianDay = function (year, month, day) {
        return (GREGORIAN_EPOCH - 1) +
            (365 * (year - 1)) +
            Math.floor((year - 1) / 4) +
            (-Math.floor((year - 1) / 100)) +
            Math.floor((year - 1) / 400) +
            Math.floor((((367 * month) - 362) / 12) +
                ((month <= 2) ? 0 :
                    (gregorianCalendar.isLeap(year) ? -1 : -2)
                ) + day);
    };
    gregorianCalendar.fromJulianDay = function (jd) {
        var wjd, depoch, quadricent, dqc, cent, dcent, quad, dquad,
            yindex, month, day, year, yearday, leapadj;

        wjd = Math.floor(jd - 0.5) + 0.5;
        depoch = wjd - GREGORIAN_EPOCH;
        quadricent = Math.floor(depoch / 146097);
        dqc = mod(depoch, 146097);
        cent = Math.floor(dqc / 36524);
        dcent = mod(dqc, 36524);
        quad = Math.floor(dcent / 1461);
        dquad = mod(dcent, 1461);
        yindex = Math.floor(dquad / 365);
        year = (quadricent * 400) + (cent * 100) + (quad * 4) + yindex;
        if (!((cent == 4) || (yindex == 4))) {
            year++;
        }
        yearday = wjd - gregorianCalendar.toJulianDay(year, 1, 1);
        leapadj = ((wjd < gregorianCalendar.toJulianDay(year, 3, 1)) ? 0 : (gregorianCalendar.isLeap(year) ? 1 : 2));
        month = Math.floor((((yearday + leapadj) * 12) + 373) / 367);
        day = (wjd - gregorianCalendar.toJulianDay(year, month, 1)) + 1;

        return { year: year, month: month, day: day };
    };
    gregorianCalendar.getDaysInMonth = function (year, month) {
        if (month<1 || month>12 || !year)
            return -1;
        var numOfDays = [
            31, //January
            gregorianCalendar.isLeap(year) ? 29 : 28, //February
            31, //March
            30, //April
            31, //March
            30, //June
            31, //July
            31, //August
            30, //September
            31, //October
            30, //November
            31  //December
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
    window.gregorianCalendar = gregorianCalendar;
})();