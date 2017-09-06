
/* Hijri Calendar */
(function () {
    var HIJRI_EPOCH = 1948439.5;
    var hijriCalendar = function (_year, _month, _day) {
        this.year = _year;
        this.month = _month;
        this.day = _day;
        var weekdays = new Array("الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت");
        var weekdaysAbbr = new Array("اح", "اث", "ثل", "ار", "خم", "جم", "سب");
        var months = new Array("محرم", "صفر", " ربیع‌الاول", "ربیع‌الثانی", "جمادی‌الاول", "جمادی‌الثانی", "رجب", "شعبان", "رمضان", "شوال", "ذیقعده", "ذیحجه");
        var monthsAbbr = new Array("محرم", "صفر", " ربیع‌1", "ربیع2", "جمادی1", "جمادی2", "رجب", "شعبان", "رمضان", "شوال", "ذیقعده", "ذیحجه");
        var firstDayOfWeek = 0;//window.VestaDatePicker.WeekDayEnum.Saturday;
 
        this.defaultDateFormat = "yy/mm/dd";

        this.addDay = function (dayN) {
            if (dayN == 0)
                return this.getJulianDay();
            if (typeof(dayN) === "undefined")
                dayN = 1;
            var jd = this.getJulianDay();
            jd = jd + dayN;
            var date = hijriCalendar.fromJulianDay(jd);
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
            var dayN = hijriCalendar.getDaysInMonth(this.year, this.month);
            if (day > dayN)
                day = dayN;
            this.day = day;
            return this.getJulianDay();
        };
        
        this.setYear = function (year) {
            if (typeof (year) === "undefined" || year < 1200 || year > 1740)
                return this.getJulianDay();

            this.year = year;
            var dayN = hijriCalendar.getDaysInMonth(this.year, this.month);
            this.day = dayN < this.day ? dayN : this.day;
            return this.getJulianDay();
        };
        
        this.setMonth = function(month) {
            if (typeof(month) === "undefined" || month < 0 || month > months.length)
                return this.getJulianDay();

            this.month = month;
            var dayN = hijriCalendar.getDaysInMonth(this.year, this.month);
            this.day = dayN < this.day ? dayN : this.day;
            return this.getJulianDay();
        };

        this.setDate = function (year, month, day) {
            this.setYear(year);
            this.setMonth(month);
            this.setDay(day);
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
            var dayN = hijriCalendar.getDaysInMonth(year, month);
            day = dayN < day ? dayN : day;
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
            return hijriCalendar.toJulianDay(this.year, this.month, this.day);
        };

        this.setJulianDay = function (jd) {
            var date = hijriCalendar.fromJulianDay(jd);
            this.year = date.year;
            this.month = date.month;
            this.day = date.day;
            return date;
        };

        this.getWeekday = function () {
            var jd = hijriCalendar.toJulianDay(this.year, this.month, this.day);
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
            var date = hijriCalendar.fromJulianDay(jd);
            return this.year == date.year && this.month == date.month;
        };

        this.isSameYear = function (jd) {
            var date = hijriCalendar.fromJulianDay(jd);
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

    hijriCalendar.isLeap = function (year) {
        return (((year * 11) + 14) % 30) < 11;
    };

    hijriCalendar.toJulianDay = function (year, month, day) {
        return (day +
                Math.ceil(29.5 * (month - 1)) +
                (year - 1) * 354 +
                Math.floor((3 + (11 * year)) / 30) +
                HIJRI_EPOCH) - 1;
    };

    hijriCalendar.fromJulianDay = function (jd) {
        var year, month, day;

        jd = Math.floor(jd) + 0.5;
        year = Math.floor(((30 * (jd - HIJRI_EPOCH)) + 10646) / 10631);
        month = Math.min(12,
                    Math.ceil((jd - (29 + hijriCalendar.toJulianDay(year, 1, 1))) / 29.5) + 1);
        day = (jd - hijriCalendar.toJulianDay(year, month, 1)) + 1;
        return { year: year, month: month, day: day };
    };

    hijriCalendar.getDaysInMonth = function (year, month) {
        if (month<1 || month>12 || !year)
            return -1;
        var numOfDays = [
            29, //Moharam
            30, //Safar
            29, //RabiAval
            30, //RabiSanni
            29, //JamadiAval
            30, //JamadiSanni
            29, //Rajab
            30, //Shaban
            29, //Ramazan
            30, //Shaval
            29, //Zolghade
            hijriCalendar.isLeap(year) ? 30 : 29  //ZulHaje
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
    window.hijriCalendar = hijriCalendar;
})();