import {
  IAjaxConnector,
  AjaxConnector,
  StaticConnector,
  IAjaxRequest,
  IAjaxResponse
} from "../ajaxUtils";
import {
  IReservation,
  IReservationListRequest,
  IReservationListResponse,
  IReservationStore,
  FormItem,
  ReservationFormState,
  IReservationSaveRequest,
  FormExternalItem,
  IReservationSaveResponse,
  ReservationResponseState
} from "./types";
import { observable, IObservableMap } from "bobx";
import {
  Month,
  datItemParts,
  getDateItemFromDate
} from "../../utils/dateUtils";
import { utils } from "../../components/recaptcha/reCaptcha";
import { getBackendLocaleId } from "../../utils/localeUtils";
import { getLocale } from "bobril-g11n";

const phoneNumberRegex = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/.compile();
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.compile();

class ReservationStore implements IReservationStore {
  @observable
  private _isLoading: boolean;

  private _loadConnector: IAjaxConnector | undefined;
  private _saveConnector: IAjaxConnector | undefined;

  _reservations: IObservableMap<
    number,
    IObservableMap<number, IReservation[]>
  > = observable.map<number, IObservableMap<number, IReservation[]>>();

  currentReservation: FormItem<IReservation> = new FormItem();

  name: FormItem<string> = new FormItem();

  address: FormItem<string> = new FormItem();

  email: FormItem<string> = new FormItem();

  phone: FormItem<string> = new FormItem();

  aggrement: FormItem<boolean> = new FormItem();

  beer: FormItem<number> = new FormItem();

  meat: FormItem<number> = new FormItem();

  gc_Response: FormExternalItem<string> = new FormExternalItem(
    () => (utils.isLoaded() ? utils.getResponse() : undefined),
    () => utils.isLoaded() && grecaptcha.reset()
  );

  @observable
  reservationFormState: ReservationFormState = ReservationFormState.hidden;

  get isLoading(): boolean {
    return this._isLoading;
  }

  get reservations() {
    return this._reservations;
  }

  getUrl(request: IReservationListRequest) {
    return `api/reservations/getReservations/${request.year}/${request.month}`;
  }

  saveUrl() {
    return "api/reservations/addReservation";
  }

  attachLoadConnector(connector: IAjaxConnector) {
    this._loadConnector = connector;
  }

  attachSaveConnector(connector: IAjaxConnector) {
    this._saveConnector = connector;
  }

  processReservationListResponse(
    response: IReservationListResponse | undefined
  ): void {
    if (response === undefined) {
      this._isLoading = false;
      return;
    }

    let yearReservations = this._reservations.get(response.year);
    if (yearReservations === undefined) {
      yearReservations = observable.map();
      this._reservations.set(response.year, yearReservations);
    }

    yearReservations.set(
      response.month,
      response.reservations.map(
        res =>
          <IReservation>{
            duration: res.duration,
            dateItem: getDateItemFromDate(new Date(res.dateFrom))
          }
      )
    );

    this._isLoading = false;
  }

  loadReservationList(month: Month, year: number): void {
    if (this._loadConnector === undefined) {
      throw "Data connector is not provided";
    }

    this._isLoading = true;
    this._loadConnector.sendRequest(<IReservationListRequest>{
      month,
      year
    });
  }

  processStoreReservationResponse(
    response: IReservationSaveResponse | undefined
  ) {
    if (response === undefined) {
      this.reservationFormState = ReservationFormState.hidden;
      this._isLoading = false;
      return;
    } else if (response.state === ReservationResponseState.Ok) {
      this.clear();
      this.reservationFormState = ReservationFormState.finalized;
      this._isLoading = false;
      return;
    } else if (response.state === ReservationResponseState.CaptchaError) {
      this.gc_Response.isValid = false;
    } else if (response.state === ReservationResponseState.StorageError) {
      this.currentReservation.isValid = false;
    }
    this._isLoading = false;
  }

  storeReservation(): void {
    if (this._saveConnector === undefined) {
      throw "Data connector is not provided";
    }

    this._isLoading = true;

    const currentReservation = this.currentReservation.value.dateItem;
    this._saveConnector.sendRequest(<IReservationSaveRequest>{
      captchaResponse: this.gc_Response.value,
      dateFrom: new Date(
        currentReservation[datItemParts.year],
        currentReservation[datItemParts.month],
        currentReservation[datItemParts.day] + 1,
        0,
        0,
        0,
        0
      ),
      duration: this.currentReservation.value.duration - 1,
      name: this.email.value,
      phone: this.phone.value,
      email: this.email.value,
      address: this.address.value,
      beer: this.beer.value,
      meat: this.meat.value,
      usedCulture: getBackendLocaleId(getLocale())
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
    this.meat.value = undefined;
    this.meat.isValid = true;
    this.gc_Response.value = undefined;
    this.gc_Response.isValid = true;
  }

  validate(): boolean {
    let result = [
      this.validateReservation(),
      this.validateName(),
      this.validateAddress(),
      this.validateEmail(),
      this.validatePhone(),
      this.validateAgreement(),
      this.validateGC()
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

  protected validateGC(): boolean {
    this.gc_Response.isValid =
      this.gc_Response.value !== undefined && this.gc_Response.value !== "";
    return this.gc_Response.isValid;
  }
}

export function reservationStoreFactory(): IReservationStore {
  const store = new ReservationStore();
  store.attachLoadConnector(
    new AjaxConnector(
      "GET",
      (request: IReservationListRequest) => store.getUrl(request),
      (response: IReservationListResponse) =>
        store.processReservationListResponse(response)
    )
  );
  store.attachSaveConnector(
    new AjaxConnector(
      "POST",
      (request: IReservationSaveRequest) => store.saveUrl(),
      (response: IReservationSaveResponse | undefined) =>
        store.processStoreReservationResponse(response)
    )
  );

  return store;
}
