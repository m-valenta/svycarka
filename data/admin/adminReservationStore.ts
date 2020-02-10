import * as b from "bobril";
import { observable } from "bobx";
import { IAjaxConnector, AjaxConnector } from "../ajaxUtils";
import {
  IAdminReservationStore,
  IAdminReservationListRequest,
  IAdminReservationListResponse,
  IAdminReservation,
  IReservationEditRequest,
  IReservationBookmarkRequest
} from "./types";
import { strDateToJsDate } from "../../utils/dateUtils";

class AdminReservationStore implements IAdminReservationStore {
  protected _reservationListConnector: IAjaxConnector | undefined;
  protected _editReservationConnector: IAjaxConnector | undefined;
  protected _deleteReservationConnector: IAjaxConnector | undefined;
  protected _bookMarkConnector: IAjaxConnector | undefined;

  @observable
  private _year: number = 0;
  @observable
  private _month: number | undefined;
  @observable
  private _selectedReservation?: IReservationEditRequest = undefined;
  @observable.ref
  private _reservations: IAdminReservation[] = [];

  set Year(year: number) {
    this._year = year;
    this._month = undefined;
    this._selectedReservation = undefined;
    this.loadReservations();
  }

  get Year(): number {
    return this._year;
  }

  set Month(month: number) {
    this._month = month;
    this._selectedReservation = undefined;
    this.loadReservations();
  }

  get Month(): number {
    return this._month;
  }

  get Reservations(): IAdminReservation[] {
    return this._reservations;
  }

  get selectedReservation(): IReservationEditRequest {
    return this._selectedReservation;
  }

  reset(): void {
    const date = new Date();
    this._year = date.getFullYear();
    this._month = undefined; // date.getMonth();
    this.loadReservations();
  }

  getReservationListUrl(listRequest: IAdminReservationListRequest): string {
    return `api/reservations/getAdminReservations/${
      listRequest.year
    }/${listRequest.month ?? ""}`;
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
      year: this._year,
      month: this._month
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
        duration: reservation.duration,
        arrival: reservation.arrival,
        email: reservation.email,
        id: reservation.id,
        meat: reservation.meat,
        name: reservation.name,
        phone: reservation.phone,
        price: reservation.price,
        state: reservation.state,
        usedCulture: reservation.usedCulture
      }
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
      IsBookmarked: isSet
    });
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
