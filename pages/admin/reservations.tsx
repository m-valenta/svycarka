import * as b from "bobril";
import {
  IAdminReservationStore,
  IAdminReservation,
  IReservationEditRequest,
} from "../../data/admin/types";
import { appStore } from "../../data/appStore";
import * as tableStyles from "./tableStyles";
import { getMoment } from "bobril-g11n";
import {
  reservationStateToString,
  ReservationState,
} from "../../utils/stateUtils";
import {
  editButton,
  removeButton,
  colors,
  bookmarkOn,
  bookmarkOff,
} from "../../styleConstants";
import { Button } from "../../components/button/button";
import { translateMonth, czechDateToJsDate } from "../../utils/dateUtils";
import { observableProp, observable } from "bobx";
import { getLocaleCode, formateToCzechDate } from "../../utils/localeUtils";
import { ScrollToWrapper } from "../../components/scrollToWrapper/component";
import { scrollToWrapper } from "../../components/scrollToWrapper/utils";
import { TipsSection } from "../../components/tipsSection/component";
import { date } from "../../components/dateInput/styles";

export class ReservationsPage extends b.Component {
  store: IAdminReservationStore;

  init() {
    this.store = appStore().adminReservationStore;
    this.store.reset();
  }
  render() {
    return (
      <div>
        <FilterWrapper>
          <div>
            Rok:
            <YearSelector key="adm_rez_ys" store={this.store} />
          </div>
          <div>
            Bookmark:
            <div>
              <BoolCheckBoxInput
                label="Pouze bookmarked"
                dataObj={this.store.Filter}
                observablePropKey="ShowBookMarkedOnly"
              />
            </div>
          </div>
          <div>
            Stav:
            <div>
              <StateSelection
                dataObj={this.store.Filter}
                stateProperty="State"
                includeAll={true}
              />
            </div>
          </div>
        </FilterWrapper>
        {/* Měsíc:
        <MonthSelector key="adm_rez_ms" store={this.store} /> */}
        <Table key="adm_rez_ts" store={this.store} />
      </div>
    );
  }
}

class Table extends b.Component<{
  store: IAdminReservationStore;
}> {
  render(): b.IBobrilNode {
    const selectedReservation = this.data.store.SelectedReservation;
    const lines = [];

    for (let res of this.data.store.Reservations) {
      if (!this.data.store.Filter.includeReservation(res)) continue;

      lines.push(
        <this.Row
          row={res}
          isSelected={res.id === selectedReservation?.ReservationData.id}
          store={this.data.store}
        />
      );
    }

    return (
      <div style={[tableStyles.tableWrapper, { width: "100%" }]}>
        <this.HeaderRow />
        {lines}
      </div>
    );
  }

  protected HeaderRow(): b.IBobrilNode {
    return (
      <div style={[tableStyles.tableLine, tableStyles.headerLine]}>
        <div style={[tableStyles.tableColumn, { width: "13%" }]}>Datum od</div>
        <div style={[tableStyles.tableColumn, { width: "5%" }]}>Délka</div>
        <div style={[tableStyles.tableColumn, { width: "25%" }]}>Email</div>
        <div style={[tableStyles.tableColumn, { width: "25%" }]}>Jméno</div>
        <div style={[tableStyles.lastTableColumn, { width: "15%" }]}>Stav</div>
        <div style={[tableStyles.lastTableColumn, { width: "15%" }]} />
        <div style={{ clear: "both" }} />
      </div>
    );
  }

  protected Row(data: {
    row: IAdminReservation;
    isSelected: boolean;
    store: IAdminReservationStore;
  }): b.IBobrilNode {
    const tableLineStyle: b.IBobrilStyles = [
      tableStyles.tableLine,
      { cursor: "pointer" },
    ];
    data.isSelected && tableLineStyle.push(tableStyles.boldText);

    var tableRow = (
      <div
        style={tableLineStyle}
        onClick={() => {
          this.data.store.selectReservation(data.row);
          return true;
        }}
      >
        <div style={[tableStyles.tableColumn, { width: "13%" }]}>
          {getMoment(data.row.dateFrom).format("DD.MM.YYYY")}
        </div>
        <div style={[tableStyles.tableColumn, { width: "5%" }]}>
          {data.row.duration}
        </div>
        <div style={[tableStyles.tableColumn, { width: "25%" }]}>
          {data.row.email}
        </div>
        <div style={[tableStyles.tableColumn, { width: "25%" }]}>
          {data.row.name}
        </div>
        <div
          style={[
            tableStyles.lastTableColumn,
            {
              width: "15%",
              color: `${
                data.row.state === ReservationState.WaitForApproval
                  ? "Red"
                  : "Black"
              }`,
            },
          ]}
        >
          {reservationStateToString(data.row.state)}
        </div>
        <div style={[tableStyles.lastTableColumn, { width: "15%" }]}>
          <div
            style={data.row.bookmarked ? bookmarkOn : bookmarkOff}
            onClick={() => {
              data.store.setReservationBookmark(
                data.row.id,
                !data.row.bookmarked
              );
              return true;
            }}
          />
          <div
            style={removeButton}
            onClick={() => {
              data.store.deleteReservation(data.row.id);
              return true;
            }}
          />
          <div style={{ clear: "both" }} />
        </div>
        <div style={{ clear: "both" }} />
      </div>
    );

    if (!data.isSelected) return tableRow;

    return (
      <>
        {[
          tableRow,
          <EditSection key={`adm_rez_es_${data.row.id}`} store={data.store} />,
        ]}
      </>
    );
  }
}

