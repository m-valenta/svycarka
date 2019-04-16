import { ICalendarReservationStrategy, IMonthDay } from "../component";
import {
  DayOfWeek,
  IMonthInfo,
  dateItem,
  datItemParts as dateItemParts,
  getMonthInfo,
  Month
} from "../../../utils/dateUtils";
import { IReservation } from "../../../data/reservation/types";

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

  protected dateIsSelectable(
    dayOfWeek: DayOfWeek,
    monthInfo: IMonthInfo
  ): boolean {
    if (dayOfWeek === DayOfWeek.sunday) return false;

    if (dayOfWeek !== DayOfWeek.friday) {
      return true;
    }

    const season = this._seasonMap[monthInfo.month];
    return season === undefined || season.priceWeekend !== undefined;
  }

  getMonthDay(
    day: number,
    dayOfWeek: DayOfWeek,
    isInCurrentMonth: boolean,
    monthInfo: IMonthInfo,
    currentDateItem: dateItem,
    reservations: ReadonlyArray<IReservation>
  ): IMonthDay {
    const isReserved = this.dateIsReserved(day, monthInfo, reservations);

    return {
      text: this.dayFormater(day),
      date: [monthInfo.year, monthInfo.month, day],
      day: dayOfWeek,
      isInCurrentMonth: isInCurrentMonth,
      isReserved,
      isSelectable:
        !isReserved &&
        !this.dateIsInHistory(day, monthInfo, currentDateItem) &&
        dayOfWeek !== DayOfWeek.sunday
    };
  }
}
