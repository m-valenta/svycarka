export enum DayOfWeek {
    sunday,
    monday, 
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday
}

export enum Month {
    January, 
    February, 
    March, 
    April, 
    May, 
    June, 
    July, 
    August, 
    September, 
    October, 
    November, 
    December
}

export interface IMonthInfo {
    startDay: DayOfWeek,
    month: Month;
    year: number;
    daysCount: number;  
}

export function getMonthInfo(currentDate: Date = new Date()): IMonthInfo {
    return {
        startDay: startDay(currentDate),
        daysCount: daysInMonth(currentDate),
        month: currentDate.getMonth(),
        year: currentDate.getFullYear()
    };
}

export function getPreviousMonthInfo(monthInfo: IMonthInfo): IMonthInfo {
    let year = monthInfo.month === Month.January ? monthInfo.year - 1 : monthInfo.year;
    let month = monthInfo.month === Month.January ? Month.December : monthInfo.month - 1;
    return getMonthInfo(new Date(year, month, 1));
}

export function getNextMonthInfo(monthInfo: IMonthInfo): IMonthInfo {
    let year = monthInfo.month === Month.December ? monthInfo.year + 1 : monthInfo.year;
    let month = monthInfo.month === Month.December ? Month.January : monthInfo.month + 1;
    return getMonthInfo(new Date(year, month, 1));
}

export function translateDay(day: DayOfWeek): string {
    const days = ["Ne", "Po", "Út", "St", "Čt", "Pá", "So"];
    return days[day];
}

function daysInMonth (date: Date): number {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

function startDay(date: Date): DayOfWeek {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
}
