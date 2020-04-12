import merge from "lodash-es/merge";
import { el, setStyle, setAttr, mount, setChildren } from "../../node_modules/redom/dist/redom.es";

import { VestaDatePickerSettings } from "./vesta-date-picker-settings";
import { VestaDatePickerDate } from "./vesta-date-picker-date";
import { VestaDatePickerGregorianCalendar } from "./vesta-date-picker-gregorian-calendar";
import { VestaDatePickerDateParser } from "./vesta-date-picker-date-parser";

class VestaDatePicker {

    private _settings: VestaDatePickerSettings;
    private _dateFormat: string;
    private _isInlinePicker: boolean;
    private _selectedJulianDay: number;
    private _currentView: number;
    private _startYear: number;
    private _endYear: number;
    private _dateParser: VestaDatePickerDateParser;
    private _minDateJd: number;
    private _maxDateJd: number;
    private _element: HTMLElement;
    private _container: HTMLElement;
    private _mainContainer: HTMLElement;
    private _clickHandlers: any;
    private _hideTimeoutHandler: number;

    constructor(element: HTMLElement, options?: VestaDatePickerSettings) {
        this._settings = merge(VestaDatePicker.defaultSettings, options);
        this._dateFormat = this._settings.dateFormat || this._settings.calendar.getDefaultDateFormat();
        this._selectedJulianDay = 0;
        this._currentView = 0; // 0 = dayView; 1 = month view; 2 = year view
        this._minDateJd = this.dateToGregorianJd(this._settings.minDate);
        this._maxDateJd = this.dateToGregorianJd(this._settings.maxDate);
        this._dateParser = new VestaDatePickerDateParser(this._settings.calendar);
        this.buildClickHandlers();
        this.drawUI(element);
        this.bindEventHandlers();
    }

    private dateToGregorianJd(date: Date | string): number {
        if (!date) return null;
        if (typeof(date)==='string') date = new Date(date);
        return this.gregorianToJd(date.getFullYear(), date.getMonth() + 1, date.getDate());
    }

    private gregorianToJd(year: number, month: number, day: number): number {
        var GREGORIAN_EPOCH = 1721425.5;
        return (GREGORIAN_EPOCH - 1) +
               (365 * (year - 1)) +
               Math.floor((year - 1) / 4) +
               (-Math.floor((year - 1) / 100)) +
               Math.floor((year - 1) / 400) +
               Math.floor((((367 * month) - 362) / 12) +
               ((month <= 2) ? 0 : ((((year % 4) == 0) && (!(((year % 100) == 0) && ((year % 400) != 0)))) ? -1 : -2)) + day);
    }

    private render(strDate?: string, raiseChange?: boolean): void {
        if (typeof (strDate) === "undefined" || !strDate) {
            this.setDate(null, false, false);
            return;
        }
        let date: VestaDatePickerDate;
        try {
            date = this._dateParser.parseDate(strDate, this._dateFormat);
        } catch(ex) {
            return;
        }
        this.setDate(date, true, false);
    }

    private setDate(date: VestaDatePickerDate, cultured: boolean, raiseChange: boolean) {
        if (!date) {
            this.setCalendarJulianDay(0, raiseChange);
            return;
        }
        if ((!date.hasOwnProperty("year") && !date.hasOwnProperty("month") && !date.hasOwnProperty("day")))
            throw "argument exception, date";
        date.month = typeof (date.month) === "undefined" || isNaN(date.month) ? this._settings.calendar.getMonth() : date.month;
        date.day = typeof (date.day) === "undefined" || isNaN(date.day) ? this._settings.calendar.getDay() : date.day;
        if (cultured) {
            this._settings.calendar.setDate(date.year, date.month, date.day);
            this._selectedJulianDay = this._settings.calendar.getJulianDay();
        } else {
            this._selectedJulianDay = this.gregorianToJd(date.year, date.month, date.day);
        }
        this.setCalendarJulianDay(this._selectedJulianDay, raiseChange);
    }

