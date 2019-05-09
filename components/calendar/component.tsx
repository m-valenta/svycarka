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
  Month,
  datItemParts
} from "../../utils/dateUtils";
import * as styles from "./styles";
import { IReservationStore, IReservation } from "../../data/reservation/types";
import { rightArrow, leftArrow } from "../../styleConstants";
import {
  MonthDay,
  SelectionState,
  IRangeInfo,
  IRangeState
} from "./reservationStrategies/baseStrategy";

const clearMouseMask =
  SelectionState.selected |
  SelectionState.selectedFirst |
  SelectionState.selectedLast;

const clearSelectionMask =
  SelectionState.offered |
  SelectionState.offeredFirst |
  SelectionState.offeredLast;

export interface ICalendarData {
  store: IReservationStore;
  reservationStrategy: ICalendarReservationStrategy;
  startDay?: DayOfWeek;
  referencedDate?: Date;
}

export class Calendar extends b.Component<ICalendarData> {
  @observable.ref
  protected _currentMonth: IMonthInfo;

  protected _previousMonth: IMonthInfo;
  protected _nextMonth: IMonthInfo;

  protected readonly _days: DayOfWeek[];
  protected readonly _startDay: DayOfWeek;

  constructor(data: ICalendarData) {
    super(data);

    let refDate: Date | undefined;
    refDate =
      data.referencedDate !== undefined
        ? data.referencedDate
        : data.store.currentReservation.value !== undefined
        ? new Date(
            Date.UTC(
              data.store.currentReservation.value.dateItem[datItemParts.year],
              data.store.currentReservation.value.dateItem[datItemParts.month],
              data.store.currentReservation.value.dateItem[datItemParts.day]
            )
          )
        : undefined;

    this._currentMonth = getMonthInfo(refDate);
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
    return (
      <div style={styles.wrapperStyle}>
        <CalendarHeader
          goToNextMonth={() => this.goToNextMonth()}
          goToPreviousMonth={() => this.goToPreviousMonth()}
          currentMonth={this._currentMonth}
        />
        <CalendarDayHeader daysOfWeek={this._days} />
        <CalendarDays
          monthDays={this.getMonthDays()}
          selectionHandler={(day, mode) => this.daySelectionChange(day, mode)}
        />
      </div>
    );
  }

  get currentMonth(): IMonthInfo {
    return this._currentMonth;
  }

  goToNextMonth(): void {
    this._previousMonth = this._currentMonth;
    this._currentMonth = this._nextMonth;
    this._nextMonth = getNextMonthInfo(this._currentMonth);
    this.refreshReservations();
  }

  goToPreviousMonth(): void {
    this._nextMonth = this._currentMonth;
    this._currentMonth = this._previousMonth;
    this._previousMonth = getPreviousMonthInfo(this._currentMonth);
    this.refreshReservations();
  }

  daySelectionChange(day: MonthDay, mode: SelectionMode): void {
    switch (mode) {
      case SelectionMode.mouseOut:
        this.clearSelection(clearMouseMask);
        break;
      case SelectionMode.unSelect:
        this.data.store.currentReservation = undefined;
      case SelectionMode.mouseIn:
        this.doMouseSelection(day, this.getMonthDays());
        break;
      case SelectionMode.select:
        this.clearSelection(clearSelectionMask);
        this.doClickSelection(day, this.getMonthDays());
        break;
    }
  }

