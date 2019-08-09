import { IAjaxRequest } from "../ajaxUtils";

export interface IAdminStore {
    IsLogged: boolean;
    CheckAuthentication(): void;
    SignIn(login: string, password: string): void;
    SignOut(): void;
}

export interface IUserDto extends IAjaxRequest
{
    Login: string;
    Password: string;
}