    private setCalendarJulianDay(jd: number, raiseChange: boolean): void {
        if (jd < this._minDateJd) {
            jd = this._minDateJd;
        } else if (this._maxDateJd && jd > this._maxDateJd){
            jd = this._maxDateJd;
        }
        this._selectedJulianDay = jd;
        this._settings.calendar.setJulianDay((jd > 0) ? jd : this.getTodayJulianDate());
        var dateStr = (jd > 0) ? this._settings.calendar.toString(this._dateFormat) : null;
        if (!this._isInlinePicker) {
            (this._element as HTMLInputElement).value = dateStr;
        }

        if (raiseChange) {
            this._settings.dateChanged(this._element, dateStr, this._settings.calendar);
        }            
        this.renderDayView();
    }

    renderDayView() {
        this._currentView = 0;
        const cal = this._settings.calendar;
        const months = cal.getMonthList(false);
        const headerTitle = months[cal.getMonth() - 1] + " " + this.getNumber(cal.getYear());
        const header = this.drawHeader(headerTitle, "view:month")
        setChildren(this._container, [header]);
        const calTable: HTMLElement = el("div.ui-vestadp-calendar", {
            style: { 
                direction: this._settings.direction,
                display: "none" 
            }
        });
        const weekHeader = el("div.ui-vestadp-weekheader");
        const weekdays = cal.getWeekdayList(true);
        for (var i = 0; i < weekdays.length; i++) {
            mount(weekHeader, el("div.ui-vestadp-weekday", weekdays[i]));
        }
        mount(calTable, weekHeader);
        const jd = cal.getJulianDay();
        cal.goFirstOfMonth();
        const currentMonth = cal.getMonth();
        const firstdow = cal.getWeekday();
        const todayJd = this.getTodayJulianDate();

        cal.addDay(-1 * firstdow);
        for (i = 0; i < 6; i++) {
            const wrow: HTMLElement = el("div");
            let cjd, wday : HTMLElement;
            for (var j = 0; j < 7; j++) {
                cjd = cal.getJulianDay();
                wday = el("div.ui-vestadp-day", this.getNumber(cal.getDay()), {
                    "data-event": "click",
                    "data-handler": "date",
                    "data-args": "day:" + cal.getDay() + ",month:" + cal.getMonth() + ",jd:" + cjd
                })
                
                if (cal.getMonth() != currentMonth)
                    wday.classList.add("ui-vestadp-inactive");
                if ( cjd == this._selectedJulianDay)
                    wday.classList.add("ui-vestadp-selected");
                if ( cjd == todayJd && (todayJd>=this._minDateJd && (!this._maxDateJd || this._maxDateJd>=todayJd)))
                    wday.classList.add('ui-vestadp-today');
                if ((this._minDateJd && this._minDateJd > cjd) || (this._maxDateJd && this._maxDateJd < cjd))
                    setAttr(wday, { disabled: "disabled" });
                mount(wrow, wday);
                cal.addDay(1);
            }
            mount(calTable ,wrow);
        }
        cal.setJulianDay(jd);
        mount(this._container, calTable);
        if (this._settings.showFooter && !this._settings.showInline) {
            mount(this._container, this.drawFooter())
        }
        calTable.style.display = "inherit";
    }

    renderMonthView() {
        const opts = this._settings;
        const calendar = opts.calendar;
        const headerTitle = this.getNumber(calendar.getYear());
        const header = this.drawHeader(headerTitle, "view:year")
        let months = calendar.getMonthList(true);
        let mIndex = 0;
        this._currentView = 1;
        setChildren(this._container, [header]);
        const calTable = el("table.ui-vestadp-calendar", {
            cellspacing: 1,
            style: { direction: opts.direction, display: 'none' }
        });
        for (let i = 0; i < 3; i++) {
            const mrow = el("tr.ui-vestadp-monthlist");
            for (let j = 0; j < 4; j++) {
                const mcell: HTMLElement = el("td", months[mIndex], {
                    "data-event": "click",
                    "data-handler": "view",
                    "data-args": "view:cal,month:" + (mIndex + 1)
    ,           });
                if (calendar.getMonth() == mIndex + 1)
                    mcell.classList.add("ui-vestadp-selected");
                mount(mrow ,mcell);
                mIndex++;
            }
            mount(calTable, mrow);
        }
        mount(this._container, calTable);
        if (this._settings.showFooter && !this._settings.showInline) {
            mount(this._container, this.drawFooter())
        }
        calTable.style.display = "inherit";
    }

