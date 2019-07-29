import { t, getLocale } from "bobril-g11n";

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

export function dateItemToDate(dateItem: dateItem): Date {
  return new Date(dateItem[0], dateItem[1], dateItem[2]);
}

export function getMonthInfoFromDateItem(date: dateItem): IMonthInfo {
  return getMonthInfo(dateItemToDate(date));
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
  return getDateItemFromDate(new Date());
}

export function getDateItemFromDate(date: Date): dateItem {
  return getDateItem(date.getFullYear(), date.getMonth(), date.getDate());
}

export function getDateItem(
  year: number,
  month: number,
  day: number
): dateItem {
  return [year, month, day];
}

export function localizeDateItem(
  dateItem: dateItem,
  dayOffset: number = 0
): string {

  dayOffset = dayOffset !== 0 ? dayOffset - 1 : dayOffset;
  const date = new Date(
    Date.UTC(
      dateItem[datItemParts.year],
      dateItem[datItemParts.month],
      dateItem[datItemParts.day] + dayOffset,
      0,
      0,
      0
    )
  );
  const locale = getLocale();

  return date.toLocaleDateString(locale);
}

export function clone(dateItem: dateItem, day?: number): dateItem {
  return getDateItem(dateItem[0], dateItem[1], day || dateItem[2]);
}

export function compareDateItem(dayL: dateItem, dayR: dateItem): number {
  var state = dayL[0] - dayR[0];

  if(state !== 0)
    return state;

  state = dayL[1] - dayR[1];
  
  if(state !== 0)
    return state;

  return dayL[2] - dayR[2];
}

export function getNextDayItem(day: dateItem, month: IMonthInfo): dateItem {
  if (day[datItemParts.day] + 1 <= month.daysCount) {
    return [day[datItemParts.year], day[datItemParts.month], day[datItemParts.day] + 1];
  }

  if (day[datItemParts.month] !== Month.December) {
    return [day[datItemParts.year], day[datItemParts.month] + 1, 1];
  }

  return [day[datItemParts.year] + 1, 1, 1];
}

function daysInMonth(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

function startDay(date: Date): DayOfWeek {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
}
