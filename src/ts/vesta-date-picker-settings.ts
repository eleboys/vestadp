import { VestaDatePickerCalendar } from "./vesta-date-picker-calendar";
import { VestaDatePickerViewMode } from "./vesta-date-picker-view-mode.enum";

export interface VestaDatePickerSettings {
    direction: "rtl" | "ltr";
    dateFormat: string;
    showFooter: boolean;
    persianNumbers: boolean;
    regional: any;
    language: string;
    calendar: VestaDatePickerCalendar,
    dateChanged: (elm: HTMLElement, dateStr: string, calendar: VestaDatePickerCalendar) => { };
    viewChanged: (view: VestaDatePickerViewMode) => { };
    minDate: Date;
    maxDate: Date;
}