  @computed
  protected getMonthDays(): MonthDay[] {
    const currentDayItem = getCurrentDateItem();
    const reservations = this.data.store.reservationList || [];
    const monthDays: MonthDay[] = [];

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
          reservations,
          this.data.store.currentReservation.value
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
          reservations,
          this.data.store.currentReservation.value
        )
      );

      if (i === this._currentMonth.daysCount) {
        continue;
      }
      day = (day + 1) % 7;
    }

    const nextDays = 6 - Math.abs(day - this._startDay);
    for (let i = 1; i <= nextDays; i++) {
      day = (day + 1) % 7;
      monthDays.push(
        this.data.reservationStrategy.getMonthDay(
          i,
          day,
          false,
          this._nextMonth,
          currentDayItem,
          reservations,
          this.data.store.currentReservation.value
        )
      );
    }

    return monthDays;
  }

  protected refreshReservations() {
    this.data.store.loadReservationList(
      this._currentMonth.month,
      this._currentMonth.year
    );
  }

  protected clearSelection(mask: number) {
    const days = this.getMonthDays();
    for (let i = 0; i < days.length; i++) {
      const currentDay = days[i];
      currentDay.selectionState = currentDay.selectionState & mask;
    }
  }

  protected doMouseSelection(selectedDay: MonthDay, days: MonthDay[]) {
    const currentDayItem = getCurrentDateItem();
    const selectionRange = this.data.reservationStrategy.getSelectionRangeInfo(
      selectedDay,
      this._previousMonth,
      this._nextMonth,
      currentDayItem,
      days,
      this.data.store.reservationList
    );

    selectionRange.weekendRange.isAvailable &&
      selectRange(selectionRange.weekendRange);
    selectionRange.weekRange.isAvailable &&
      selectRange(selectionRange.weekRange);

    function selectRange(rangeState: IRangeState): void {
      for (
        let i = rangeState.startCurrentMonthIndex;
        i <= rangeState.endCurrentMonthIndex;
        i++
      ) {
        const currentDay = days[i];
        if (
          i === rangeState.startCurrentMonthIndex &&
          (currentDay.selectionState & SelectionState.offered) === 0 &&
          !rangeState.startInPreviousMonth
        ) {
          currentDay.selectionState =
            currentDay.selectionState | SelectionState.offeredFirst;
        }

        if (
          i === rangeState.endCurrentMonthIndex &&
          (currentDay.selectionState & SelectionState.offered) === 0 &&
          !rangeState.endInNextMonth
        ) {
          currentDay.selectionState =
            currentDay.selectionState | SelectionState.offeredLast;
        }

        currentDay.selectionState =
          currentDay.selectionState | SelectionState.offered;
      }
    }
  }

  protected doClickSelection(selectedDay: MonthDay, days: MonthDay[]) {
    const currentDayItem = getCurrentDateItem();
    const selectionRange = this.data.reservationStrategy.getSelectionRangeInfo(
      selectedDay,
      this._previousMonth,
      this._nextMonth,
      currentDayItem,
      days,
      this.data.store.reservationList
    );

    const minimalRange = selectionRange.weekendRange.isAvailable
      ? selectionRange.weekendRange
      : selectionRange.weekRange.isAvailable
      ? selectionRange.weekRange
      : undefined;

    if (minimalRange === undefined) return;

    const duration = minimalRange === selectionRange.weekendRange ? 3 : 8;

    this.data.store.currentReservation.value = {
      dateItem: minimalRange.startInPreviousMonth
        ? [
            this._previousMonth.year,
            this._previousMonth.month,
            this._previousMonth.daysCount -
              (7 -
                (minimalRange.endCurrentMonthIndex -
                  minimalRange.startCurrentMonthIndex))
          ]
        : days[minimalRange.startCurrentMonthIndex].date,
      duration
    };
  }
}

class CalendarHeader extends b.Component<ICalendarHeaderData> {
  render(): b.IBobrilNode {
    return (
      <div style={styles.headerWrapper}>
        <this.headerButton
          action={() => {
            this.data.goToPreviousMonth();
            return true;
          }}
          styleOveride={leftArrow}
        />
        <this.monthField month={this.data.currentMonth.month} />
        <this.headerButton
          action={() => {
            this.data.goToNextMonth();
            return true;
          }}
          styleOveride={rightArrow}
        />
        <div style={{ clear: "both" }}> </div>
      </div>
    );
  }

  protected monthField(data: { month: Month }): b.IBobrilNode {
    return <div style={styles.monthWrapper}>{translateMonth(data.month)}</div>;
  }

  protected headerButton(data: {
    action: () => boolean;
    styleOveride: b.IBobrilStyle;
    children?: b.IBobrilChildren;
  }): b.IBobrilNode {
    return (
      <div
        onClick={() => data.action()}
        style={[styles.headerButtonStyle, data.styleOveride]}
      >
        {data.children}
      </div>
    );
  }
}

