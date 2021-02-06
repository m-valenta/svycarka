import * as b from "bobril";
import { observable } from "bobx";
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

class Filter implements IFilter {
  _sourceFilterChangedChanged: () => void;
  _dataFilterChanged: () => void;

  constructor(sourceFilterChangedChanged: () => void,  dataFilterChanged: () => void) {
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

  get Month(): number {
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

  set Month(month: number) {
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

  includeReservation(reservation: IAdminReservation | IAdminReservationRequest): boolean {
    const bookmarked =  reservation["bookmarked"] ?? true;
    
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

  private _filter: IFilter = new Filter(this.sourceFilterChangedChangedHandler, this.dataFilterChangedHandler);

  get Reservations(): IAdminReservation[] {
    return this._reservations;
  }

  get SelectedReservation(): IReservationEditRequest {
    return this._selectedReservation;
  }

  get Filter(): IFilter {
    return this._filter;
  }

  reset(): void {
    this._filter.reset();
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
  completeReservationLoading(reservations: IAdminReservationListResponse) {
    this._reservations = reservations.reservations;
  }

  loadReservations(): void {
    this._reservationListConnector.sendRequest({
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
    this._deleteReservationConnector.sendRequest(idReservation);
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
    this._editReservationConnector.sendRequest(this._selectedReservation);
  }

  attachBookmarkConnector(connector: IAjaxConnector) {
    this._bookMarkConnector = connector;
  }

  getBookMarkUrl(bookmarkDto: IReservationBookmarkRequest): string {
    return "api/reservations/SetBookmarked";
  }

  @b.bind
  setReservationBookmark(reservationId: number, isSet: boolean) {
    this._bookMarkConnector.sendRequest(<IReservationBookmarkRequest>{
      ReservationId: reservationId,
      IsBookmarked: isSet,
    });
  }

  @b.bind
  private sourceFilterChangedChangedHandler() {
    this._selectedReservation = undefined;
    this.loadReservations();
  }

  @bind
  private dataFilterChangedHandler() {
    if (
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
