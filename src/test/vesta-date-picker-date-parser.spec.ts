import { VestaDatePickerGregorianCalendar } from "../ts/vesta-date-picker-gregorian-calendar";
import { VestaDatePickerDateParser } from "../ts/vesta-date-picker-date-parser";

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
});