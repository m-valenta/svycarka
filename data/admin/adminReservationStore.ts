import * as b from "bobril";
import { observable } from "bobx";
import { IAjaxConnector, AjaxConnector } from "../ajaxUtils";
import {
  IAdminReservationStore,
  IAdminReservationListRequest,
  IAdminReservationListResponse,
  IAdminReservation
} from "./types";

class AdminReservationStore implements IAdminReservationStore {
  protected _reservationListConnector: IAjaxConnector | undefined;

  @observable
  private _year: number = 0;
  @observable
  private _month: number = 0;
  @observable.ref
  private _reservations: IAdminReservation[] = [];

  set Year(year: number) {
    this._year = year;
    this._month = 1;
  }

  get Year(): number {
    return this._year;
    this.loadReservations();
  }

  set Month(month: number) {
    this._month = month;
    this.loadReservations();
  }

  get Month(): number {
    return this._month;
  }

  get Reservations(): IAdminReservation[] {
    return this._reservations;
  }

  reset(): void {
    const date = new Date();
    this._year = date.getFullYear();
    this._month = date.getMonth();
    this.loadReservations();
  }

  getReservationListUrl(listRequest: IAdminReservationListRequest): string {
    return `/api/reservations/getAdminReservations/${listRequest.year}/${
      listRequest.month
    }`;
  }

  attachListConnector(connector: IAjaxConnector): void {
    this._reservationListConnector = connector;
  }

  @b.bind
  completeReservationLoading(reservations: IAdminReservationListResponse) {
      this._reservations = reservations.reservations;
  }

  protected loadReservations(): void {
    this._reservationListConnector.sendRequest({
      year: this._year,
      month: this._month
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

  return store;
}
