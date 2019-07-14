import { ICalendarReservationStrategy } from "../component";
import {
  DayOfWeek,
  IMonthInfo,
  dateItem,
  datItemParts as dateItemParts,
  getMonthInfo,
  Month,
  getPreviousMonthInfo,
  datItemParts,
  compareDateItem,
  getMonthInfoFromDateItem,
  getNextMonthInfo,
  getNextDayItem
} from "../../../utils/dateUtils";
import { IReservation } from "../../../data/reservation/types";
import { observable } from "bobx";

export enum SelectionState {
  none = 0,
  preview = 1,
  previewFirst = 2,
  previewLast = 4,
  selected = 8,
  selectedFirst = 16,
  selectedLast = 32
}

export interface IRangeState {
  isAvailable: boolean;
  startCurrentMonthIndex: number;
  endCurrentMonthIndex: number;
  startInPreviousMonth: boolean;
  endInNextMonth: boolean;
}

export class MonthDay {
  readonly date: dateItem;
  readonly text: string;
  readonly day: DayOfWeek;
  readonly isInCurrentMonth: boolean;
  readonly isReserved: boolean;
  readonly isSelectable: boolean;

  @observable
  selectionState: SelectionState;

  constructor(
    date: dateItem,
    text: string,
    day: DayOfWeek,
    isInCurrentMonth: boolean,
    isReserved: boolean,
    isSelectable: boolean
  ) {
    this.date = date;
    this.text = text;
    this.day = day;
    this.isInCurrentMonth = isInCurrentMonth;
    this.isReserved = isReserved;
    this.isSelectable = isSelectable;
    this.selectionState = SelectionState.none;
  }
}

