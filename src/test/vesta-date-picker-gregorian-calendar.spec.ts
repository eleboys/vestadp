import { VestaDatePickerDate } from "../ts/vesta-date-picker-date";
import { VestaDatePickerGregorianCalendar } from "../ts/vesta-date-picker-gregorian-calendar";
import { VestaDatePickerDaysOfWeek } from "../ts/vesta-date-picker-dow.enum";

describe("VestaDatePickerGregorianCalender", () => {
    let today: VestaDatePickerDate;
    let calendar: VestaDatePickerGregorianCalendar;

    beforeAll(() => {
        const date = new Date();
        today = new VestaDatePickerDate(date.getFullYear(), date.getMonth(), date.getDate());
        calendar = new VestaDatePickerGregorianCalendar();
    })


    it("should setDate, setDay, setMonth, setYear properly", () => {
        // arrange
        calendar.setDate(today.year, today.month, today.day);
        // assert
        expect(calendar.getDay()).toEqual(today.day);
        expect(calendar.getMonth()).toEqual(today.month);
        expect(calendar.getYear()).toEqual(today.year);
    });

    [
        { input: 2020, output: true },
        { input: 2021, output: false },
        { input: 2022, output: false },
        { input: 2023, output: false },
        { input: 2024, output: true },
        { input: 2025, output: false },
        { input: 2026, output: false }
    ].forEach(t => {
        it(`should distinguish year ${t.input} ${t.output ? 'as' : 'as not'} a leap year`, () => {
            expect(calendar.isLeap(t.input)).toEqual(t.output);
        });
    })


    it("should calculate right date to and from julian day", () => {
        // arrange
        const jd = calendar.toJulianDay(2020, 12, 11);
        calendar.setJulianDay(jd);

        // act
        const date = calendar.fromJulianDay(jd);

        // assert
        expect(calendar.getDay()).toEqual(11);
        expect(calendar.getMonth()).toEqual(12);
        expect(calendar.getYear()).toEqual(2020);
        expect(date.day).toEqual(11);
        expect(date.month).toEqual(12);
        expect(date.year).toEqual(2020);
    });

    [
        { year: 2020, month: 1, output: 31},
        { year: 2020, month: 2, output: 29},
        { year: 2020, month: 3, output: 31},
        { year: 2020, month: 4, output: 30},
        { year: 2020, month: 5, output: 31},
        { year: 2020, month: 6, output: 30},
        { year: 2020, month: 7, output: 31},
        { year: 2020, month: 8, output: 31},
        { year: 2020, month: 9, output: 30},
        { year: 2020, month: 10, output: 31},
        { year: 2020, month: 11, output: 30},
        { year: 2020, month: 12, output: 31},
        { year: 2021, month: 2, output: 28},
    ].forEach(t => {
        it(`should know that year ${t.year}, ${t.month}th moth has ${t.output} days`, () => {
            // assert
            expect(calendar.getDaysInMonth(t.year, t.month)).toEqual(t.output);
        });
    });

    [
        { format: "dd/mm/yy", output: "12/06/2020" },
        { format: "D M dd yy", output: "Fri Jun 12 2020" },
        { format: "dd MM yy", output: "12 June 2020" },
    ].forEach(t => {
        it(`should toString with format "${t.format}" properly`, () => {
            // arrange
            calendar.setDate(2020, 6, 12);

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
        expect(months[0]).toEqual("January");
        expect(monthsAbv[0]).toEqual("Jan");
    });

    [
        { fdow: VestaDatePickerDaysOfWeek.Monday, output: "Monday" },
        { fdow: VestaDatePickerDaysOfWeek.Sunday, output: "Sunday"}
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
        calendar.setDate(2020, 3, 12);
        // act
        calendar.goFirstOfMonth();
        // assert
        expect(calendar.toString("dd/mm/yy")).toEqual("01/03/2020");
    });

    [
        { days: 1, output: "02/03/2020" },
        { days: -1, output: "29/02/2020" },
        { days: 30, output: "31/03/2020" },
        { days: 31, output: "01/04/2020" },
        { days: 365, output: "01/03/2021" },
    ].forEach(t => {
        it(`should add ${t.days} day[s] to 1/3/2020 and be ${t.output}`, () => {
            // arrange
            calendar.setDate(2020, 3, 1);
            // act
            calendar.addDay(t.days)
            // assert
            expect(calendar.toString("dd/mm/yy")).toEqual(t.output);
        });
    });

    [
        { day: 1, month: 3, year: 2020, add: 1, output: "01/04/2020" },
        { day: 1, month: 3, year: 2020, add: -1, output: "01/02/2020" },
        { day: 1, month: 3, year: 2020, add: 12, output: "01/03/2021" },
        { day: 1, month: 3, year: 2020, add: -12, output: "01/03/2019" },
        { day: 1, month: 3, year: 2020, add: 6, output: "01/09/2020" },
        { day: 1, month: 1, year: 2020, add: -12, output: "01/01/2019" },
        { day: 1, month: 12, year: 2020, add: 12, output: "01/12/2021" },
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