import { IAjaxRequest, IAjaxResponse } from "../ajaxUtils";
import {
  IReservationListResponse,
  IServerReservation
} from "../reservation/types";
import { ReservationState } from "../../utils/stateUtils";

export interface IAdminStore {
  IsLogged: boolean;
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

export interface IAdminReservationStore {
  Year: number;
  Month: number | undefined;
  readonly Reservations: IAdminReservation[],
  readonly selectedReservation?: IReservationEditRequest;
  reset(): void;
  deleteReservation(idReservation: number);
  selectReservation(reservation?: IAdminReservation): void;
  saveReservation(): void;
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
}


export interface IReservationEditRequest {
  Subject: string | undefined;
  Message: string | undefined;
  ReservationData: IAdminReservationRequest;
}