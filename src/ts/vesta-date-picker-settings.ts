export interface VestaDatePickerSettings {
    direction: "rtl" | "ltr";
    dateFormat: string;
    showFooter: boolean;
    persianNumbers: boolean;
    regional: any;
    language: string;
    calendar: "persian" | "gregorian" | "hijri";
    dateChanged: Function;
    minDate: Date;
    maxDate: Date;
    animation: string;
    showInline: boolean;
}