    renderYearView(year: number) {
        this._currentView = 2;
        const calTable = el("table.ui-vestadp-calendar", {
            cellspacing: 1,
            style: { direction: "ltr", display: 'none' }
        });
        this._startYear = year - 4;
        this._endYear = year + 7;
        year = this._startYear;
        const headerTitle = this.getNumber(this._startYear) + " - " + this.getNumber(this._endYear);
        const header = this.drawHeader(headerTitle, "")
        setChildren(this._container, [header]);

        for (let i = 0; i < 3; i++) {
            const yrow = el("tr.ui-vestadp-yearlist");
            for (let j = 0; j < 4; j++) {
                const ycell: HTMLElement = el("td", this.getNumber(year), {
                    "data-handler": "view",
                    "data-args": "view:month,year:" + year,
                    "data-event": "click"
                })
                
                if (this._settings.calendar.getYear() == year)
                    ycell.classList.add("ui-vestadp-selected");
                mount(yrow, ycell);
                year++;
            }
            mount(calTable, yrow);
        }
        mount(this._container, calTable);
        if (this._settings.showFooter && !this._settings.showInline) {
            mount(this._container, this.drawFooter())
        }
        calTable.style.display = "inherit";
    }

    drawFooter() {
        const opts = this._settings;
        const todayBtn: HTMLElement = el("div.ui-vestadp-today-btn", opts.regional[opts.language].today);
        todayBtn.addEventListener("click", () => {
            this.setCalendarJulianDay(this.getTodayJulianDate(), true);
            this.hide();
        });

        const clearBtn: HTMLElement = el("div.ui-vestadp-clear", opts.regional[opts.language].clear);
        clearBtn.addEventListener("click", () => {
            this.setCalendarJulianDay(0, true);
            this.hide();
        })

        const footer = el("div.ui-vestadp-footer", [todayBtn, clearBtn]);
        return footer;
    }

    drawHeader(title: string, args: string): HTMLElement {
        const opts = this._settings;
        const header = el("div.ui-vestadp-header", [
            el("div.ui-vestadp-prev", "«", {
                "data-event": "click",
                "data-handler": "prev",
                "title": opts.regional[opts.language].previous
            }),
            el("div.ui-vestadp-title", title, {
                "data-event": "click",
                "data-handler": "view",
                "data-args": args,

            }),
            el("div.ui-vestadp-next", "»", {
                "data-event": "click",
                "data-handler": "next",
                "title": opts.regional[opts.language].next
            })
        ]);
        return header;
    }

    private getTodayJulianDate() {
        var today = new Date();
        return this.dateToGregorianJd(today);
    }

    private drawUI(element: HTMLElement): void {
        this._container = el("div.ui-vestadp-container");
        this._mainContainer = el("div.ui-vestadp-maincontainer", this._container);
        this._mainContainer.classList.add(this._settings.showInline ? 'ui-vestadp-inline' : 'ui-vestadp-popup');
        this._element = element;
        if (this.isTextBox(element)) {
            this.drawInputUI();
        } else {
            this.drawInlineUI();
        }
        setAttr(this._element, { vestadp: true });
    }

    private drawInlineUI() {
        this._isInlinePicker = true;
        setAttr(this._mainContainer, {
            "data-rel": "vestadatepicker-inline"
        });
        mount(this._element, this._mainContainer);
        this.render();
    }

