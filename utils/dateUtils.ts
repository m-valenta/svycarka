import { t } from "bobril-g11n";

export enum datItemParts {
  year,
  month,
  day
}
export declare type dateItem = [number, number, number]; // [year, month, day]

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
  startDay: DayOfWeek;
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
  let year =
    monthInfo.month === Month.January ? monthInfo.year - 1 : monthInfo.year;
  let month =
    monthInfo.month === Month.January ? Month.December : monthInfo.month - 1;
  return getMonthInfo(new Date(year, month, 1));
}

export function getNextMonthInfo(monthInfo: IMonthInfo): IMonthInfo {
  let year =
    monthInfo.month === Month.December ? monthInfo.year + 1 : monthInfo.year;
  let month =
    monthInfo.month === Month.December ? Month.January : monthInfo.month + 1;
  return getMonthInfo(new Date(year, month, 1));
}

export function translateDay(day: DayOfWeek): string {
  const days = [
    t("Sun"),
    t("Mon"),
    t("Tue"),
    t("Thr"),
    t("Wed"),
    t("Fry"),
    t("Sat")
  ];
  return days[day];
}

export function translateMonth(month: Month): string {
  const months = [
    t("January"),
    t("February"),
    t("March"),
    t("April"),
    t("May"),
    t("June"),
    t("July"),
    t("August"),
    t("September"),
    t("October"),
    t("November"),
    t("December")
  ];
  return months[month];
}

export function getCurrentDateItem(): dateItem {
  const date = new Date();
  return getDateItem(date.getFullYear(), date.getMonth(), date.getDate());
}

export function getDateItem(
  year: number,
  month: number,
  day: number
): dateItem {
  return [year, month, day];
}

export function clone(dateItem: dateItem, day?: number): dateItem {
  return getDateItem(dateItem[0], dateItem[1], day || dateItem[2]);
}

function daysInMonth(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

function startDay(date: Date): DayOfWeek {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
}
