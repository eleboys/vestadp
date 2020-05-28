import { VestaDatePickerDate } from "../ts/vesta-date-picker-date";
import { VestaDatePickerGregorianCalendar } from "../ts/vesta-date-picker-gregorian-calendar";

describe("VestaDatePickerGregorianCalender", () => {
    let today: VestaDatePickerDate;
    let calendar: VestaDatePickerGregorianCalendar;

    beforeAll(() => {
        const date = new Date();
        today = new VestaDatePickerDate(date.getFullYear(), date.getMonth(), date.getDate());
        calendar = new VestaDatePickerGregorianCalendar();
        calendar.setDate(today.year, today.month, today.day);
    })

    it("should setDate properly", () => {
        expect(calendar.getDay()).toEqual(today.day);
        expect(calendar.getMonth()).toEqual(today.month);
        expect(calendar.getYear()).toEqual(today.year);
    });
})