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
  getNextDayItem,
} from "../../../utils/dateUtils";
import { IReservation } from "../../../data/reservation/types";
import { observable, IObservableMap } from "bobx";

export enum SelectionState {
  none = 0,
  preview = 1,
  previewFirst = 2,
  previewLast = 4,
  selected = 8,
  selectedFirst = 16,
  selectedLast = 32,
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

export abstract class BaseReservationStrategy
  implements ICalendarReservationStrategy {
  protected abstract dayFormatter(day: number): string;

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
    monthReservations: ReadonlyArray<IReservation> | undefined,
    prevMonthReservations: ReadonlyArray<IReservation> | undefined
  ): [boolean, boolean | undefined] /* isReserved, isOnBorderOfReservation */ {
    if (monthReservations == undefined && prevMonthReservations == undefined) {
      return [false, undefined];
    }

    const yearNumber = monthInfo.year;
    const monthNumber = monthInfo.month;

    const prevMonthResLength =
      prevMonthReservations === undefined ? 0 : prevMonthReservations.length;
    const currentMonthResLength =
      monthReservations === undefined ? 0 : monthReservations.length;

    if (prevMonthResLength + currentMonthResLength === 0) return [false, undefined];

    for (let i = 0; i < prevMonthResLength + currentMonthResLength; i++) {
      const currentReservation =
        i < prevMonthResLength
          ? prevMonthReservations![i]
          : monthReservations![i - prevMonthResLength];
      const currentReservationStart = currentReservation.dateItem;

      if (
        currentReservationStart[dateItemParts.year] !== yearNumber ||
        Math.abs(monthNumber - currentReservationStart[dateItemParts.month]) > 1
      )
        continue;

      if (monthNumber === currentReservationStart[dateItemParts.month]) {
        if (day === currentReservationStart[dateItemParts.day])
          return [true, true];
        
        let endDay = currentReservationStart[dateItemParts.day] + currentReservation.duration;
        if (day > currentReservationStart[dateItemParts.day] && day <= endDay)
          return [true, day === endDay];

      } else if (
        monthNumber > currentReservation.dateItem[dateItemParts.month]
      ) {
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
          return [true, day == daysRemaining];
        }
      }
      continue;
    }

    return [false, undefined];
  }

  protected getMonthReservations(
    montInfo: IMonthInfo,
    reservations: IObservableMap<
      number,
      IObservableMap<number, ReadonlyArray<IReservation>>
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
    reservations: IObservableMap<
      number,
      IObservableMap<number, ReadonlyArray<IReservation>>
    >,
    currentReservation: IReservation | undefined
  ): MonthDay {
    let reservationState = this.dateIsReserved(
      day,
      monthInfo,
      this.getMonthReservations(monthInfo, reservations),
      this.getMonthReservations(getPreviousMonthInfo(monthInfo), reservations)
    );

    const mDay = new MonthDay(
      [monthInfo.year, monthInfo.month, day],
      this.dayFormatter(day),
      dayOfWeek,
      isInCurrentMonth,
      reservationState[0],
      this.isSelectable(day, monthInfo, currentDateItem, reservationState)
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
        day >= currentReservation.dateItem[dateItemParts.day] &&
        day <
          currentReservation.dateItem[dateItemParts.day] +
            currentReservation.duration
      ) {
        return true;
      }

      if (
        (monthInfo.year - currentReservation.dateItem[dateItemParts.year] ===
          1 &&
          currentReservation.dateItem[dateItemParts.month] === Month.December &&
          monthInfo.month === Month.January) ||
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

  isSelectable(day: number, monthInfo: IMonthInfo, currentDateItem: dateItem, isReserved: [boolean, boolean | undefined]): boolean {
    if(this.dateIsInHistory(day, monthInfo, currentDateItem))
      return false;
    
    return !isReserved[0] || (isReserved[1] ?? false);
  }

  getSelectedReservation(
    selectedDay: MonthDay,
    currentMonth: IMonthInfo,
    currentDate: [number, number, number],
    currentReservation: IReservation,
    reservations: IObservableMap<
      number,
      IObservableMap<number, ReadonlyArray<IReservation>>
    >
  ): IReservation | undefined {
    // In history

    if (
      this.dateIsInHistory(
        selectedDay.date[datItemParts.day],
        selectedDay.isInCurrentMonth
          ? currentMonth
          : getMonthInfoFromDateItem(selectedDay.date),
        currentDate
      )
    ) {
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
    let workingPrevReservations = this.getMonthReservations(
      getPreviousMonthInfo(workingMonth),
      reservations
    );

    while (compareDateItem(workingDate, endDate) <= 0) {
      
      const [isReserved, onBorderOfReservation] = this.dateIsReserved(
        workingDate[datItemParts.day],
        workingMonth,
        workingReservations,
        workingPrevReservations
      );

      if (isReserved && !onBorderOfReservation) {
        return compareDateItem(workingDate, selectedDay.date) !== 0
          ? { dateItem: selectedDay.date, duration: 1 }
          : undefined;
      }

      workingDate = getNextDayItem(workingDate, workingMonth);
      if (workingDate[1] !== workingMonth.month) {
        workingMonth = getNextMonthInfo(workingMonth);
        workingPrevReservations = workingPrevReservations;
        workingReservations = this.getMonthReservations(
          workingMonth,
          reservations
        );
      }
      duration++;
    }

    return { dateItem: startDate, duration };
  }
}