const selectorButtonConfigurations = {
  explicitMargin: "0 2px",
  explicitPadding: "15px 10px 0 10px",
};

class FilterWrapper extends b.Component<{
  children: b.IBobrilNode[];
}> {
  render() {
    const filters = [];

    for (let child of this.data.children) {
      filters.push(
        <div style={{ float: "left", marginRight: "10px" }}>{child}</div>
      );
    }

    return (
      <div>
        {filters}
        <div style={{ clear: "both" }} />
      </div>
    );
  }
}

class MonthSelector extends b.Component<{ store: IAdminReservationStore }> {
  render() {
    const selectedMonth = this.data.store.Filter.Month;
    const content = [
      <div style={{ cssFloat: "left" }}>
        <Button
          colorScheme={
            selectedMonth === undefined ? colors.buttonRed : colors.buttonYellow
          }
          text="Celý rok"
          onClick={() => {
            this.data.store.Filter.Month = undefined;
          }}
          explicitMargin={selectorButtonConfigurations.explicitMargin}
          explicitPadding={selectorButtonConfigurations.explicitPadding}
        />
      </div>,
    ];
    for (let i = 0; i < 12; i++) {
      content.push(
        <div style={{ cssFloat: "left" }}>
          <Button
            colorScheme={
              i === selectedMonth ? colors.buttonRed : colors.buttonYellow
            }
            text={translateMonth(i)}
            onClick={() => {
              this.data.store.Filter.Month = i;
            }}
            explicitMargin="0 2px"
            explicitPadding="15px 10px 0 10px"
          />
        </div>
      );
    }
    content.push(<div style={{ clear: "both" }} />);

    return <div>{content}</div>;
  }
}

class YearSelector extends b.Component<{ store: IAdminReservationStore }> {
  render() {
    const selectedYear = this.data.store.Filter.Year;
    const content = [];
    for (let i = selectedYear - 1; i <= selectedYear + 1; i++) {
      content.push(
        <div style={{ cssFloat: "left" }}>
          <Button
            colorScheme={
              i === selectedYear ? colors.buttonRed : colors.buttonYellow
            }
            text={i + ""}
            onClick={() => {
              this.data.store.Filter.Year = i;
            }}
            explicitMargin={selectorButtonConfigurations.explicitMargin}
            explicitPadding={selectorButtonConfigurations.explicitPadding}
          />
        </div>
      );
    }
    content.push(<div style={{ clear: "both" }} />);

    return <div>{content}</div>;
  }
}

