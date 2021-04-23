import * as b from "bobril";
import { observable } from "bobx";
import { IAjaxConnector, AjaxConnector, IAjaxResponse } from "../ajaxUtils";
import { IAdminStore, IUserDto, ILoginRequest } from "./types";
import { TipsSection } from "../../components/tipsSection/component";
import { loginTransition, adminHomeTransition } from "../../transitions";

class AdminStore implements IAdminStore {
  private _authTestConnector: IAjaxConnector | undefined;
  private _signInConnector: IAjaxConnector | undefined;
  private _signOutConnector: IAjaxConnector | undefined;

  protected _isLogged?: boolean = undefined;
    
  constructor() {
  }

  @b.bind
  getAuthTestUrl(): string {
    return "api/users/testAuthentication";
  }
  @b.bind
  getSignInUrl(): string {
    return "api/users/login";
  }
  @b.bind
  getSignOutUrl(): string {
    return "api/users/logout";
  }

  attachAuthTestConnector(connector: IAjaxConnector): void {
    this._authTestConnector = connector;
  }
  attachSignInConnector(connector: IAjaxConnector): void {
    this._signInConnector = connector;
  }
  attachSignOutConnector(connector: IAjaxConnector): void {
    this._signOutConnector = connector;
  }

  get IsLogged(): boolean | undefined {
    return this._isLogged;
  }
  set IsLogged(value: boolean | undefined) {
    if(value === undefined){
        this._isLogged = undefined;
        return;
    }
    
    if (value === this._isLogged) 
        return;

    this._isLogged = value;
    b.runTransition(this._isLogged ? adminHomeTransition : loginTransition);
  }

  CheckAuthentication(): void {
    this._authTestConnector?.sendRequest(undefined);
  }

  SignIn(login: string, password: string): void {
    this._signInConnector?.sendRequest(<ILoginRequest>{
      Login: login,
      Password: password
    });
  }

  SignOut(): void {
      this._signOutConnector?.sendRequest(undefined);
  }
}

export function adminStoreFactory(): IAdminStore {
  const store = new AdminStore();

  store.attachAuthTestConnector(
    new AjaxConnector(
      "GET",
      store.getAuthTestUrl,
      response => (store.IsLogged = response !== undefined)
    )
  );

  store.attachSignInConnector(
    new AjaxConnector<IUserDto, IAjaxResponse>(
      "POST",
      store.getSignInUrl,
      response => (store.IsLogged = response !== undefined)
    )
  );

  store.attachSignOutConnector(
    new AjaxConnector(
      "POST",
      store.getSignOutUrl,
      () => (store.IsLogged = false)
    )
  );

  return store;
}
