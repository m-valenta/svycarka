import * as b from "bobril";
import { computed, observable } from "bobx";
import { IAjaxConnector, AjaxConnector } from "../ajaxUtils";
import {
  IAdminReservationStore,
  IAdminReservationListRequest,
  IAdminReservationListResponse,
  IAdminReservation,
  IReservationEditRequest,
  IReservationBookmarkRequest,
  IFilter,
  IAdminReservationRequest,
} from "./types";
import { strDateToJsDate } from "../../utils/dateUtils";
import { ReservationState } from "../../utils/stateUtils";
import { bind } from "bobril";

class OrderInfo {
  private _columnKey: keyof IAdminReservation;
  private _desc: boolean;

  constructor(columnKey: keyof IAdminReservation, desc: boolean) {
    this._columnKey = columnKey;
    this._desc = desc;
  }

  hasOrder(columnKey: keyof IAdminReservation): boolean {
    return this._columnKey == columnKey;
  }

  get Desc(): boolean {
    return this._desc;
  }
}

class Filter implements IFilter {
  _sourceFilterChangedChanged: () => void;
  _dataFilterChanged: () => void;

  constructor(
    sourceFilterChangedChanged: () => void,
    dataFilterChanged: () => void
  ) {
    this._sourceFilterChangedChanged = sourceFilterChangedChanged;
    this._dataFilterChanged = dataFilterChanged;
  }

  @observable
  private _year: number = 0;
  @observable
  private _month: number | undefined;
  @observable
  private _showBookMarkedOnly: boolean = false;
  @observable
  private _state: ReservationState = ReservationState.All;

  get Month(): number | undefined {
    return this._month;
  }

  get Year(): number {
    return this._year;
  }

  get ShowBookMarkedOnly(): boolean {
    return this._showBookMarkedOnly;
  }

  get State(): ReservationState {
    return this._state;
  }

  set Month(month: number | undefined) {
    this._month = month;
    this._sourceFilterChangedChanged();
  }

  set Year(year: number) {
    this._year = year;
    this._month = undefined;
    this._sourceFilterChangedChanged();
  }

  set ShowBookMarkedOnly(show: boolean) {
    this._showBookMarkedOnly = show;
    this._dataFilterChanged();
  }

  set State(state: ReservationState) {
    this._state = state;
    this._dataFilterChanged();
  }

  includeReservation(
    reservation: IAdminReservation | IAdminReservationRequest
  ): boolean {
    const bookmarked = (reservation as IAdminReservation)?.bookmarked ?? true;

    return (
      (!this._showBookMarkedOnly || bookmarked) &&
      (this._state == ReservationState.All || reservation.state == this._state)
    );
  }

  reset(): void {
    const date = new Date();
    this._year = date.getFullYear();
    this._month = undefined; // date.getMonth();
    this._showBookMarkedOnly = false;
    this._state = ReservationState.All;
  }
}

class AdminReservationStore implements IAdminReservationStore {
  protected _reservationListConnector: IAjaxConnector | undefined;
  protected _editReservationConnector: IAjaxConnector | undefined;
  protected _deleteReservationConnector: IAjaxConnector | undefined;
  protected _bookMarkConnector: IAjaxConnector | undefined;

  @observable
  private _selectedReservation?: IReservationEditRequest = undefined;

  @observable.ref
  private _reservations: IAdminReservation[] = [];

  @observable.ref
  private _orderInfo: OrderInfo = new OrderInfo("created", false);

  private _filter: IFilter = new Filter(
    this.sourceFilterChangedChangedHandler,
    this.dataFilterChangedHandler
  );

  get Reservations(): IAdminReservation[] {
    return this._reservations;
  }

  get SelectedReservation(): IReservationEditRequest | undefined {
    return this._selectedReservation;
  }

  get Filter(): IFilter {
    return this._filter;
  }

  reset(): void {
    this._filter.reset();
    this._orderInfo = new OrderInfo("created", false);
    this.loadReservations();
  }

  getReservationListUrl(listRequest: IAdminReservationListRequest): string {
    return `api/reservations/getAdminReservations/${listRequest.year}/${
      listRequest.month ?? ""
    }`;
  }

  attachListConnector(connector: IAjaxConnector): void {
    this._reservationListConnector = connector;
  }

  @b.bind
  completeReservationLoading(
    reservations: IAdminReservationListResponse | undefined
  ) {
    this._reservations = reservations?.reservations ?? [];
  }

  loadReservations(): void {
    this._reservationListConnector?.sendRequest({
      year: this._filter.Year,
      month: this._filter.Month,
    });
  }

  getDeleteReservationUrl(): string {
    return "api/reservations/DeleteReservation/";
  }

  attachDeleteReservationConnector(connector: IAjaxConnector) {
    this._deleteReservationConnector = connector;
  }

  @b.bind
  deleteReservation(idReservation: number) {
    if(!confirm(`Opravdu chcete smazat rezervaci (id: ${idReservation})?`))
      return;
    this._deleteReservationConnector?.sendRequest(idReservation);
  }