class CalendarDayHeader extends b.Component<{ daysOfWeek: DayOfWeek[] }> {
  render() {
    const children = this.data.daysOfWeek.map(day => (
      <div style={styles.columnStyle}>{translateDay(day)}</div>
    ));
    children.push(<div style={{ clear: "both" }} />);

    return <div style={styles.dayLine}>{children}</div>;
  }
}

class CalendarDays extends b.Component<{
  monthDays: ReadonlyArray<MonthDay>;
  selectionHandler: (day: MonthDay, mode: SelectionMode) => void;
}> {
  render() {
    let rows: b.IBobrilNode[] = [];
    for (let i = 0; i < this.data.monthDays.length / 7; i++) {
      const startIndex = i * 7;
      const rowDays = this.data.monthDays.slice(startIndex, startIndex + 7);
      rows.push(
        <this.dayRow>
          {rowDays.map(mDay => (
            <CalendarDay
              day={mDay}
              selectionHandler={this.data.selectionHandler}
            />
          ))}
        </this.dayRow>
      );
    }
    return <>{rows}</>;
  }

  protected dayRow(data: { children: b.IBobrilNode[] }): b.IBobrilNode {
    return (
      <div style={styles.rowStyle}>
        {data.children}
        <div style={{ clear: "both" }} />
      </div>
    );
  }
}

class CalendarDay extends b.Component<ICalendarDayData> {
  render(): b.IBobrilNode {
    return <div style={this.getDayStyle()}>{this.data.day.text}</div>;
  }

  onMouseEnter(_event: b.IBobrilMouseEvent): void {
    this.data.selectionHandler(
      this.data.day,
      this.data.day.isSelectable
        ? SelectionMode.mouseIn
        : SelectionMode.mouseOut
    );
  }

  onMouseLeave() {
    this.data.selectionHandler(this.data.day, SelectionMode.mouseOut);
  }

  onClick() {
    this.data.selectionHandler(
      this.data.day,
      this.data.day.isSelectable ? SelectionMode.select : SelectionMode.unSelect
    );
    return true;
  }

  protected getDayStyle(): b.IBobrilStyle[] {
    var style = [styles.columnStyle];
    !this.data.day.isInCurrentMonth && style.push(styles.columnStyleOtherMonth);
    this.data.day.isReserved && style.push(styles.columnStyleReserved);
    this.data.day.isSelectable && style.push(styles.columnStyleSelectable);

    (this.data.day.selectionState & SelectionState.offered) > 0 &&
      style.push(styles.mouseSelection);
    (this.data.day.selectionState & SelectionState.offeredFirst) > 0 &&
      style.push(styles.mouseSelectionStart);
    (this.data.day.selectionState & SelectionState.offeredLast) > 0 &&
      style.push(styles.mouseSelectionEnd);

    (this.data.day.selectionState & SelectionState.selected) > 0 &&
      style.push(styles.currentSelection);

    return style;
  }
}

enum SelectionMode {
  mouseIn = 0,
  mouseOut = 1,
  select = 2,
  unSelect = 3
}

interface ICalendarHeaderData {
  goToNextMonth(): void;
  goToPreviousMonth(): void;
  currentMonth: IMonthInfo;
}

interface ICalendarDayData {
  day: MonthDay;
  selectionHandler: (day: MonthDay, mode: SelectionMode) => void;
}

export interface ICalendarReservationStrategy {
  getMonthDay(
    day: number,
    dayOfWeek: DayOfWeek,
    isInCurrentMonth: boolean,
    monthInfo: IMonthInfo,
    currentDateItem: dateItem,
    reservations: ReadonlyArray<IReservation>,
    currentReservation: IReservation | undefined
  ): MonthDay;

  getSelectionRangeInfo(
    selectedDay: MonthDay,
    previousMonth: IMonthInfo,
    nextMonth: IMonthInfo,
    currentDate: dateItem,
    days: ReadonlyArray<MonthDay>,
    reservations: ReadonlyArray<IReservation>
  ): IRangeInfo;
}