class EditSection extends b.Component<{ store: IAdminReservationStore }> {
  render() {
    const rez = this.data.store.SelectedReservation;

    if (rez === undefined) {
      return <></>;
    }

    return (
      <div
        style={{
          marginBottom: 10,
          padding: "5px",
          border: `solid 1px ${colors.calendarSilver}`,
          borderRadius: 3,
        }}
      >
        <ScrollToWrapper id="admin_edit">
          <span style={{ fontWeight: "bold" }}>{`Editace rezervace (id: ${
            rez.ReservationData.id
          }, vložena: ${formateToCzechDate(
            rez.ReservationData.created
          )})`}</span>
        </ScrollToWrapper>
        <this.Section label="Termín (od-do)">
          <DateInput dateObj={rez.ReservationData} observableProp="dateFrom" />
          <DateToField
            from={rez.ReservationData.dateFrom}
            duration={rez.ReservationData.duration}
          />
        </this.Section>
        <this.Section label="Počet dní">
          <NumberInput
            dataObj={rez.ReservationData}
            observablePropKey="duration"
            min={1}
            max={30}
          />
        </this.Section>
        <this.Section label="Jméno">
          <input
            type="text"
            value={observableProp(rez.ReservationData, "name")}
          />
        </this.Section>
        <this.Section label="Adresa">
          <input
            type="text"
            value={observableProp(rez.ReservationData, "address")}
          />
        </this.Section>
        <this.Section label="Email">
          <input
            type="text"
            value={observableProp(rez.ReservationData, "email")}
          />
        </this.Section>
        <this.Section label="Telefon">
          <input
            type="text"
            value={observableProp(rez.ReservationData, "phone")}
          />
        </this.Section>
        <this.Section label="Lokalizace">
          <b>{getLocaleCode(rez.ReservationData.usedCulture)}</b>
        </this.Section>
        <hr />
        <this.Section label="Pivo">
          <input
            type="text"
            value={observableProp(rez.ReservationData, "beer")}
          />
        </this.Section>
        <this.Section label="Maso">
          <input
            type="text"
            value={observableProp(rez.ReservationData, "meat")}
          />
        </this.Section>
        <hr />
        <this.Section label="Cena">
          <input
            type="text"
            value={observableProp(rez.ReservationData, "price")}
          />
        </this.Section>
        <this.Section label="Příjezd">
          <input
            type="text"
            maxlength="10"
            value={observableProp(rez.ReservationData, "arrival")}
          />
        </this.Section>
        <hr />
        <this.Section label="Změna stavu">
          Stav
          <br />
          <StateSelection
            dataObj={rez.ReservationData}
            stateProperty="state"
            includeAll={false}
          />
          <br />
          Předmět (volitelné)
          <br />
          <input type="text" value={observableProp(rez, "Subject")} />
          <br />
          Zpráva (volitelné)
          <br />
          <textarea
            rows="5"
            style={{ width: "100%" }}
            onChange={(value) => {
              rez.Message = value;
            }}
          >
            {rez.Message}
          </textarea>
        </this.Section>
        <hr />
        <this.Section label="">
          <div>
            <div style={{ cssFloat: "left" }}>
              <Button
                colorScheme={colors.buttonYellow}
                text="Odeslat"
                onClick={this.data.store.saveReservation}
              />
            </div>
            <div style={{ cssFloat: "left", marginLeft: 2 }}>
              <Button
                colorScheme={colors.buttonYellow}
                text="Zrušit"
                onClick={this.data.store.selectReservation}
              />
            </div>
            <div style={{ clear: "both" }} />
          </div>
        </this.Section>
      </div>
    );
  }

  Section(data: { label: string; children: b.IBobrilChildren }): b.IBobrilNode {
    return (
      <div style={{ marginBottom: 3 }}>
        <div style={{ cssFloat: "left", width: "15%" }}>{data.label}</div>
        <div style={{ cssFloat: "left", width: "85%" }}>{data.children}</div>
        <div style={{ clear: "both" }}></div>
      </div>
    );
  }

  postInitDom() {
    scrollToWrapper("admin_edit");
  }
}

