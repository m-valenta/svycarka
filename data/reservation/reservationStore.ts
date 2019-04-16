import {
  IAjaxConnector,
  AjaxConnector,
  StaticConnector,
  IAjaxRequest
} from "../ajaxUtils";
import {
  IReservation,
  IReservationListRequest,
  IReservationListResponse,
  IReservationStore
} from "./types";
import { observable } from "bobx";
import { Month } from "../../utils/dateUtils";
import { debug } from "../../constants";
import { reservationListDataMock } from "../../debugData";

class ReservationStore implements ReservationStore {
  private _connector: IAjaxConnector | undefined;

  @observable.ref
  private _reservations: IReservation[] | undefined;

  get reservationList(): IReservation[] | undefined {
    return this._reservations;
  }

  getUrl(request: IReservationListRequest) {
    return `/reservationList?year=${request.year}&month=${request.month}`;
  }

  attachConnector(connector: IAjaxConnector) {
    this._connector = connector;
  }

  processReservationListResponse(
    response: IReservationListResponse | undefined
  ): void {
    if (response === undefined) {
      return;
    }

    this._reservations = response.reservations;
  }

  loadReservationList(month: Month, year: number): void {
    if (this._connector === undefined) {
      throw "Data connector is not provided";
    }
    this._connector.sendRequest(<IReservationListRequest>{
      month,
      year
    });
  }
}

export function reservationStoreFactory(): IReservationStore {
  const store = new ReservationStore();

  let connector: IAjaxConnector;
  if (debug) {
    connector = new StaticConnector(reservationListDataMock, response =>
      store.processReservationListResponse(response)
    );
  } else {
    connector = new AjaxConnector(
      "GET",
      (request: IReservationListRequest) => store.getUrl(request),
      (response: IReservationListResponse) =>
        store.processReservationListResponse(response)
    );
  }
  store.attachConnector(connector);

  return store;
}
