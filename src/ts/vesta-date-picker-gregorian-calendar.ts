import { VestaDatePickerCalendar } from "./vesta-date-picker-calendar";
import { VestaDatePickerDate } from "./vesta-date-picker-date";
import { VestaDatePickerFirstDayOfWeek } from "./vesta-date-picker-fdow.enum";

export class VestaDatePickerGregorianCalendar implements VestaDatePickerCalendar {

    private GREGORIAN_EPOCH = 1721425.5;
    private year: number;
    private month: number;
    private day: number;
    private weekdays = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
    private weekdaysAbbr = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");
    private months = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
    private monthsAbbr = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec");
    private firstDayOfWeek = VestaDatePickerFirstDayOfWeek.Monday;
    private defaultDateFormat = "yy-mm-dd";


    isLeap(year: number): boolean {
        return ((year % 4) == 0) && (!(((year % 100) == 0) && ((year % 400) != 0)));
    }

    toJulianDay(year: number, month: number, day: number): number {
        return (this.GREGORIAN_EPOCH - 1) +
            (365 * (year - 1)) +
            Math.floor((year - 1) / 4) +
            (-Math.floor((year - 1) / 100)) +
            Math.floor((year - 1) / 400) +
            Math.floor((((367 * month) - 362) / 12) +
                ((month <= 2) ? 0 :
                    (this.isLeap(year) ? -1 : -2)
                ) + day);
    }
    
    fromJulianDay(jd: number): VestaDatePickerDate {
        let wjd, depoch, quadricent, dqc, cent, dcent, quad, dquad,
            yindex, month, day, year, yearday, leapadj;

        wjd = Math.floor(jd - 0.5) + 0.5;
        depoch = wjd - this.GREGORIAN_EPOCH;
        quadricent = Math.floor(depoch / 146097);
        dqc = this.mod(depoch, 146097);
        cent = Math.floor(dqc / 36524);
        dcent = this.mod(dqc, 36524);
        quad = Math.floor(dcent / 1461);
        dquad = this.mod(dcent, 1461);
        yindex = Math.floor(dquad / 365);
        year = (quadricent * 400) + (cent * 100) + (quad * 4) + yindex;
        if (!((cent == 4) || (yindex == 4))) {
            year++;
        }
        yearday = wjd - this.toJulianDay(year, 1, 1);
        leapadj = ((wjd < this.toJulianDay(year, 3, 1)) ? 0 : (this.isLeap(year) ? 1 : 2));
        month = Math.floor((((yearday + leapadj) * 12) + 373) / 367);
        day = (wjd - this.toJulianDay(year, month, 1)) + 1;

        return new VestaDatePickerDate(year, month, day);
    }

