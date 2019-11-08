import { IAjaxRequest, IAjaxResponse } from "../ajaxUtils";
import { Month, dateItem } from "../../utils/dateUtils";
import { observable, IObservableMap } from "bobx";

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
  currentReservation: FormItem<IReservation>;
  name: FormItem<string>;
  address: FormItem<string>;
  email: FormItem<string>;
  phone: FormItem<string>;
  aggrement: FormItem<boolean>;
  // form-optional
  beer: FormItem<number>;
  meat: FormItem<number>;

  reservationFormState: ReservationFormState;
  gc_Response: FormItem<string>;

  isLoading: boolean;

  loadReservationList(month: Month, year: number): void;
  storeReservation(): void;

  clear(): void;
  validate(): boolean;
}

export interface IReservation {
  dateItem: dateItem;
  duration: number;
}

export class FormItem<T> {
  @observable
  isValid: boolean = true;

  @observable
  value?: T = undefined;
}

export class FormExternalItem<T> {
  _valueField: T | undefined;
  _valueGenerator: () => T;
  _clearHandler: () => void;

  constructor(valueGenerator: () => T, clearHandler: () => void) {
    this._valueGenerator = valueGenerator;  
    this._clearHandler = clearHandler;
  }

  @observable
  isValid: boolean = true;

  get value(): T {
    if(this._valueField === undefined) {
      this._valueField = this._valueGenerator();
    }

    return this._valueGenerator();
  }

  set value(value: T | undefined) {
    this._valueField = value;
  }

  clear() {
    this._valueField = undefined;
    this._clearHandler();
  }
}