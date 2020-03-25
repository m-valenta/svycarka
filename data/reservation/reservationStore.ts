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
  IReservationSaveResponse,
  ReservationResponseState,
  IFormItem
} from "./types";
import { observable, IObservableMap, computed } from "bobx";
import {
  Month,
  datItemParts,
  getDateItemFromDate
} from "../../utils/dateUtils";
import { utils } from "../../components/recaptcha/reCaptcha";
import { getBackendLocaleId } from "../../utils/localeUtils";
import { getLocale } from "bobril-g11n";
import { validateReservation, validateName, validateAddress, validateEmail, validatePhone, validateAgreement, validateGC } from "./validations";

class ReservationStore implements IReservationStore {
  @observable
  private _isLoading: boolean;

  private _loadConnector: IAjaxConnector | undefined;
  private _saveConnector: IAjaxConnector | undefined;

  _reservations: IObservableMap<
    number,
    IObservableMap<number, IReservation[]>
  > = observable.map<number, IObservableMap<number, IReservation[]>>();

  currentReservation: FormItem<IReservation> = new FormItem(validateReservation);

  name: IFormItem<string> = new FormItem(validateName);

  address: IFormItem<string> = new FormItem(validateAddress);

  email: IFormItem<string> = new FormItem(validateEmail);

  phone: IFormItem<string> = new FormItem(validatePhone);

  agreement: IFormItem<boolean> = new FormItem(validateAgreement);

  beer: IFormItem<number> = new FormItem(() => true);

  meat: IFormItem<number> = new FormItem(() => true);

  gc_Response: IFormItem<string> = new FormItem(
    validateGC,
    utils.reset
  );

  protected get allInputFields(): IFormItem<unknown>[] {
    return [ this.currentReservation, this.name, this.address, this.email, this.phone, this.agreement, this.beer, this.meat, this.gc_Response ];
  }  

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
      this.gc_Response.setInvalid();
    } else if (response.state === ReservationResponseState.StorageError) {
      this.currentReservation.setInvalid();
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
    this.allInputFields.forEach(input => input.clear());
  }

  validate(): boolean {
    let isValid = true;
    this.allInputFields.forEach(input => {
      let inputResult = input.validate();
      isValid = isValid && inputResult;
    });  
    return isValid;
  }

  @computed
  test(): boolean {
    let isValid = true;
    this.allInputFields.forEach(input => {
      isValid = isValid && input.isValid;
    });  
    return isValid;
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