class DateInput<T> extends b.Component<{
  dateObj: T;
  observableProp: keyof T;
}> {
  private static readonly _simpleDatePattern: RegExp = /^([1-9]{1}|0[1-9]|[12][0-9]|3[01])\.([1-9]{1}|0[1-9]|1[012])\.(19|20)\d{2}$/;

  private _originalDateStr = formateToCzechDate(this.ObservableDate);

  @observable
  currentDateStr = this._originalDateStr;

  private get ObservableDate(): Date {
    return (this.data.dateObj[this.data.observableProp] as any) as Date;
  }

  private set ObservableDate(date: Date) {
    (this.data.dateObj[this.data.observableProp] as any) = date;
  }

  render() {
    return (
      <input type="text" value={observableProp(this, "currentDateStr")}></input>
    );
  }

  onFocusOut(): void {
    if (!DateInput._simpleDatePattern.test(this.currentDateStr)) {
      this.currentDateStr = this._originalDateStr;
      b.invalidate(this);
      return;
    }

    this.ObservableDate = czechDateToJsDate(this.currentDateStr);

    // Possibly changed when 31.2 etc. is set as date value
    this.currentDateStr = formateToCzechDate(this.ObservableDate);

    alert(this.ObservableDate.toDateString());
  }
}

class StateSelection<T> extends b.Component<{
  includeAll: boolean;
  dataObj: T;
  stateProperty: keyof T;
}> {
  render() {
    const options = [];
    const selectedValue = this.observableState;

    if (this.data.includeAll) {
      options.push(
        <option
          value={ReservationState.All}
          selected={ReservationState.All === selectedValue ? "selected" : ""}
        >
          {reservationStateToString(ReservationState.All)}
        </option>
      );
    }

    for (let stateKey in ReservationState) {
      const state = Number.parseInt(stateKey, 10);
      if (isNaN(state)) continue;

      if (state < 0) continue;

      options.push(
        <option
          value={state}
          selected={state === selectedValue ? "selected" : ""}
        >
          {reservationStateToString(state)}
        </option>
      );
    }

    return (
      <select
        onChange={(value) => {
          this.observableState = value;
        }}
      >
        {options}
      </select>
    );
  }

  private get observableState(): ReservationState {
    return (this.data.dataObj as any)[
      this.data.stateProperty
    ] as ReservationState;
  }

  private set observableState(state: ReservationState) {
    ((this.data.dataObj as any)[
      this.data.stateProperty
    ] as ReservationState) = state;
  }
}

class BoolCheckBoxInput<T> extends b.Component<{
  label: string;
  dataObj: T;
  observablePropKey: keyof T;
}> {
  render() {
    const value = this.ObservableBool ? "checked" : "";

    return (
      <div>
        {this.data.label}
        <input
          type="checkbox"
          checked={value}
          onChange={(value: boolean) => (this.ObservableBool = value)}
        />
      </div>
    );
  }

  private get ObservableBool(): boolean {
    return (this.data.dataObj[this.data.observablePropKey] as any) as boolean;
  }

  private set ObservableBool(value: boolean) {
    (this.data.dataObj[this.data.observablePropKey] as any) = value;
  }
}

class NumberInput<T> extends b.Component<{
  dataObj: T;
  observablePropKey: keyof T;
  min?: number;
  max?: number;
}> {
  @observable
  valueStr: string = this.observableNumber + "";

  private get observableNumber(): number {
    return (this.data.dataObj[this.data.observablePropKey] as any) as number;
  }

  private set observableNumber(value: number) {
    (this.data.dataObj[this.data.observablePropKey] as any) = value;
  }

  render() {
    return (
      <input
        type="number"
        max={this.data.max}
        min={this.data.min}
        value={this.valueStr}
        onChange={(value) => this.onChange(value)}
      ></input>
    );
  }

  onChange(value: string): void {
    this.valueStr = value;
    this.observableNumber = parseInt(this.valueStr);
  }
}

function DateToField(data: { from: Date; duration: number }): b.IBobrilNode {
  const copy = new Date(Number(data.from));
  copy.setDate(data.from.getDate() + data.duration);

  return (
    <input
      type="text"
      disabled
      style={{ marginLeft: 5, colors: colors.calendarSilver }}
      value={`${formateToCzechDate(copy)}`}
    />
  );
}

export const reservationsPage = b.component(ReservationsPage);