    private drawInputUI() {
        setAttr(this._mainContainer, {
            style: { position: "absolute" },
            "data-rel": "vestadatepicker"
        });
        this.hide();
        mount(document.body, this._mainContainer);

        this._element.addEventListener("focus", (evt) => {
            this.render((this._element as HTMLInputElement).value, false);
            document.querySelectorAll("div[data-rel='vestadatepicker']")
                    .forEach(d => d.classList.add("ui-vestadp-closed"));
            let left, top;
            const rect = this._element.getBoundingClientRect();
            const offset = {
                top: rect.top + document.body.scrollTop,
                left: rect.left + document.body.scrollLeft
            };            
            if (this._settings.direction=="rtl")
                left = offset.left - (this._mainContainer.offsetWidth - this._element.offsetWidth) +"px"
            else
                left = offset.left + "px";
            setStyle(this._mainContainer, {
                position: "absolute",
                top: offset.top + this._element.offsetHeight + "px",
                left: left
            });
            this.show();
        });

        const renderFn = () => this.render((this._element as HTMLInputElement).value, false);
        this._element.addEventListener("input", renderFn);
        this._element.addEventListener("propertychange", renderFn);
        this._element.addEventListener("paste", renderFn);
        this._element.addEventListener("click", evt => evt.stopPropagation());
        this._element.addEventListener("blur", evt => {
            this._hideTimeoutHandler = setTimeout(() => this.hide(), 200);
        });
        this._mainContainer.addEventListener("click", (evt) => {
            clearTimeout(this._hideTimeoutHandler);
            evt.stopPropagation();
        });
        this._mainContainer.addEventListener("focus", () => console.log("focused"));
        this._mainContainer.addEventListener("blur", () => console.log("blured"));
    }

    private hide() {
        this._mainContainer.classList.add("ui-vestadp-closed");
    }

    private show() {
        this._mainContainer.classList.remove("ui-vestadp-closed");
    }

    private isTextBox(element: HTMLElement) {
        var tagName = element.tagName.toLowerCase();
        if (tagName === 'textarea') return true;
        if (tagName !== 'input') return false;
        var type = element.getAttribute('type').toLowerCase(),
            // if any of these input types is not supported by a browser, it will behave as input type text.
            inputTypes = ['text', 'password', 'number', 'email', 'tel', 'url', 'search', 'date', 'datetime', 'datetime-local', 'time', 'month', 'week', 'tel']
        return inputTypes.indexOf(type) >= 0;
    }

    private getNumber(num: any): string {
        if (!this._settings.persianNumbers || parseInt(num) < 0 || typeof (num) === "undefined")
            return num;
        if (parseInt(num) < 10)
            return String.fromCharCode(1632 + parseInt(num));
        var numStr = "";
        for (var i = 0; i < num.toString().length; i++) {
            numStr += this.getNumber(num.toString().charAt(i));
        }
        return numStr;
    }

    private bindEventHandlers() {
        this._container.addEventListener("click", (evt) => {
            const elm = (evt.target as HTMLElement);
            if (!elm.matches('[data-event="click"]')) {
                return;
            }

            if (elm.hasAttribute("disabled")) {
                return;
            }

            const handler = elm.getAttribute("data-handler");
            const args = this.parseArgs(elm.getAttribute("data-args"));
            const runAfter = this._clickHandlers[this._currentView][handler].call(this, args, elm);
            if (runAfter) {
                this._clickHandlers[this._currentView]["after"].call(this, args, elm);
            }
        });

        /*
        swipedetect(container[0], function (direction) {
            if (direction=='none') return true;
            
            var runAfter = clickHandlers[currentView][direction=='right' ? 'next' : 'prev'].call(this);
            if (runAfter) {
                clickHandlers[currentView]['after'].call(this);
            }
        });
        */
    }

    // to parse argument lists passed to clickable objects
    private parseArgs(args: string): any {
        if (!args)
            return undefined;
        const argsList = args.split(',');
        let argsArray: any = {};
        for (let i = 0; i < argsList.length; i++) {
            const argsParts = argsList[i].split(':');
            argsArray[argsParts[0]] = argsParts[1];
        }
        return argsArray;
    }

