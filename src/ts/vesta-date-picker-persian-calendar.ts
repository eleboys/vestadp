import { VestaDatePickerCalendar } from "./vesta-date-picker-calendar";
import { VestaDatePickerDate } from "./vesta-date-picker-date";
import { VestaDatePickerDaysOfWeek } from "./vesta-date-picker-dow.enum";

export class VestaDatePickerPersianCalendar implements VestaDatePickerCalendar {

    private PERSIAN_EPOCH = 1948320.5;
    private year: number;
    private month: number;
    private day: number;
    private weekdays = new Array("یکشنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنج شنبه", "جمعه", "شنبه");
    private weekdaysAbbr = new Array("ی", "د", "س", "چ", "پ", "ج", "ش");
    private months = new Array("فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند");
    private monthsAbbr = new Array("فروردین", "اردی", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند");
    private firstDayOfWeek = VestaDatePickerDaysOfWeek.Saturday;
    private defaultDateFormat = "yy/mm/dd";


    isLeap(year: number): boolean {
        return ((((((year - ((year > 0) ? 474 : 473)) % 2820) + 474) + 38) * 682) % 2816) < 682;
    }

    toJulianDay(year: number, month: number, day: number): number {
        var epbase, epyear;

        epbase = year - ((year >= 0) ? 474 : 473);
        epyear = 474 + this.mod(epbase, 2820);

        return day +
                ((month <= 7) ?
                    ((month - 1) * 31) :
                    (((month - 1) * 30) + 6)
                ) +
                Math.floor(((epyear * 682) - 110) / 2816) +
                (epyear - 1) * 365 +
                Math.floor(epbase / 2820) * 1029983 +
                (this.PERSIAN_EPOCH - 1);
    }
    
    fromJulianDay(jd: number): VestaDatePickerDate {
        var year, month, day, depoch, cycle, cyear, ycycle,
            aux1, aux2, yday;


        jd = Math.floor(jd) + 0.5;

        depoch = jd - this.toJulianDay(475, 1, 1);
        cycle = Math.floor(depoch / 1029983);
        cyear = this.mod(depoch, 1029983);
        if (cyear == 1029982) {
            ycycle = 2820;
        } else {
            aux1 = Math.floor(cyear / 366);
            aux2 = this.mod(cyear, 366);
            ycycle = Math.floor(((2134 * aux1) + (2816 * aux2) + 2815) / 1028522) +
                        aux1 + 1;
        }
        year = ycycle + (2820 * cycle) + 474;
        if (year <= 0) {
            year--;
        }
        yday = (jd - this.toJulianDay(year, 1, 1)) + 1;
        month = (yday <= 186) ? Math.ceil(yday / 31) : Math.ceil((yday - 6) / 30);
        day = (jd - this.toJulianDay(year, month, 1)) + 1;

        return { year: year, month: month, day: day };
    }

    getDaysInMonth(year: number, month: number): number {
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
            this.isLeap(year) ? 30 : 29  //Esfand
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
        let dayN = this.getDaysInMonth(this.year, this.month);
        if (day > dayN)
            day = dayN;
        this.day = day;
        return this.getJulianDay();
    }

    setMonth(month: number): number {
        if (typeof(month) === "undefined" || month < 0 || month > this.months.length)
        return this.getJulianDay();

        this.month = month;
        this.day = this.getDaysInMonth(this.year, this.month) < this.day ? this.getDaysInMonth(this.year, this.month) : this.day;
        return this.getJulianDay();
    }

    setYear(year: number): number {
        if (typeof (year) === "undefined" || year < 1300 || year > 1440)
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
            DD: this.getWeekdayList()[this.getWeekday()],
            D: this.getWeekdayList(true)[this.getWeekday()],
            MM: this.getMonthList(false)[this.month - 1],
            M: this.getMonthList(false)[this.month - 1]
        };

        var reg = new RegExp(Object.keys(mapObj).join("|"), "gi");
        date = date.replace(reg, function (matched: string) {
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
        return this.getWeekdayList().indexOf(this.weekdays[wday]);
    }

    getWeekdayList(abbr?: boolean): string[] {
        var wds = new Array();
        for (var i = 0; i < 7; i++) {
            var index = i + this.firstDayOfWeek;
            if (index < 7)
                wds.push(abbr ? this.weekdaysAbbr[index] : this.weekdays[index]);
            else
                wds.push(abbr ? this.weekdaysAbbr[index-7] : this.weekdays[index-7]);
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
        if (typeof(dayN) === "undefined")
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
        if (typeof(month) === "undefined")
            month = 1;
        let year = this.year;
        let day = this.day;
        if (month > 0) {
            year += Math.floor(month / 12);
            month += this.month;
            month = month > 12 ? this.mod(month, 12) : month;
        } else {
            month += this.month;
            if (month < 0) {
                month -= this.month;
                year -= Math.ceil(-month / 13);
                month *= -1;
                month = 12 - (month > 12 ? this.mod(month, 12) : month);
            }
        }
        
        month = (month == 0) ? this.month : month;
        day = this.getDaysInMonth(year, month) < day ? this.getDaysInMonth(year, month) : day;
        this.year = year;
        this.month = month;
        this.day = day;
        return this.getJulianDay();
    }

    addYear(year: number): number {
        if (year == 0)
            return this.getJulianDay();
        if (typeof(year) === "undefined")
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

    getFirstDayOfWeek(): VestaDatePickerDaysOfWeek {
        return this.firstDayOfWeek;
    }

    setFirstDayOfWeek(fdow: VestaDatePickerDaysOfWeek): void {
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

declare let window:any;
if (!window["VestaDatePicker"]) {
    throw "VestaDatePicker main library not found";
}

window["VestaDatePicker"].calendars["persian"] = new VestaDatePickerPersianCalendar();