    getDaysInMonth(year: number, month: number): number {
        if (month<1 || month>12 || !year)
            return -1;
        let numOfDays = [
            31, //January
            this.isLeap(year) ? 29 : 28, //February
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
    }

    setJulianDay(jd: number): VestaDatePickerDate {
        var date = this.fromJulianDay(jd);
        this.year = date.year;
        this.month = date.month;
        this.day = date.day;
        return date;
    }

    setDate(year: number, month: number, day: number): void {
        this.setYear(year);
        this.setMonth(month);
        this.setDay(day);
    }

    setDay(day: number): number {
        if (typeof (day) === "undefined" || day < 1)
            return this.getJulianDay();
        var dayN = this.getDaysInMonth(this.year, this.month);
        if (day > dayN)
            day = dayN;
        this.day = day;
        return this.getJulianDay();
    }

    setMonth(month: number): number {
        if (typeof (month) === "undefined" || month < 0 || month > this.months.length)
            return this.getJulianDay();

        this.month = month;
        this.day = this.getDaysInMonth(this.year, this.month) < this.day ? this.getDaysInMonth(this.year, this.month) : this.day;
        return this.getJulianDay();
    }

    setYear(year: number): number {
        if (typeof (year) === "undefined" || year < 1900 || year > 2099)
            return this.getJulianDay();

        this.year = year;
        this.day = this.getDaysInMonth(this.year, this.month) < this.day ? this.getDaysInMonth(this.year, this.month) : this.day;
        return this.getJulianDay();
    }

    toString(format: string): string {
        var date = format;
        var mapObj: any = {
            dd: this.zeroPad(this.day, 2),
            mm: this.zeroPad(this.month, 2),
            yy: this.zeroPad(this.year, 4),
            d: this.day,
            m: this.month,
            y: this.year,
            DD: this.weekdays[this.getWeekday()],
            D: this.weekdaysAbbr[this.getWeekday()],
            MM: this.months[this.month - 1],
            M: this.monthsAbbr[this.month - 1]
        };

        var reg = new RegExp(Object.keys(mapObj).join("|"), "gi");
        date = date.replace(reg, (matched: string) => {
            return mapObj[matched];
        });

        return date;
    }

    getJulianDay(): number {
        return this.toJulianDay(this.year, this.month, this.day);
    }

    getDay(): number {
        return this.day;
    }

    getMonth(): number {
        return this.month;
    }

    getYear(): number {
        return this.year;
    }

    getMonthList(abbr: boolean): string[] {
        if (abbr)
            return this.monthsAbbr;
        return this.months;
    }

    getDefaultDateFormat(): string {
        return this.defaultDateFormat;
    }

    getWeekday(): number {
        var jd = this.toJulianDay(this.year, this.month, this.day);
        var wday = this.mod(Math.floor((jd + 1.5)), 7);
        return this.getWeekdayList(false).indexOf(this.weekdays[wday]);
    }

    getWeekdayList(abbr?: boolean): string[] {
        var wds = new Array();
        for (var i = 0; i < 7; i++) {
            var index = i + this.firstDayOfWeek;
            if (index < 7)
                wds.push(abbr ? this.weekdaysAbbr[index] : this.weekdays[index]);
            else
                wds.push(abbr ? this.weekdaysAbbr[index - 7] : this.weekdays[index - 7]);
        }
        return wds;
    }

    goFirstOfMonth(): number {
        this.day = 1;
        return this.getJulianDay();
    }

    addDay(dayN: number): number {
        if (dayN == 0)
            return this.getJulianDay();
        if (typeof (dayN) === "undefined")
            dayN = 1;
        var jd = this.getJulianDay();
        jd = jd + dayN;
        var date = this.fromJulianDay(jd);
        this.year = date.year;
        this.month = date.month;
        this.day = date.day;
        return jd;
    }

    addMonth(month: number): number {
        if (month == 0)
            return this.getJulianDay();
        if (typeof (month) === "undefined")
            return undefined;
        var year = this.year, day = this.day;
        if (month > 0) {
            month += this.month;
            year += Math.floor(month / 13);
            month = month > 12 ? this.mod(month, 12) : month;
        } else {
            month += this.month;
            if (month < 0) {
                month -= this.month;
                year -= Math.ceil(-month / 13);
                month *= -1;
                month = 12 - (month > 12 ? this.mod(month, 12) : month);
            }
            if (month == 0) {
                year -= 1;
                month = 12;
            }
        }
        day = this.getDaysInMonth(year, month) < day ? this.getDaysInMonth(year, month) : day;
        this.year = year;
        this.month = month;
        this.day = day;
        return this.getJulianDay();
    }

    addYear(year: number): number {
        if (year == 0)
            return this.getJulianDay();
        if (typeof (year) === "undefined")
            year = 1;
        this.year += year;
        return this.getJulianDay();
    }

    isSameMonth(jd: number): boolean {
        var date = this.fromJulianDay(jd);
        return this.year == date.year && this.month == date.month;
    }

    isSameYear(jd: number): boolean {
        var date = this.fromJulianDay(jd);
        return this.year == date.year;
    }

    getFirstDayOfWeek(): VestaDatePickerFirstDayOfWeek {
        return this.firstDayOfWeek;
    }

    setFirstDayOfWeek(fdow: VestaDatePickerFirstDayOfWeek): void {
        this.firstDayOfWeek = fdow;
    }

    private zeroPad(num: number, places: number) {
        var zero = places - num.toString().length + 1;
        return Array(+(zero > 0 && zero)).join("0") + num;
    };    

    private mod(a: number, b: number) {
        return a - (b * Math.floor(a / b));
    }; 
}