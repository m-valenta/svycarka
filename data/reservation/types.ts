import { IAjaxRequest, IAjaxResponse } from "../ajaxUtils";
import { Month, dateItem } from "../../utils/dateUtils";
import { observable, IObservableMap } from "bobx";
import { base } from "../../components/recaptcha/style";

export enum ReservationFormState {
  hidden,
  visible,
  finalized
}

export interface IReservationListRequest extends IAjaxRequest {
  month: number;
  year: number;
}

export interface IServerReservation {
  dateFrom: string,
  duration: number
}

export interface IReservationListResponse extends IAjaxResponse {
  month: number;
  year: number;
  reservations: IServerReservation[];
}

export interface IReservationSaveRequest extends IAjaxRequest {
  dateFrom: Date;
  duration: number;
  name: string;
  address: string;
  email: string;
  phone: string;
  captchaResponse: string;
  beer?: number;
  meat?: number;
  usedCulture: number; 
}


export enum ReservationResponseState {
  Ok = 0,
  CaptchaError,
  StorageError
};

export interface IReservationSaveResponse extends IAjaxResponse {
  state: ReservationResponseState
}

export interface IReservationStore {
  reservations: IObservableMap<number, IObservableMap<number, IReservation[]>>;
  // form
  currentReservation: IFormItem<IReservation>;
  name: IFormItem<string>;
  address: IFormItem<string>;
  email: IFormItem<string>;
  phone: IFormItem<string>;
  agreement: IFormItem<boolean>;
  // form-optional
  beer: IFormItem<number>;
  meat: IFormItem<number>;

  reservationFormState: ReservationFormState;
  gc_Response: IFormItem<string>;

  isLoading: boolean;
  
  loadReservationList(month: Month, year: number): void;
  storeReservation(): void;

  clear(): void;
  validate(): boolean;
  test(): boolean;
}

export interface IReservation {
  dateItem: dateItem;
  duration: number;
}

export interface IFormItem<T> {
  value: T;
  readonly isValid: boolean;

  validate(): boolean;
  clear(): void;
  setInvalid(): void;
}

export class FormItem<T> implements IFormItem<T> {

  protected _validate: (value: T | undefined) => boolean;
  protected _clearHandler?: ()=> void;

  constructor(validate: (value: T | undefined) => boolean, clearHandler?: ()=> void) {
    this._validate = validate;
    this._clearHandler = clearHandler;
  }

  get isValid(): boolean {
    return this._isValid;
  }

  get value(): T {
    return this._value;
  }

  set value(value: T | undefined) {
    this._value = value;
    this.validate();
  }

  validate(): boolean {
    this._isValid = this._validate(this._value);
    return this._isValid;
  }

  clear() {
    this._isValid = true;
    this._value = undefined;
    this._clearHandler && this._clearHandler();
  }

  setInvalid() {
    this._isValid = false;
  }

  @observable
  protected _isValid: boolean = true;

  @observable
  protected _value?: T = undefined;
}

