import { VestaDatePicker } from "../ts/vesta-date-picker";
import { VestaDatePickerGregorianCalendar } from "../ts/vesta-date-picker-gregorian-calendar";
import { VestaDatePickerViewMode } from "../ts/vesta-date-picker-view-mode.enum";

describe("VestaDatePicker (Input Mode)", () => {
    let input: HTMLInputElement;
    let datepicker: VestaDatePicker;

    beforeEach(() => {
        input = document.createElement("input");
        input.setAttribute("type", "text");
        document.body.appendChild(input);
        datepicker = new VestaDatePicker(input, {
            ...VestaDatePicker.defaultSettings,
            calendar: new VestaDatePickerGregorianCalendar()
        });
    });

    it("should create datepicker", () => {
        expect(datepicker).toBeTruthy();
    });

    it("should append the main container to body", () => {
        const elements = document.getElementsByClassName("ui-vestadp-maincontainer");
        expect(elements.length).toEqual(1);
    });

    it("should be closed initially", () => {
        const elements = document.getElementsByClassName("ui-vestadp-closed");
        expect(elements.length).toEqual(1);
    });

    it("should set date properly", () => {
        spyOn(datepicker.getOptions(), "dateChanged");

        datepicker.setDate({ year: 2020, month: 6, day: 3}, false, false);
        input.dispatchEvent(new Event("focus"));
        const elmSelectedDate = document.querySelector(".ui-vestadp-selected");

        expect(input.value).toEqual("2020-06-03");
        expect(elmSelectedDate).toBeTruthy();
        expect(elmSelectedDate.textContent).toEqual("3");
        expect(datepicker.getOptions().dateChanged).toHaveBeenCalledTimes(0);         
    });

    it("should raise an event on set date if asked", () => {
        spyOn(datepicker.getOptions(), "dateChanged");
        datepicker.setDate({ year: 2020, month: 6, day: 3}, false, true);
        expect(datepicker.getOptions().dateChanged).toHaveBeenCalledTimes(1);            
    });

    it("should give today css class 'ui-vestadp-today'", () => {
        input.dispatchEvent(new Event("focus"));
        const today = new Date();
        const elmToday = document.querySelector(".ui-vestadp-today");

        expect(elmToday).toBeTruthy();
        expect(elmToday.textContent).toEqual(today.getDate().toString());
    });

    it("should show picker when show method is called", () => {
        datepicker.show();
        const elements = document.getElementsByClassName("ui-vestadp-closed");
        expect(elements.length).toEqual(0);
        expect(datepicker.getCurrentView()).toEqual(VestaDatePickerViewMode.Day);
    });

    it("should hide when somewhere outside is clicked", () => {
        datepicker.show();
        document.body.click();
        const elements = document.getElementsByClassName("ui-vestadp-closed");
        expect(elements.length).toEqual(1);
    });

    it("should select a date if a day is clicked", () => {
        input.dispatchEvent(new Event("focus"));
        const modeChangerBtn = document.querySelector<HTMLButtonElement>(".ui-vestadp-title");
        modeChangerBtn.click();
        const monthLists  = document.querySelectorAll(".ui-vestadp-monthlist");
        expect(monthLists).toBeTruthy();
        expect(monthLists.length).toEqual(3);
    });

    it("should go to month view if month name is clicked", () => {
        input.dispatchEvent(new Event("focus"));
        document.querySelector<HTMLButtonElement>(".ui-vestadp-title").click();
        const monthList  = document.querySelectorAll(".ui-vestadp-monthlist");
        expect(monthList).toBeTruthy();
        expect(monthList.length).toEqual(3);
        expect(datepicker.getCurrentView()).toEqual(VestaDatePickerViewMode.Month);
    });

    it("should go to year view if year name is clicked", () => {
        datepicker.setDate({ year: 2020, month: 6, day: 3}, false, false);
        input.dispatchEvent(new Event("focus"));
        document.querySelector<HTMLButtonElement>(".ui-vestadp-title").click(); // month view
        document.querySelector<HTMLButtonElement>(".ui-vestadp-title").click(); // year view
        const yearList  = document.querySelectorAll(".ui-vestadp-yearlist");
        expect(yearList).toBeTruthy();
        expect(yearList.length).toEqual(3);
        expect(datepicker.getCurrentView()).toEqual(VestaDatePickerViewMode.Year);
    });

    [
        { buttonSelector: "button[data-args='view:cal,month:1']", expectedTitle: "January 2020", title: "should select month if one month is clicked" },
        { buttonSelector: "button.ui-vestadp-next", expectedTitle: "2021", title: "should go to next year if next button is clicked in month view" },
        { buttonSelector: "button.ui-vestadp-prev", expectedTitle: "2019", title: "should go to previous year if previous button is clicked in month view" }
    ].forEach((testCase) => {
        it(testCase.title, () => {
            datepicker.setDate({ year: 2020, month: 6, day: 3}, false, false);
            input.dispatchEvent(new Event("focus"));
            document.querySelector<HTMLButtonElement>(".ui-vestadp-title").click(); // month view
            document.querySelector<HTMLButtonElement>(testCase.buttonSelector).click();
    
            const title = document.querySelector<HTMLButtonElement>(".ui-vestadp-title").textContent;
            expect(title).toEqual(testCase.expectedTitle);
        });
    });

    [
        { buttonSelector: "button[data-args='view:month,year:2016']", expectedTitle: "2016", title: "should select year view if one year is clicked" },
        { buttonSelector: "button.ui-vestadp-next", expectedTitle: "2027 - 2038", title: "should go to next year range if next button is clicked in year view" },
        { buttonSelector: "button.ui-vestadp-prev", expectedTitle: "2005 - 2016", title: "should go to previous year range if previous button is clicked in year view" }
    ].forEach((testCase) => {
        it(testCase.title, () => {
            datepicker.setDate({ year: 2020, month: 6, day: 3}, false, false);
            input.dispatchEvent(new Event("focus"));
            document.querySelector<HTMLButtonElement>(".ui-vestadp-title").click(); // month view
            document.querySelector<HTMLButtonElement>(".ui-vestadp-title").click(); // year view
            document.querySelector<HTMLButtonElement>(testCase.buttonSelector).click();
    
            const title = document.querySelector<HTMLButtonElement>(".ui-vestadp-title").textContent;
            expect(title).toEqual(testCase.expectedTitle);
        });
    });

    it("should select a date when one day is clicked", () => {
        spyOn(datepicker.getOptions(), "dateChanged");
        datepicker.setDate({ year: 2020, month: 6, day: 3}, false, false);
        input.dispatchEvent(new Event("focus"));
        const container = document.querySelector(".ui-vestadp-maincontainer");
        const dayBtn = document.querySelector<HTMLButtonElement>("button[data-args='day:18,month:6,jd:2459018.5']");
        dayBtn.click();

        expect(container.classList.contains("ui-vestadp-closed")).toBeTrue();
        expect(input.value).toEqual("2020-06-18");
        expect(datepicker.getOptions().dateChanged).toHaveBeenCalledTimes(1);
    });

    it("should clear date when Clear button is clicked", () => {
        datepicker.setDate({ year: 2020, month: 6, day: 3}, false, false);
        input.dispatchEvent(new Event("focus"));
        const clearBtn = document.querySelector<HTMLButtonElement>(".ui-vestadp-clear-btn");
        clearBtn.click();

        expect(input.value).toEqual("");
        expect(datepicker.getDate(true, "dd-mm-yy")).toBeNull();      
    });

    it("should select today when Today button is clicked", () => {
        input.dispatchEvent(new Event("focus"));
        const today = new Date();
        const todayBtn = document.querySelector<HTMLButtonElement>(".ui-vestadp-today-btn");
        todayBtn.click();
        const [yy, mm, dd] = input.value.split('-');
        expect(+yy).toEqual(today.getFullYear());
        expect(+mm).toEqual(today.getMonth() + 1);
        expect(+dd).toEqual(today.getDate());
    });

    it("should not allow picking dates more than max date", () => {
        datepicker.setDate({ year: 2020, month: 6, day: 3}, false, false);
        datepicker.setMaxDate(new Date("2020-06-04"));

        const disabledButtons = document.querySelectorAll("button.ui-vestadp-day[disabled]");
        expect(disabledButtons.length).toEqual(38);
    });

    it("should not allow setting dates more than max date", () => {
        datepicker.setDate({ year: 2020, month: 6, day: 3}, false, false);
        datepicker.setMaxDate(new Date("2020-06-04"));
        datepicker.setDate({ year: 2020, month: 6, day: 5}, false, false);
        expect(input.value).toEqual("2020-06-04");
        expect(datepicker.getMaxDate().toDateString()).toEqual("Thu Jun 04 2020");
    });

    it("should not allow picking dates less than min date", () => {
        datepicker.setDate({ year: 2020, month: 6, day: 3}, false, false);
        datepicker.setMinDate(new Date("2020-06-02"));

        const disabledButtons = document.querySelectorAll("button.ui-vestadp-day[disabled]");
        expect(disabledButtons.length).toEqual(1);
    });

    it("should not allow setting dates less than min date", () => {
        datepicker.setDate({ year: 2020, month: 6, day: 3}, false, false);
        datepicker.setMinDate(new Date("2020-06-02"));
        datepicker.setDate({ year: 2020, month: 6, day: 1}, false, false);
        expect(input.value).toEqual("2020-06-02");
        expect(datepicker.getMinDate().toDateString()).toEqual("Tue Jun 02 2020");
    });

    afterEach(() => {
        datepicker.dispose();
        document.body.removeChild(input);
        input = null;
        datepicker = null;
    });
});