    private buildClickHandlers() {
        const calendar = this._settings.calendar;
        this._clickHandlers = [
            {
                "next": () => {  calendar.addMonth(1); return true;   },
                "prev": () => {  calendar.addMonth(-1); return true;   },
                "view": () => {  this.renderMonthView(); return false; },
                "date": (args: any, elem: HTMLElement) => {
                    calendar.setMonth(parseInt(args["month"]));
                    calendar.setDay(parseInt(args["day"]));
                    this._selectedJulianDay = calendar.getJulianDay();
                    const dateStr = calendar.toString(this._dateFormat);
                    this._settings.dateChanged(this._element, dateStr, calendar);
                    if (typeof (this._element) !== "undefined" && !this._isInlinePicker) {
                        setAttr(this._element, { value: dateStr});
                        this.hide();
                    } else if (typeof (this._element) !== "undefined" && this._isInlinePicker) {
                        this._container.querySelectorAll(".ui-vestadp-selected")
                                    .forEach(i => i.classList.remove("ui-vestadp-selected"));
                        elem.classList.add("ui-vestadp-selected");
                    }     

                    return false;               
                },
                "after": () => {
                    const calTable = this._container.querySelector(".ui-vestadp-calendar");
                    calTable.classList.add("ui-vestadp-calendar-inactive");
                    this.renderDayView();
                }
            },
            {
                "next": function () { calendar.addYear(1); return true; },
                "prev": function () { calendar.addYear(-1); return true; },
                "view": (args: any, elem: HTMLElement) => { 
                    if (args["view"] == "cal") {
                        calendar.setMonth(parseInt(args["month"]));
                        this.renderDayView();
                        return;
                    } else if (args["view"] == "year")
                        this.renderYearView(calendar.getYear());
                    return false;             
                 },
                 "after": (args: any, elem: HTMLElement) => {
                    const calTable = this._container.querySelector(".ui-vestadp-calendar");
                    calTable.classList.add("ui-vestadp-calendar-inactive");
                    this.renderMonthView();
                 }
            }, 
            {
                "next": () => {
                    const calTable = this._container.querySelector(".ui-vestadp-calendar");
                    calTable.classList.add("ui-vestadp-calendar-inactive");
                    this.renderYearView(this._endYear + 4);
                },
                "prev": () => {
                    const calTable = this._container.querySelector(".ui-vestadp-calendar");
                    calTable.classList.add("ui-vestadp-calendar-inactive");
                    this.renderYearView(this._startYear - 7);
                },
                "view": (args: any) => {
                    if (!args) return;
                    if (args["view"] == "month") {
                        calendar.setYear(parseInt(args["year"]));
                        const calTable = this._container.querySelector(".ui-vestadp-calendar");
                        calTable.classList.add("ui-vestadp-calendar-inactive");
                        this.renderMonthView();
                        return;
                    }                    
                },
                "after": () => {  }
            }
        ];
    }

    static defaultSettings: VestaDatePickerSettings = {
        direction: "ltr",
        dateFormat: "", // default dateFromat of each calendar
        showFooter: true,
        persianNumbers: false,
        regional: {
            "fa": {
                today: "امروز",
                clear: "پاکن",
                previous: "قبلی",
                next: "بعدی"
            },
            "en": {
                today: "Today",
                clear: "Clear",
                previous: "Previous",
                next: "Next"
            },
            "ar": {
                today: "الیوم",
                clear: "واضح",
                previous: "سابق",
                next: "التالی"
            }
        },
        language: 'en',
        calendar: new VestaDatePickerGregorianCalendar(), // [gregorian & persian & hijri] are available.
        dateChanged: function () { },
        minDate: null,
        maxDate: null,
        animation: 'fade',
        showInline: false
    };
}

declare let window:any;
window["VestaDatePicker"] = VestaDatePicker;