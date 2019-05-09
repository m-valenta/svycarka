import { IAjaxRequest, IAjaxResponse } from "../ajaxUtils";
import { Month, dateItem } from "../../utils/dateUtils";
import { observable } from "bobx";

export enum ReservationFormState {
  hidden,
  visible,
  finalized
}

export interface IReservationListRequest extends IAjaxRequest {
  month: number;
  year: number;
}

export interface IReservationListResponse extends IAjaxResponse {
  reservations: IReservation[];
}

export interface IReservationStore {
  reservationList: IReservation[] | undefined;

  currentReservation: FormItem<IReservation>;
  name: FormItem<string>;
  address: FormItem<string>;
  email: FormItem<string>;
  phone: FormItem<string>;
  aggrement: FormItem<boolean>;
  // optional
  beer: FormItem<number>;
  meet: FormItem<number>;

  reservationFormState: ReservationFormState;

  loadReservationList(month: Month, year: number): void;
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
