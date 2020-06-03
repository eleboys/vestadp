import { VestaDatePickerCalendar } from "./vesta-date-picker-calendar";

export interface VestaDatePickerSettings {
    direction: "rtl" | "ltr";
    dateFormat: string;
    showFooter: boolean;
    persianNumbers: boolean;
    regional: any;
    language: string;
    calendar: "persian" | "gregorian" | "hijri";
    dateChanged: (elm: HTMLElement, dateStr: string, calendar: VestaDatePickerCalendar) => { };
    minDate: Date;
    maxDate: Date;
}
