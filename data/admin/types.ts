import { IAjaxRequest, IAjaxResponse } from "../ajaxUtils";
import {
  IReservationListResponse,
  IServerReservation
} from "../reservation/types";

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
  Month: number;
  Reservations: IAdminReservation[],
  reset(): void;
}

export interface IAdminReservationListRequest extends IAjaxRequest {
  month: number;
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
  state: number;
}
