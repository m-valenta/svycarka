import { observable, computed, IObservableMap } from "bobx";
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
  datItemParts,
  getNextDayItem,
  getMonthInfoFromDateItem,
  compareDateItem
} from "../../utils/dateUtils";
import * as styles from "./styles";
import { IReservationStore, IReservation } from "../../data/reservation/types";
import { rightArrow, leftArrow, closeButton } from "../../styleConstants";
import {
  MonthDay,
  SelectionState,
  IRangeState
} from "./reservationStrategies/baseStrategy";
import { Loader } from "../loader/loader";

const clearSelectionMask = ~(
  SelectionState.selected |
  SelectionState.selectedFirst |
  SelectionState.selectedLast
);

const clearPreviewMask = ~(
  SelectionState.preview |
  SelectionState.previewFirst |
  SelectionState.previewLast
);

export interface ICalendarData {
  store: IReservationStore;
  reservationStrategy: ICalendarReservationStrategy;
  startDay?: DayOfWeek;
  referencedDate?: Date;
  onClose: () => void;
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
          onClose={() => this.data.onClose()}
        />
        <CalendarDayHeader daysOfWeek={this._days} />
        <Loader storeWithLoading={this.data.store}><CalendarDays
          monthDays={this.getMonthDays()}
          selectionHandler={(day, mode) => this.daySelectionChange(day, mode)}
          isSelection={this.data.store.currentReservation.value !== undefined}
        /></Loader>
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
        this.clearSelection(clearPreviewMask);
        break;
      case SelectionMode.unSelect:
        this.data.store.currentReservation.value = undefined;
        this.clearSelection(clearSelectionMask);
        break;
      case SelectionMode.mouseIn:
        this.doMouseSelection(day, this.getMonthDays());
        break;
      case SelectionMode.select:
        this.doClickSelection(day);
        break;
    }
  }

  @computed
  protected getMonthDays(): MonthDay[] {
    const currentDayItem = getCurrentDateItem();
    const reservations = this.data.store.reservations;
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

    if ((day + 1) % 7 === this._startDay) {
      return monthDays;
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
    if (this.data.store.currentReservation.value === undefined) {
      return;
    }

    const reservationPreview = this.data.reservationStrategy.getSelectedReservation(
      selectedDay,
      this._currentMonth,
      getCurrentDateItem(),
      this.data.store.currentReservation.value,
      this.data.store.reservations
    );

    if (reservationPreview === undefined) {
      this.clearSelection(clearPreviewMask);
      return;
    }

    let workingDay = reservationPreview.dateItem;
    let workingMonth = getMonthInfoFromDateItem(workingDay);
    for (let i = 0, mi = -1, psi = -1; i < reservationPreview.duration; i++) {
      if (
        compareDateItem(workingDay, days[0].date) >= 0 ||
        compareDateItem(workingDay, days[days.length - 1].date) <= 0
      ) {
        if ((mi = -1)) {
          for (mi = 0; mi < days.length; mi++) {
            if (compareDateItem(workingDay, days[mi].date) === 0) {
              psi = mi;
              break;
            }
          }
        }

        const mDay = days[mi];

        if (psi == mi && i == 0) {
          if (compareDateItem(mDay.date, selectedDay.date) === 0) {
            mDay.selectionState =
              mDay.selectionState |
              SelectionState.preview |
              SelectionState.previewFirst;
          } else {
            mDay.selectionState =
              mDay.selectionState |
              SelectionState.selected |
              SelectionState.selectedFirst;
          }
        } else if (i === reservationPreview.duration - 1) {
          if (compareDateItem(mDay.date, selectedDay.date) === 0) {
            mDay.selectionState =
              mDay.selectionState |
              SelectionState.preview |
              SelectionState.previewLast;
          } else {
            mDay.selectionState =
              mDay.selectionState |
              SelectionState.selected |
              SelectionState.selectedLast;
          }
        } else {
          mDay.selectionState = mDay.selectionState | SelectionState.preview;
        }

        mi++;
      }

      workingDay = getNextDayItem(workingDay, workingMonth);
      if (workingDay[datItemParts.month] !== workingMonth.month) {
        workingMonth = getNextMonthInfo(workingMonth);
      }
    }
  }

  protected doClickSelection(selectedDay: MonthDay) {
    if ((selectedDay.selectionState & SelectionState.selected) > 0) {
      this.clearSelection(clearSelectionMask);
      this.clearSelection(clearPreviewMask);
      this.data.store.currentReservation.value = undefined;
      return;
    }

    const computedReservation = this.data.reservationStrategy.getSelectedReservation(
      selectedDay,
      this._currentMonth,
      getCurrentDateItem(),
      this.data.store.currentReservation.value,
      this.data.store.reservations
    );

    if(computedReservation == undefined)
      return;

    if(computedReservation.duration == 1 || computedReservation.duration > 2){
      this.data.store.currentReservation.value = computedReservation;
      this.clearSelection(clearPreviewMask);
    }

    if(computedReservation.duration > 2)
      this.data.onClose();
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
        <this.headerButton
          action={() => {
            this.data.onClose();
            return true;
          }}
          styleOveride={styles.closePosition}
        >
          <div style={[closeButton, { height: "100%" }]} />
        </this.headerButton>
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
  isSelection: boolean;
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
              isSelection={this.data.isSelection}
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
    if ((this.data.day.selectionState & SelectionState.selected) !== 0) {
      return;
    }
    this.data.selectionHandler(
      this.data.day,
      this.data.day.isSelectable
        ? SelectionMode.mouseIn
        : SelectionMode.mouseOut
    );
  }

  onMouseLeave() {
    if ((this.data.day.selectionState & SelectionState.selected) !== 0) {
      return;
    }
    this.data.selectionHandler(this.data.day, SelectionMode.mouseOut);
  }

  onClick() {
    this.data.selectionHandler(
      this.data.day,
      this.data.day.isSelectable &&
        this.data.day.selectionState !== SelectionState.selected
        ? SelectionMode.select
        : SelectionMode.unSelect
    );
    return true;
  }

  protected getDayStyle(): b.IBobrilStyle[] {
    var style = [styles.columnStyle];
    !this.data.day.isInCurrentMonth && style.push(styles.columnStyleOtherMonth);
    this.data.day.isReserved && style.push(styles.columnStyleReserved);
    this.data.day.isSelectable && style.push(styles.columnStyleSelectable);
    this.data.day.isSelectable && !this.data.isSelection && style.push(styles.columnStyleSelectableWithHover);

    (this.data.day.selectionState & SelectionState.preview) > 0 &&
      style.push(styles.mouseSelection);
    (this.data.day.selectionState & SelectionState.previewFirst) > 0 &&
      style.push(styles.mouseSelectionEdge);
    (this.data.day.selectionState & SelectionState.previewLast) > 0 &&
      style.push(styles.mouseSelectionEdge);

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
  onClose(): void;
  currentMonth: IMonthInfo;
}

interface ICalendarDayData {
  day: MonthDay;
  selectionHandler: (day: MonthDay, mode: SelectionMode) => void;
  isSelection: boolean;
}

export interface ICalendarReservationStrategy {
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
  ): MonthDay;

  getSelectedReservation(
    selectedDay: MonthDay,
    currentMonth: IMonthInfo,
    currentDate: [number, number, number],
    currentReservation: IReservation | undefined,
    reservations: IObservableMap<
      number,
      IObservableMap<number, ReadonlyArray<IReservation>>
    >
  ): IReservation | undefined;
}
