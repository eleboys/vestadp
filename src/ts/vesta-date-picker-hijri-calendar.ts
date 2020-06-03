import { VestaDatePickerCalendar } from "./vesta-date-picker-calendar";
import { VestaDatePickerDate } from "./vesta-date-picker-date";
import { VestaDatePickerDaysOfWeek } from "./vesta-date-picker-dow.enum";

export class VestaDatePickerHijriCalendar implements VestaDatePickerCalendar {

    private HIJRI_EPOCH = 1948439.5;
    private year: number;
    private month: number;
    private day: number;
    private weekdays = new Array("الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت");
    private weekdaysAbbr = new Array("اح", "اث", "ثل", "ار", "خم", "جم", "سب");
    private months = new Array("محرم", "صفر", " ربیع‌الاول", "ربیع‌الثانی", "جمادی‌الاول", "جمادی‌الثانی", "رجب", "شعبان", "رمضان", "شوال", "ذیقعده", "ذیحجه");
    private monthsAbbr = new Array("محرم", "صفر", " ربیع‌1", "ربیع2", "جمادی1", "جمادی2", "رجب", "شعبان", "رمضان", "شوال", "ذیقعده", "ذیحجه");
    private firstDayOfWeek = VestaDatePickerDaysOfWeek.Saturday;
    private defaultDateFormat = "yy/mm/dd";


    isLeap(year: number): boolean {
        return (((year * 11) + 14) % 30) < 11;
    }

    toJulianDay(year: number, month: number, day: number): number {
        return (day +
            Math.ceil(29.5 * (month - 1)) +
            (year - 1) * 354 +
            Math.floor((3 + (11 * year)) / 30) +
            this.HIJRI_EPOCH) - 1;
    }
    
    fromJulianDay(jd: number): VestaDatePickerDate {
        var year, month, day;

        jd = Math.floor(jd) + 0.5;
        year = Math.floor(((30 * (jd - this.HIJRI_EPOCH)) + 10646) / 10631);
        month = Math.min(12,
                    Math.ceil((jd - (29 + this.toJulianDay(year, 1, 1))) / 29.5) + 1);
        day = (jd - this.toJulianDay(year, month, 1)) + 1;
        return { year: year, month: month, day: day };
    }

    getDaysInMonth(year: number, month: number): number {
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
            this.isLeap(year) ? 30 : 29  //ZulHaje
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
        const dayN = this.getDaysInMonth(this.year, this.month);
        this.day = dayN < this.day ? dayN : this.day;
        return this.getJulianDay();
    }

    setYear(year: number): number {
        if (typeof (year) === "undefined" || year < 1300 || year > 1440)
        return this.getJulianDay();

        this.year = year;
        const dayN = this.getDaysInMonth(this.year, this.month);
        this.day = dayN < this.day ? dayN : this.day;
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

window["VestaDatePicker"].calendars["hijri"] = new VestaDatePickerHijriCalendar();