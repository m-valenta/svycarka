import { ICalendarReservationStrategy } from "../component";
import {
  DayOfWeek,
  IMonthInfo,
  dateItem,
  datItemParts as dateItemParts,
  getMonthInfo,
  Month,
  getPreviousMonthInfo,
  datItemParts
} from "../../../utils/dateUtils";
import { IReservation } from "../../../data/reservation/types";
import { observable } from "bobx";

export enum SelectionState {
  none = 0,
  offered = 1,
  offeredFirst = 2,
  offeredLast = 4,
  selected = 8,
  selectedFirst = 16,
  selectedLast = 32
}

export interface ISeasonPrice {
  months: ReadonlyArray<Month>;
  priceWeek: number;
  priceWeekend?: number;
}

export interface ISpecialDatePrice {
  readonly day: number;
  readonly month: number;
  readonly priceWeek?: number;
  readonly priceWeekend?: number;
}

export interface IPriceList {
  readonly seasons: ReadonlyArray<ISeasonPrice>;
  readonly specialDates: ReadonlyArray<ISpecialDatePrice>;
  readonly weekPrice: number;
  readonly weekendPrice: number;
}

export interface IRangeState {
  isAvailable: boolean;
  startCurrentMonthIndex: number;
  endCurrentMonthIndex: number;
  startInPreviousMonth: boolean;
  endInNextMonth: boolean;
}

export interface IRangeInfo {
  weekRange: IRangeState;
  weekendRange: IRangeState;
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
  protected readonly _priceList: IPriceList;
  protected readonly _seasonMap: (ISeasonPrice | undefined)[] = [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined
  ];

  constructor(priceList: IPriceList) {
    this._priceList = priceList;
    for (let i = 0; i < priceList.seasons.length; i++) {
      for (
        let monthIndex = 0;
        monthIndex < priceList.seasons[i].months.length;
        monthIndex++
      ) {
        this._seasonMap[monthIndex] = priceList.seasons[i];
      }
    }
  }

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
    reservations: ReadonlyArray<IReservation>
  ): boolean {
    const yearNumber = monthInfo.year;
    const monthNumber = monthInfo.month;

    for (let i = 0; i < reservations.length; i++) {
      const currentReservation = reservations[i];
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

  protected getRangeState(
    foundIndex: number,
    startOffset: number,
    endOffset: number,
    previousMonth: IMonthInfo,
    nextMonth: IMonthInfo,
    currentDate: dateItem,
    days: ReadonlyArray<MonthDay>,
    reservations: ReadonlyArray<IReservation>,
    checkSeason: boolean = false
  ): IRangeState {
    const range: IRangeState = {
      isAvailable: true,
      startInPreviousMonth: false,
      endInNextMonth: false,
      startCurrentMonthIndex: 32,
      endCurrentMonthIndex: -1
    };

    for (let i = foundIndex - startOffset; i < foundIndex + endOffset; i++) {
      if (i < 0) {
        const dayNumber =
          days[0].date[datItemParts.month] === previousMonth.month
            ? days[0].date[datItemParts.day] - i
            : previousMonth.daysCount + i;

        const season = this._seasonMap[previousMonth.month];
        if (
          (checkSeason && season.priceWeekend === undefined) ||
          this.dateIsInHistory(dayNumber, previousMonth, currentDate) ||
          this.dateIsReserved(dayNumber, previousMonth, reservations)
        ) {
          range.isAvailable = false;
          break;
        }

        range.startInPreviousMonth = true;
        continue;
      } else if (i > days.length - 1) {
        const dayNumber =
          days[days.length - 1].date[datItemParts.month] === nextMonth.month
            ? i - days.length + days[days.length - 1].date[dateItemParts.day]
            : i - days.length;
        const season = this._seasonMap[nextMonth.month];
        if (
          (checkSeason && season.priceWeekend === undefined) ||
          this.dateIsInHistory(dayNumber, nextMonth, currentDate) ||
          this.dateIsReserved(dayNumber, nextMonth, reservations)
        ) {
          range.isAvailable = false;
          break;
        }

        range.endInNextMonth = true;
        continue;
      }

      if (days[i].isSelectable) {
        range.startCurrentMonthIndex =
          i < range.startCurrentMonthIndex ? i : range.startCurrentMonthIndex;
        range.endCurrentMonthIndex =
          i > range.endCurrentMonthIndex ? i : range.startCurrentMonthIndex;
        continue;
      }

      range.isAvailable = false;
      break;
    }

    return range;
  }

  getMonthDay(
    day: number,
    dayOfWeek: DayOfWeek,
    isInCurrentMonth: boolean,
    monthInfo: IMonthInfo,
    currentDateItem: dateItem,
    reservations: ReadonlyArray<IReservation>,
    currentReservation: IReservation | undefined
  ): MonthDay {
    const isReserved = this.dateIsReserved(day, monthInfo, reservations);

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

  getSelectionRangeInfo(
    selectedDay: MonthDay,
    previousMonth: IMonthInfo,
    nextMonth: IMonthInfo,
    currentDate: dateItem,
    days: ReadonlyArray<MonthDay>,
    reservations: ReadonlyArray<IReservation>
  ): IRangeInfo {
    const foundIndex = days.indexOf(selectedDay);

    if (foundIndex < 0) {
      return;
    }

    let endOffset = DayOfWeek.saturday - selectedDay.day;
    let startOffset = 7 - endOffset;

    const weekRange = this.getRangeState(
      foundIndex,
      startOffset,
      endOffset + 1,
      previousMonth,
      nextMonth,
      currentDate,
      days,
      reservations
    );

    let weekendRange: IRangeState = {
      isAvailable: false,
      startInPreviousMonth: false,
      endInNextMonth: false,
      startCurrentMonthIndex: 32,
      endCurrentMonthIndex: -1
    };

    let season: ISeasonPrice | undefined;
    if (
      (selectedDay.day === DayOfWeek.friday ||
        selectedDay.day === DayOfWeek.saturday ||
        selectedDay.day === DayOfWeek.sunday) &&
      ((season = this._seasonMap[selectedDay.date[dateItemParts.month]]) ===
        undefined ||
        season.priceWeekend !== undefined)
    ) {
      let startOffset =
        selectedDay.day === DayOfWeek.friday
          ? 0
          : selectedDay.day === DayOfWeek.saturday
          ? 1
          : 2;
      let endOffset = 3 - startOffset;
      weekendRange = this.getRangeState(
        foundIndex,
        startOffset,
        endOffset,
        previousMonth,
        nextMonth,
        currentDate,
        days,
        reservations
      );
    }

    return {
      weekRange,
      weekendRange
    };
  }
}