export abstract class BaseReservationtrategy
  implements ICalendarReservationStrategy {
  protected abstract dayFormater(day: number): string;

  protected dateIsInHistory(
    day: number,
    monthInfo: IMonthInfo,
    currentDateItem: dateItem
  ): boolean {
    if (monthInfo.year < currentDateItem[dateItemParts.year]) return true;
    if (monthInfo.year > currentDateItem[dateItemParts.year]) return false;

    if (monthInfo.month < currentDateItem[dateItemParts.month]) return true;
    if (monthInfo.month > currentDateItem[dateItemParts.month]) return false;

    return day < currentDateItem[dateItemParts.day];
  }

  protected dateIsReserved(
    day: number,
    monthInfo: IMonthInfo,
    monthReservations: ReadonlyArray<IReservation> | undefined
  ): boolean {
    if (monthReservations == undefined) {
      return null;
    }

    const yearNumber = monthInfo.year;
    const monthNumber = monthInfo.month;

    for (let i = 0; i < monthReservations.length; i++) {
      const currentReservation = monthReservations[i];
      const currentReservationStart = currentReservation.dateItem;

      if (
        currentReservationStart[dateItemParts.year] !== yearNumber ||
        Math.abs(monthNumber - currentReservationStart[dateItemParts.month]) > 1
      )
        continue;

      if (monthNumber === currentReservationStart[dateItemParts.month]) {
        if (
          day === currentReservationStart[dateItemParts.day] ||
          (day > currentReservationStart[dateItemParts.day] &&
            day <=
              currentReservationStart[dateItemParts.day] +
                currentReservation.duration)
        )
          return true;
      } else if (monthNumber > currentReservation[dateItemParts.month]) {
        const currentReservationMonth = getMonthInfo(
          new Date(
            currentReservationStart[dateItemParts.year],
            currentReservationStart[dateItemParts.month]
          )
        );
        const daysRemaining =
          currentReservation.duration -
          (currentReservationMonth.daysCount -
            currentReservationStart[dateItemParts.day]);
        if (day <= daysRemaining) {
          return true;
        }
      }
      continue;
    }

    return false;
  }

  protected getMonthReservations(
    montInfo: IMonthInfo,
    reservations: ReadonlyMap<
      number,
      ReadonlyMap<number, ReadonlyArray<IReservation>>
    >
  ): ReadonlyArray<IReservation> | undefined {
    var yearReservations = reservations.get(montInfo.year);
    return yearReservations === undefined
      ? undefined
      : yearReservations.get(montInfo.month);
  }

  getMonthDay(
    day: number,
    dayOfWeek: DayOfWeek,
    isInCurrentMonth: boolean,
    monthInfo: IMonthInfo,
    currentDateItem: dateItem,
    reservations: ReadonlyMap<
      number,
      ReadonlyMap<number, ReadonlyArray<IReservation>>
    >,
    currentReservation: IReservation | undefined
  ): MonthDay {
    const isReserved = this.dateIsReserved(
      day,
      monthInfo,
      this.getMonthReservations(monthInfo, reservations)
    );

    const mDay = new MonthDay(
      [monthInfo.year, monthInfo.month, day],
      this.dayFormater(day),
      dayOfWeek,
      isInCurrentMonth,
      isReserved,
      !isReserved && !this.dateIsInHistory(day, monthInfo, currentDateItem)
    );

    mDay.selectionState = isInCurrentReservationRange()
      ? SelectionState.selected
      : SelectionState.none;

    return mDay;

    function isInCurrentReservationRange(): boolean {
      if (currentReservation === undefined) {
        return false;
      }

      if (
        currentReservation.dateItem[dateItemParts.year] === monthInfo.year &&
        currentReservation.dateItem[dateItemParts.month] === monthInfo.month &&
        (day >= currentReservation.dateItem[dateItemParts.day] &&
          day <
            currentReservation.dateItem[dateItemParts.day] +
              currentReservation.duration)
      ) {
        return true;
      }

      if (
        (monthInfo.year - currentReservation.dateItem[dateItemParts.year] ===
          1 &&
          currentReservation.dateItem[dateItemParts.year] === Month.December) ||
        monthInfo.month - currentReservation.dateItem[dateItemParts.month] === 1
      ) {
        let previousMonth = getPreviousMonthInfo(monthInfo);
        let dayIndex =
          currentReservation.dateItem[dateItemParts.day] +
          currentReservation.duration -
          previousMonth.daysCount;

        if (dayIndex <= 0) {
          return false;
        }

        if (day < dayIndex) {
          return true;
        }
      }

      return false;
    }
  }

  getSelectedReservation(
    selectedDay: MonthDay,
    currentMonth: IMonthInfo,
    currentDate: [number, number, number],
    currentReservation: IReservation,
    reservations: ReadonlyMap<
      number,
      ReadonlyMap<number, ReadonlyArray<IReservation>>
    >
  ): IReservation | undefined {
    // In history

    if (this.dateIsInHistory(selectedDay.date[datItemParts.day], currentMonth, currentDate)) {
      return undefined;
    }

    let startDate, endDate: dateItem;
    if (currentReservation !== undefined) {
      if (compareDateItem(selectedDay.date, currentReservation.dateItem) < 0) {
        startDate = selectedDay.date;
        endDate = currentReservation.dateItem;
      } else {
        startDate = currentReservation.dateItem;
        endDate = selectedDay.date;
      }
    } else {
      startDate = selectedDay.date;
      endDate = selectedDay.date;
    }

    let duration = 0;
    let workingDate = startDate;
    let workingMonth = getMonthInfoFromDateItem(workingDate);
    let workingReservations = this.getMonthReservations(
      workingMonth,
      reservations
    );
    while (compareDateItem(workingDate, endDate) <= 0) {
      if (
        this.dateIsReserved(workingDate[datItemParts.day], workingMonth, workingReservations)
      ) {
        return compareDateItem(workingDate, selectedDay.date) !== 0
          ? { dateItem: selectedDay.date, duration: 1 }
          : undefined;
      }

      workingDate = getNextDayItem(workingDate, workingMonth);
      if (workingDate[1] !== workingMonth.month) {
        workingMonth = getNextMonthInfo(workingMonth);
        workingReservations = this.getMonthReservations(
          workingMonth,
          reservations
        );
      }
      duration++;
    }

    return {dateItem: startDate, duration};
  }
}
