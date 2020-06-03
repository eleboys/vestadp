import { VestaDatePicker } from "../ts/vesta-date-picker";

fdescribe("VestaDatePicker (Input Mode)", () => {
    let input: HTMLInputElement;
    let datepicker: VestaDatePicker;

    beforeEach(() => {
        input = document.createElement("input");
        input.setAttribute("type", "text");
        document.body.appendChild(input);
        datepicker = new VestaDatePicker(input);
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

    it("should select a date if a day is clicked", () => {
        input.dispatchEvent(new Event("focus"));
        const modeChangerBtn = document.querySelector(".ui-vestadp-title") as HTMLButtonElement;
        modeChangerBtn.click();
        const monthLists  = document.querySelectorAll(".ui-vestadp-monthlist");
        expect(monthLists).toBeTruthy();
        expect(monthLists.length).toEqual(3);
    });

    it("should go to month view if month name is clicked", () => {
        
        input.dispatchEvent(new Event("focus"));
        const modeChangerBtn = document.querySelector(".ui-vestadp-title") as HTMLButtonElement;
        modeChangerBtn.click();
        const monthLists  = document.querySelectorAll(".ui-vestadp-monthlist");
        expect(monthLists).toBeTruthy();
        expect(monthLists.length).toEqual(3);
    });

    it("should select month if one month is clicked", () => {
        input.dispatchEvent(new Event("focus"));
        let modeChangerBtn = document.querySelector(".ui-vestadp-title") as HTMLButtonElement;
        modeChangerBtn.click();
        const janBtn = document.querySelector("button[data-args='view:cal,month:1']") as HTMLButtonElement;
        janBtn.click();
        modeChangerBtn = document.querySelector(".ui-vestadp-title") as HTMLButtonElement;

        expect(modeChangerBtn.textContent).toContain("January");
    });

    it("should select a date when one day is clicked", () => {
        spyOn(datepicker.getOptions(), "dateChanged");
        datepicker.setDate({ year: 2020, month: 6, day: 3}, false, false);
        input.dispatchEvent(new Event("focus"));
        const container = document.querySelector(".ui-vestadp-maincontainer");
        const dayBtn = document.querySelector("button[data-args='day:18,month:6,jd:2459018.5']") as HTMLButtonElement;
        dayBtn.click();

        expect(container.classList.contains("ui-vestadp-closed")).toBeTrue();
        expect(input.value).toEqual("2020-06-18");
        expect(datepicker.getOptions().dateChanged).toHaveBeenCalledTimes(1);
    });

    it("should clear date when Clear button is clicked", () => {
        datepicker.setDate({ year: 2020, month: 6, day: 3}, false, false);
        input.dispatchEvent(new Event("focus"));
        const clearBtn = document.querySelector(".ui-vestadp-clear-btn") as HTMLButtonElement;
        clearBtn.click();

        expect(input.value).toEqual("");
        expect(datepicker.getDate(true, "dd-mm-yy")).toBeNull();      
    });

    it("should select today when Today button is clicked", () => {
        input.dispatchEvent(new Event("focus"));
        const today = new Date();
        const todayBtn = document.querySelector(".ui-vestadp-today-btn") as HTMLButtonElement;
        todayBtn.click();
        const [yy, mm, dd] = input.value.split('-');
        expect(+yy).toEqual(today.getFullYear());
        expect(+mm).toEqual(today.getMonth() + 1);
        expect(+dd).toEqual(today.getDate());
    });

    afterEach(() => {
        datepicker.dispose();
        document.body.removeChild(input);
        input = null;
        datepicker = null;
    })
});