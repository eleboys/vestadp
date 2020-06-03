import { VestaDatePickerDate } from "../ts/vesta-date-picker-date";
import { VestaDatePickerPersianCalendar } from "../ts/vesta-date-picker-persian-calendar";
import { VestaDatePickerDaysOfWeek } from "../ts/vesta-date-picker-dow.enum";

describe("VestaDatePickerPersianCalender", () => {
    let today: VestaDatePickerDate;
    let calendar: VestaDatePickerPersianCalendar;

    beforeAll(() => {
        today = new VestaDatePickerDate(1399, 3, 9);
        calendar = new VestaDatePickerPersianCalendar();
    });

    it("should setDate, setDay, setMonth, setYear properly", () => {
        // arrange
        calendar.setDate(today.year, today.month, today.day);
        // assert
        expect(calendar.getDay()).toEqual(today.day);
        expect(calendar.getMonth()).toEqual(today.month);
        expect(calendar.getYear()).toEqual(today.year);
    });

    [
        { input: 1399, output: true },
        { input: 1400, output: false },
        { input: 1401, output: false },
        { input: 1402, output: false },
        { input: 1403, output: false },
        { input: 1404, output: true },
        { input: 1405, output: false }
    ].forEach(t => {
        it(`should distinguish year ${t.input} ${t.output ? 'as' : 'as not'} a leap year`, () => {
            expect(calendar.isLeap(t.input)).toEqual(t.output);
        });
    })


    it("should calculate right date to and from julian day", () => {
        // arrange
        const jd = calendar.toJulianDay(1400, 12, 11);
        calendar.setJulianDay(jd);

        // act
        const date = calendar.fromJulianDay(jd);

        // assert
        expect(calendar.getDay()).toEqual(11);
        expect(calendar.getMonth()).toEqual(12);
        expect(calendar.getYear()).toEqual(1400);
        expect(date.day).toEqual(11);
        expect(date.month).toEqual(12);
        expect(date.year).toEqual(1400);
    });

    [
        { year: 1399, month: 1, output: 31},
        { year: 1399, month: 2, output: 31},
        { year: 1399, month: 3, output: 31},
        { year: 1399, month: 4, output: 31},
        { year: 1399, month: 5, output: 31},
        { year: 1399, month: 6, output: 31},
        { year: 1399, month: 7, output: 30},
        { year: 1399, month: 8, output: 30},
        { year: 1399, month: 9, output: 30},
        { year: 1399, month: 10, output: 30},
        { year: 1399, month: 11, output: 30},
        { year: 1399, month: 12, output: 30},
        { year: 1400, month: 12, output: 29},
    ].forEach(t => {
        it(`should know that year ${t.year}, ${t.month}th moth has ${t.output} days`, () => {
            // assert
            expect(calendar.getDaysInMonth(t.year, t.month)).toEqual(t.output);
        });
    });

    [
        { format: "dd/mm/yy", output: "12/03/1399" },
        { format: "DD، dd MM yy", output: "دوشنبه، 12 خرداد 1399" },
        { format: "dd MM yy", output: "12 خرداد 1399" },
    ].forEach(t => {
        it(`should toString with format "${t.format}" properly`, () => {
            // arrange
            calendar.setDate(1399, 3, 12);

            // assert
            expect(calendar.toString(t.format)).toEqual(t.output);
        });
    });

    it("should 12 month names for getMonthList", () => {
        // act
        const months = calendar.getMonthList(false);
        const monthsAbv = calendar.getMonthList(true);

        // assert
        expect(months.length).toEqual(12);
        expect(monthsAbv.length).toEqual(12);
        expect(months[0]).toEqual("فروردین");
        expect(monthsAbv[0]).toEqual("فروردین");
    });

    [
        { fdow: VestaDatePickerDaysOfWeek.Saturday, output: "شنبه" },
        { fdow: VestaDatePickerDaysOfWeek.Sunday, output: "یکشنبه"}
    ].forEach(t => {
        it(`should return ${t.output} as first day of week`, () => {
            // act
            calendar.setFirstDayOfWeek(t.fdow);

            // assert
            expect(calendar.getWeekdayList().length).toEqual(7);
            expect(calendar.getWeekdayList()[0]).toEqual(t.output);
        });
    });

    it("should goToFirstOfMonth correctly", () => {
        // arrange
        calendar.setDate(1399, 3, 12);
        // act
        calendar.goFirstOfMonth();
        // assert
        expect(calendar.toString("dd/mm/yy")).toEqual("01/03/1399");
    });

    [
        { days: 1, output: "02/03/1399" },
        { days: -1, output: "31/02/1399" },
        { days: 30, output: "31/03/1399" },
        { days: 31, output: "01/04/1399" },
        { days: 366, output: "01/03/1400" },
    ].forEach(t => {
        it(`should add ${t.days} day[s] to 1/3/1399 and be ${t.output}`, () => {
            // arrange
            calendar.setDate(1399, 3, 1);
            // act
            calendar.addDay(t.days)
            // assert
            expect(calendar.toString("dd/mm/yy")).toEqual(t.output);
        });
    });

    [
        { day: 1, month: 3, year: 1399, add: 1, output: "01/04/1399" },
        { day: 1, month: 3, year: 1399, add: -1, output: "01/02/1399" },
        { day: 1, month: 3, year: 1399, add: 12, output: "01/03/1400" },
        { day: 1, month: 3, year: 1399, add: -12, output: "01/03/1398" },
        { day: 1, month: 3, year: 1399, add: 6, output: "01/09/1399" },
        { day: 1, month: 1, year: 1399, add: -12, output: "01/01/1398" },
        { day: 1, month: 12, year: 1399, add: 12, output: "01/12/1400" },
    ].forEach(t => {
        it(`should add ${t.add} month[s] to ${t.day}/${t.month}/${t.year} and be ${t.output}`, () => {
            // arrange
            calendar.setDate(t.year, t.month, t.day);
            // act
            calendar.addMonth(t.add);
            // assert
            expect(calendar.toString("dd/mm/yy")).toEqual(t.output);
        });
    });
})