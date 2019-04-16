import { observable, computed } from "bobx";
import * as b from "bobril";
import {
  IMonthInfo,
  getMonthInfo,
  getPreviousMonthInfo,
  getNextMonthInfo,
  DayOfWeek,
  translateDay,
  translateMonth,
  dateItem,
  getCurrentDateItem,
  getDateItem,
  datItemParts
} from "../../utils/dateUtils";
import * as styles from "./styles";
import { IReservationStore, IReservation } from "../../data/reservation/types";
import { rightArrow, leftArrow } from "../../styleConstants";

class CalendarComponent extends b.Component<ICalendarData> {
  @observable.ref
  protected _currentMonth: IMonthInfo;

  protected _previousMonth: IMonthInfo;
  protected _nextMonth: IMonthInfo;

  protected readonly _days: DayOfWeek[];
  protected readonly _startDay: DayOfWeek;

  constructor(data: ICalendarData) {
    super(data);

    this._currentMonth = getMonthInfo(data.referencedDate);
    this._previousMonth = getPreviousMonthInfo(this._currentMonth);
    this._nextMonth = getNextMonthInfo(this._currentMonth);

    this._startDay = data.startDay || DayOfWeek.monday;
    this._days = [];
    for (let i = 0, x = this._startDay; i < 7; i++) {
      this._days.push(x++ % 7);
    }

    this.refreshReservations();
  }

  render(): b.IBobrilNode {
    const me: b.IBobrilNode = {
      tag: "div"
    };

    me.children = [
      calendarHeader(this),
      this.dayHeader(),
      this.dayRows(this.getMonthDays())
    ];

    b.style(me, styles.wrapperStyle);
    return me;
  }

  goToNextMonth(): void {
    this._previousMonth = this._currentMonth;
    this._currentMonth = this._nextMonth;
    this._nextMonth = getNextMonthInfo(this._currentMonth);
    this.refreshReservations();
  }

  goToPreviousMoth(): void {
    this._nextMonth = this._currentMonth;
    this._currentMonth = this._previousMonth;
    this._previousMonth = getPreviousMonthInfo(this._currentMonth);
    this.refreshReservations();
  }

  get currentMonth(): IMonthInfo {
    return this._currentMonth;
  }

  @computed
  protected getMonthDays(): IMonthDay[] {
    const currentDayItem = getCurrentDateItem();
    const reservations = this.data.store.reservationList || [];
    const monthDays: IMonthDay[] = [];

    let day = this._startDay;
    const prevDays = Math.abs(this._startDay - this._currentMonth.startDay);
    for (
      let i = this._previousMonth.daysCount - prevDays + 1;
      i <= this._previousMonth.daysCount;
      i++
    ) {
      monthDays.push(
        this.data.reservationStrategy.getMonthDay(
          i,
          day,
          false,
          this._previousMonth,
          currentDayItem,
          reservations
        )
      );
      day = (day + 1) % 7;
    }

    for (let i = 1; i <= this._currentMonth.daysCount; i++) {
      monthDays.push(
        this.data.reservationStrategy.getMonthDay(
          i,
          day,
          true,
          this._currentMonth,
          currentDayItem,
          reservations
        )
      );

      if (i === this._currentMonth.daysCount) {
        continue;
      }
      day = (day + 1) % 7;
    }

    const nextDays = 6 - Math.abs(day - this._startDay);
    for (let i = 1; i <= nextDays; i++) {
      monthDays.push(
        this.data.reservationStrategy.getMonthDay(
          i,
          day,
          false,
          this._nextMonth,
          currentDayItem,
          reservations
        )
      );
      day = (day + 1) % 7;
    }

    return monthDays;
  }

  protected dayHeader(): b.IBobrilChild {
    return b.styledDiv(
      this._days.map(day => b.styledDiv(translateDay(day), styles.columnStyle)),
      styles.dayLine
    );
  }

  protected dayRows(monthDays: ReadonlyArray<IMonthDay>): b.IBobrilChildren {
    let children: b.IBobrilChildren = [];

    let line: b.IBobrilChildren = [];

    for (let i = 0; i < monthDays.length; i++) {
      const currentDay = monthDays[i];
      line.push(b.styledDiv(currentDay.text, this.getDayStyle(currentDay)));
      if (line.length !== 7) {
        continue;
      }

      children.push(b.styledDiv(line, styles.rowStyle));
      line = [];
    }

    return children;
  }

  protected getDayStyle(day: IMonthDay): b.IBobrilStyle[] {
    var style = [styles.columnStyle];
    !day.isInCurrentMonth && style.push(styles.columnStyleOtherMonth);
    day.isReserved && style.push(styles.columnStyleReserved);
    day.isSelectable && style.push(styles.columnStyleSelectable);

    return style;
  }

  protected refreshReservations() {
    this.data.store.loadReservationList(
      this._currentMonth.month,
      this._currentMonth.year
    );
  }
}

class CalendarHeader extends b.Component<ICalendarHeaderData> {
  render(): b.IBobrilNode {
    const me: b.IBobrilNode = {
      tag: "div"
    };

    me.children = b.styledDiv(
      [
        this.leftButton(),
        this.month(),
        this.rightButton(),
        b.styledDiv(undefined, { clear: "both" })
      ],
      styles.headerWrapper
    );

    return me;
  }

  protected month(): b.IBobrilNode {
    return b.styledDiv(
      translateMonth(this.data.currentMonth.month),
      styles.monthWrapper
    );
  }

  protected leftButton(): b.IBobrilNode {
    return b.style(this.button(() => this.data.goToPreviousMoth()), leftArrow);
  }

  protected rightButton(): b.IBobrilNode {
    return b.style(this.button(() => this.data.goToNextMonth()), rightArrow);
  }

  protected button(action: () => void): b.IBobrilNode {
    return b.style(
      {
        tag: "div",
        component: {
          onClick() {
            action();
            return true;
          }
        }
      },
      styles.headerButtonStyle
    );
  }
}

interface ICalendarHeaderData {
  goToNextMonth(): void;
  goToPreviousMoth(): void;
  currentMonth: IMonthInfo;
}

export interface IMonthDay {
  readonly date: dateItem;
  readonly text: string;
  readonly day: DayOfWeek;
  readonly isInCurrentMonth: boolean;
  readonly isReserved: boolean;
  readonly isSelectable: boolean;
}

export interface ICalendarReservationStrategy {
  getMonthDay(
    day: number,
    dayOfWeek: DayOfWeek,
    isInCurrentMonth: boolean,
    monthInfo: IMonthInfo,
    currentDateItem: dateItem,
    reservations: ReadonlyArray<IReservation>
  ): IMonthDay;
}

export interface ICalendarData {
  store: IReservationStore;
  reservationStrategy: ICalendarReservationStrategy;
  startDay?: DayOfWeek;
  referencedDate?: Date;
}

const calendarHeader = b.component(CalendarHeader);
export const calendar = b.component(CalendarComponent);
1;