  @b.bind
  selectReservation(reservation?: IAdminReservation): void {
    if (reservation === undefined) {
      this._selectedReservation = undefined;
      return;
    }

    this._selectedReservation = {
      Message: undefined,
      Subject: "",
      ReservationData: {
        address: reservation.address,
        beer: reservation.beer,
        dateFrom: strDateToJsDate(reservation.dateFrom),
        created: strDateToJsDate(reservation.created),
        duration: reservation.duration,
        arrival: reservation.arrival,
        email: reservation.email,
        id: reservation.id,
        meat: reservation.meat,
        name: reservation.name,
        phone: reservation.phone,
        price: reservation.price,
        state: reservation.state,
        usedCulture: reservation.usedCulture,
        kids: reservation.kids,
        adults: reservation.adults
      },
    };
  }

  attachEditConnector(connector: IAjaxConnector) {
    this._editReservationConnector = connector;
  }

  getEditReservationUrl(editDto: IReservationEditRequest): string {
    return "api/reservations/EditReservation/";
  }

  @b.bind
  saveReservation() {
    if (this._selectedReservation === undefined) return;

    let selectedDate = this._selectedReservation.ReservationData.dateFrom;
    let selectedData = Object.assign({}, this._selectedReservation.ReservationData);
    selectedData.dateFrom = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        12,
        0,
        0,
        0
      );

    this._editReservationConnector?.sendRequest(<IReservationEditRequest>{
      Message: this._selectedReservation.Message,
      Subject: this._selectedReservation.Subject,
      ReservationData: selectedData    
    });
  }

  attachBookmarkConnector(connector: IAjaxConnector) {
    this._bookMarkConnector = connector;
  }

  getBookMarkUrl(bookmarkDto: IReservationBookmarkRequest): string {
    return "api/reservations/SetBookmarked";
  }

  @b.bind
  setReservationBookmark(reservationId: number, isSet: boolean) {
    this._bookMarkConnector?.sendRequest(<IReservationBookmarkRequest>{
      ReservationId: reservationId,
      IsBookmarked: isSet,
    });
  }

  orderReservationsByDate(
    columnKey:
      | (keyof IAdminReservation & "created")
      | (keyof IAdminReservation & "dateFrom")
  ): void {
    this.orderReservations(columnKey, (a, b) => {
      let aDate = Date.parse(a[columnKey] as string);
      let bDate = Date.parse(b[columnKey] as string);
      return aDate - bDate;
    });
  }

  orderReservationByState(
    columnKey: keyof IAdminReservation & "state"
  ): void {
    this.orderReservations(columnKey, (a, b) => {
      let aE = (a[columnKey] as ReservationState);
      let bE = (b[columnKey] as ReservationState);
      return aE - bE;
    });
  }

  isOrderingColumn(column: keyof IAdminReservation): boolean {
    return this._orderInfo.hasOrder(column);
  }

  isDesc(): boolean {
    return this._orderInfo.Desc;
  }

  @computed
  computeDeposit(): number | undefined {
    if(this.SelectedReservation === undefined) return undefined;

    let price = this.SelectedReservation.ReservationData.price;
    if(price === undefined) return undefined;

    if(price < 1000)
      return price;

    let halfPrice = Math.floor(price/2);
    if(halfPrice % 500 === 0)
      return halfPrice;

    return halfPrice = halfPrice + (500 - halfPrice % 500);
  }

  private orderReservations(
    columnKey: keyof IAdminReservation,
    orderFunc: (a: IAdminReservation, b: IAdminReservation) => number
  ): void {
    var newDesc = !this._orderInfo.Desc;
    if (this._reservations.length == 0) {
      this._orderInfo = new OrderInfo(columnKey, newDesc);
      return;
    }

    let newReservations = Array.from(this._reservations);

    if (!newDesc) newReservations.sort(orderFunc);
    else newReservations.sort((a, b) => orderFunc(a, b) * -1);

    // reset ref.
    this._orderInfo = new OrderInfo(columnKey, newDesc);
    this._reservations = newReservations;
  }

  @b.bind
  private sourceFilterChangedChangedHandler() {
    this._selectedReservation = undefined;
    this.loadReservations();
  }

  @bind
  private dataFilterChangedHandler() {
    if (
      this._selectedReservation &&
      this._filter.includeReservation(this._selectedReservation.ReservationData)
    )
      return;

    this._selectedReservation = undefined;
  }
}

export function adminReservationStoreFactory(): IAdminReservationStore {
  var store = new AdminReservationStore();

  store.attachListConnector(
    new AjaxConnector<
      IAdminReservationListRequest,
      IAdminReservationListResponse
    >("GET", store.getReservationListUrl, store.completeReservationLoading)
  );

  store.attachEditConnector(
    new AjaxConnector(
      "POST",
      store.getEditReservationUrl,
      (response: any) => {
        if (response === undefined) {
          return;
        }

        store.selectReservation();
        store.loadReservations();
      },
      true
    )
  );

  store.attachDeleteReservationConnector(
    new AjaxConnector(
      "POST",
      store.getDeleteReservationUrl,
      () => {
        store.loadReservations();
      },
      true
    )
  );

  store.attachBookmarkConnector(
    new AjaxConnector("POST", store.getBookMarkUrl, () => {
      store.loadReservations();
    })
  );

  return store;
}
