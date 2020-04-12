import { VestaDatePickerCalendar } from "./vesta-date-picker-calendar";
import { VestaDatePickerDate } from "./vesta-date-picker-date";

export class VestaDatePickerDateParser {
    private calendar: VestaDatePickerCalendar;
    private dateFormat: string;
    private iFormat: number;
    private iValue = 0;
    private shortYearCutoff = 10;
    private dayNamesShort: string[];
    private dayNames: string[];
    private monthNamesShort: string[];
    private monthNames: string[];

    constructor(calendar: VestaDatePickerCalendar) {
        this.calendar = calendar;
        this.dayNamesShort = this.calendar.getWeekdayList(true);
        this.dayNames = this.calendar.getWeekdayList(false);
        this.monthNamesShort = this.calendar.getMonthList(true);
        this.monthNames = this.calendar.getMonthList(false);
    }

    parseDate(value: string, dateFormat: string): VestaDatePickerDate {
        if (!dateFormat || !value) {
            throw "Invalid arguments";
        }

        let literal = false;
        let year = -1;
        let month = -1;
        let day = -1;
        let doy = -1;
        this.dateFormat = dateFormat;
        this.iValue = 0;
        value = value.toString();

        for (this.iFormat = 0; this.iFormat < dateFormat.length; this.iFormat++) {
            if (literal) {
                if (dateFormat.charAt(this.iFormat) === "'" && !this.lookAhead("'")) {
                    literal = false;
                } else {
                    this.checkLiteral(value);
                }
            } else {
                switch (dateFormat.charAt(this.iFormat)) {
                    case "d":
                        day = this.getNumber("d", value);
                        break;
                    case "D":
                        this.getName("D", value, this.dayNamesShort, this.dayNames);
                        break;
                    case "o":
                        doy = this.getNumber("o", value);
                        break;
                    case "m":
                        month = this.getNumber("m", value);
                        break;
                    case "M":
                        month = this.getName("M", value, this.monthNamesShort, this.monthNames);
                        break;
                    case "y":
                        year = this.getNumber("y", value);
                        break;
                    case "'":
                        if (this.lookAhead("'")) {
                            this.checkLiteral(value);
                        } else {
                            literal = true;
                        }
                        break;
                    default:
                        this.checkLiteral(value);
                }
            }
        }

        if (this.iValue < value.length) {
            const extra = value.substr(this.iValue);
            if (!/^\s+/.test(extra)) {
                throw "Extra/unparsed characters found in date: " + extra;
            }
        }

        if (year === -1) {
            year = this.calendar.getYear();
        } else if (year < 100) {
            year += this.calendar.getYear() - this.calendar.getYear() % 100 +
                (year <= this.shortYearCutoff ? 0 : -100);
        }

        if (doy > -1) {
            month = 1;
            day = doy;
            do {
                const dim = this.calendar.getDaysInMonth(year, month);
                if (day <= dim) {
                    break;
                }
                month++;
                day -= dim;
            } while (true);
        }

        return { year: year, month: month, day: day };
    }

    // Check whether a format character is doubled
    private lookAhead(match: string): boolean {
        var matches = (this.iFormat + 1 < this.dateFormat.length && this.dateFormat.charAt(this.iFormat + 1) === match);
        if (matches) {
            this.iFormat++;
        }
        return matches;
    }

    // Extract a number from the string value
    private getNumber(match: string, value: string) {
        var isDoubled = this.lookAhead(match),
            size = (match === "@" ? 14 : (match === "!" ? 20 :
            (match === "y" && isDoubled ? 4 : (match === "o" ? 3 : 2)))),
            digits = new RegExp("^\\d{1," + size + "}"),
            num = value.substring(this.iValue).match(digits);
        if (!num) {
            throw "Missing number at position " + this.iValue;
        }
        this.iValue += num[0].length;
        return parseInt(num[0], 10);
    }

    // Extract a name from the string value and convert to an index
    private getName(match: string, value: string, shortNames: string[], longNames: string[]) {
        let index = -1;
        let names = (this.lookAhead(match) ? longNames : shortNames).map((val, i) => {
            return { name: val, index: i };
        })

        names.forEach((pair) => {
            var name = pair.name;
            if (value.substr(this.iValue, name.length).toLowerCase() === name.toLowerCase()) {
                index = pair.index;
                this.iValue += name.length;
                return false;
            }
        });

        if (index !== -1) {
            return index + 1;
        } else {
            throw "Unknown name at position " + this.iValue;
        }
    }

    // Confirm that a literal character matches the string value
    private checkLiteral(value: string) {
        if (value.charAt(this.iValue) !== this.dateFormat.charAt(this.iFormat)) {
            throw "Unexpected literal at position " + this.iValue;
        }
        this.iValue++;
    }
}
