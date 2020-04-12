import { VestaDatePickerDate } from "./vesta-date-picker-date";
import { VestaDatePickerFirstDayOfWeek } from "./vesta-date-picker-fdow.enum";

export interface VestaDatePickerCalendar {
    isLeap(year: number): boolean;
    toJulianDay(year: number, month: number, day: number): number;
    fromJulianDay(jd: number): VestaDatePickerDate;
    getDaysInMonth (year: number, month: number): number;
    setJulianDay(jd: number): VestaDatePickerDate;
    setDate(year: number, month: number, day: number): void;
    setDay(day: number): number;
    setMonth(month: number): number;
    setYear(year: number): number;
    toString(format: string): string;
    getJulianDay(): number;
    getDay(): number;
    getMonth(): number;
    getYear(): number;
    getMonthList(abbr: boolean): string[];
    getDefaultDateFormat(): string;
    getWeekday(): number;
    getWeekdayList(abbr: boolean): string[];
    goFirstOfMonth(): number;
    addDay(n: number): number;
    addMonth(n: number): number;
    addYear(n: number): number;
    isSameMonth(jd: number): boolean;
    isSameYear(jd: number): boolean;
    getFirstDayOfWeek(): VestaDatePickerFirstDayOfWeek;
    setFirstDayOfWeek(fdow: VestaDatePickerFirstDayOfWeek): void;
}