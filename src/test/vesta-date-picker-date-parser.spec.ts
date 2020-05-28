import { VestaDatePickerGregorianCalendar } from "../ts/vesta-date-picker-gregorian-calendar";
import { VestaDatePickerDateParser } from "../ts/vesta-date-picker-date-parser";
import { VestaDatePickerPersianCalendar } from "../ts/vesta-date-picker-persian-calendar";
import { VestaDatePickerHijriCalendar } from "../ts/vesta-date-picker-hijri-calendar";

describe("VestaDatePickerDateParser", () => {
    describe("With Gregorian Calendar", () => {
        let gregorianCalendar;
        let parser: VestaDatePickerDateParser;

        beforeAll(() => {
            gregorianCalendar = new VestaDatePickerGregorianCalendar();
            parser = new VestaDatePickerDateParser(gregorianCalendar);
        });

        it("should parse date with yy-mm-dd format", () => {
            const date = parser.parseDate("1999-12-10", "yy-mm-dd");
            expect(date).toEqual({ year: 1999, month: 12, day: 10 });
        });

        it("should parse date with yy/m/d format", () => {
            const date = parser.parseDate("2020/2/1", "yy/m/d");
            expect(date).toEqual({ year: 2020, month: 2, day: 1 });
        });

        it("should parse date with D dd MM yy format", () => {
            const date = parser.parseDate("Sat 12 March 1999", "D dd MM yy");
            expect(date).toEqual({ year: 1999, month: 3, day: 12 });
        });
    });

    describe("With Persian Calendar", () => {
        let persianCalendar;
        let parser: VestaDatePickerDateParser;

        beforeAll(() => {
            persianCalendar = new VestaDatePickerPersianCalendar();
            parser = new VestaDatePickerDateParser(persianCalendar);
        });

        it("should parse date with yy/mm/dd format", () => {
            const date = parser.parseDate("1399/03/09", "yy/mm/dd");
            expect(date).toEqual({ year: 1399, month: 3, day: 9 });
        });

        it("should parse date with dd/mm/yy format", () => {
            const date = parser.parseDate("09/03/1399", "dd/mm/yy");
            expect(date).toEqual({ year: 1399, month: 3, day: 9 });
        });

        it("should parse date with 'DD، dd MM yy' format", () => {
            const date = parser.parseDate("جمعه، 9 خرداد 1399", "DD، dd MM yy");
            expect(date).toEqual({ year: 1399, month: 3, day: 9 });
        });
    });

    describe("With Hijri Calendar", () => {
        let hijriCalendar;
        let parser: VestaDatePickerDateParser;

        beforeAll(() => {
            hijriCalendar = new VestaDatePickerHijriCalendar();
            parser = new VestaDatePickerDateParser(hijriCalendar);
        });

        it("should parse date with yy/mm/dd format", () => {
            const date = parser.parseDate("1441/10/06", "yy/mm/dd");
            expect(date).toEqual({ year: 1441, month: 10, day: 6 });
        });

        it("should parse date with 'DD، dd MM yy' format", () => {
            const date = parser.parseDate("الجمعة، 6 شوال 1441", "DD، dd MM yy");
            expect(date).toEqual({ year: 1441, month: 10, day: 6 });
        });
    });
});