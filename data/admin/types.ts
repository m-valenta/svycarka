import { IAjaxRequest, IAjaxResponse } from "../ajaxUtils";
import {
  IReservationListResponse,
  IServerReservation
} from "../reservation/types";
import { ReservationState } from "../../utils/stateUtils";

export interface IAdminStore {
  IsLogged: boolean | undefined;
  CheckAuthentication(): void;
  SignIn(login: string, password: string): void;
  SignOut(): void;
}

export interface IAdminUserStore {
  loadUserList(): void;
  Users: ReadonlyArray<IUserDto>;
  addUser(userDto: IUserDto): void;
  editUser(userDto: IUserDto): void;
  deleteUser(userId: number): void;
}

export interface IUserListResponse extends IAjaxResponse {
  users: IUserDto[];
}

export interface IUserDto {
  id?: number;
  login: string;
  password?: string;
}

export interface ILoginRequest extends IAjaxRequest {
  Login: string;
  Password: string;
}

export interface IFilter {
  Year: number;
  Month: number | undefined;
  ShowBookMarkedOnly: boolean;
  State: ReservationState;
  includeReservation(reservation: IAdminReservation | IAdminReservationRequest): boolean;
  reset(): void;
}

export interface IAdminReservationStore {
  readonly Filter: IFilter;
  readonly Reservations: IAdminReservation[],
  readonly SelectedReservation?: IReservationEditRequest;
  reset(): void;
  deleteReservation(idReservation: number): void;
  selectReservation(reservation?: IAdminReservation): void;
  setReservationBookmark(idReservation: number, isSet: boolean): void;
  saveReservation(): void;
  orderReservationsByDate(
    columnKey:
      | (keyof IAdminReservation & "created")
      | (keyof IAdminReservation & "dateFrom")
  ): void;
  orderReservationByState(
    columnKey: keyof IAdminReservation & "state"
  ): void;
  isOrderingColumn(column: keyof IAdminReservation): boolean;
  isDesc(): boolean;
}

export interface IAdminReservationListRequest extends IAjaxRequest {
  month: number | undefined;
  year: number;
}

export interface IAdminReservationListResponse extends IAjaxResponse {
  reservations: IAdminReservation[];
}

export interface IAdminReservation extends IServerReservation {
  name: string;
  address: string;
  email: string;
  phone: string;
  usedCulture: number;
  beer?: number;
  meat?: number;
  id: number;
  price: number;
  state: ReservationState;
  arrival: string;
  bookmarked: boolean
  created:string;
}

export interface IAdminReservationRequest {
  name: string;
  address: string;
  email: string;
  phone: string;
  usedCulture: number;
  beer?: number;
  meat?: number;
  id: number;
  price: number;
  state: ReservationState;
  arrival: string;
  dateFrom: Date,
  duration: number,
  created: Date; 
}


export interface IReservationEditRequest {
  Subject: string | undefined;
  Message: string | undefined;
  ReservationData: IAdminReservationRequest;
}

export interface IReservationBookmarkRequest {
  ReservationId: Number;
  IsBookmarked: boolean;
}