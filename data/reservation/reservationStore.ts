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
  IReservationStore,
  FormItem,
  ReservationFormState
} from "./types";
import { observable } from "bobx";
import { Month } from "../../utils/dateUtils";
import { debug } from "../../constants";
import { reservationListDataMock } from "../../debugData";

const phoneNumberRegex = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/.compile();
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.compile();

class ReservationStore implements IReservationStore {
  private _connector: IAjaxConnector | undefined;

  @observable.ref
  private _reservations: IReservation[] | undefined;

  currentReservation: FormItem<IReservation> = new FormItem();

  name: FormItem<string> = new FormItem();

  address: FormItem<string> = new FormItem();

  email: FormItem<string> = new FormItem();

  phone: FormItem<string> = new FormItem();

  aggrement: FormItem<boolean> = new FormItem();

  beer: FormItem<number> = new FormItem();

  meet: FormItem<number> = new FormItem();

  @observable
  reservationFormState: ReservationFormState = ReservationFormState.hidden;

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

  clear(): void {
    this.currentReservation.value = undefined;
    this.name.value = undefined;
    this.name.isValid = true;
    this.address.value = undefined;
    this.address.isValid = true;
    this.email.value = undefined;
    this.email.isValid = true;
    this.phone.value = undefined;
    this.phone.isValid = true;
    this.aggrement.value = false;
    this.aggrement.isValid = true;
    this.beer.value = undefined;
    this.beer.isValid = true;
    this.meet.value = undefined;
    this.meet.isValid = true;
  }

  validate(): boolean {
    let result = [
      this.validateReservation(),
      this.validateName(),
      this.validateAddress(),
      this.validateEmail(),
      this.validatePhone(),
      this.validateAgreement()
    ];
    return result.reduce((prev, current) => prev && current);
  }

  protected validateReservation(): boolean {
    return (this.currentReservation.isValid =
      this.currentReservation.value !== undefined);
  }

  protected validateName(): boolean {
    return (this.name.isValid =
      this.name.value !== undefined && this.name.value.length > 0);
  }

  protected validateAddress(): boolean {
    return (this.address.isValid =
      this.address.value !== undefined && this.address.value.length > 0);
  }

  protected validateEmail(): boolean {
    return (this.email.isValid =
      this.email.value !== undefined &&
      this.email.value.length > 0 &&
      emailRegex.test(this.email.value));
  }

  protected validatePhone(): boolean {
    return (this.phone.isValid =
      this.phone.value !== undefined &&
      this.phone.value.length > 0 &&
      phoneNumberRegex.test(this.phone.value));
  }

  protected validateAgreement(): boolean {
    this.aggrement.isValid =
      this.aggrement.value !== undefined && this.aggrement.value;
    return this.aggrement.isValid;
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
