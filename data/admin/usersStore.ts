import * as b from "bobril"; 
import { observable } from "bobx";
import { IUserDto, IAdminUserStore, IUserListResponse } from "./types";
import { IAjaxConnector, AjaxConnector } from "../ajaxUtils";

class UsersStore implements IAdminUserStore {
    private _usersListConnector: IAjaxConnector | undefined;
    private _usersAddConnector: IAjaxConnector | undefined;
    private _usersEditConnector: IAjaxConnector | undefined;
    private _usersDeleteConnector: IAjaxConnector | undefined;

    @observable.ref
    protected _users: IUserDto[] = [];

    @b.bind
    getUsersListUrl(): string {
      return "api/users/list";
    }
    @b.bind
    getUsersAddUrl(): string {
      return "api/users/add";
    }
    @b.bind
    getUsersEditUrl(): string {
      return "api/users/edit";
    }
    @b.bind
    getUsersDeleteUrl(): string {
      return "api/users/delete";
    }

    attachUsersListConnector(connector: IAjaxConnector): void {
        this._usersListConnector = connector;
    }
    attachUsersAddConnector(connector: IAjaxConnector): void {
        this._usersAddConnector = connector;
    }
    attachUsersEditConnector(connector: IAjaxConnector): void {
        this._usersEditConnector = connector;
    }
    attachUsersDeleteConnector(connector: IAjaxConnector): void {
        this._usersDeleteConnector = connector;
    }

    loadUserList() {
        this._usersListConnector?.sendRequest(undefined);
    }

    addUser(userDto: IUserDto) {
        this._usersAddConnector?.sendRequest(userDto);
    }

    editUser(userDto: IUserDto) {
        this._usersEditConnector?.sendRequest(userDto);
    }

    deleteUser(userId: number) {
        this._usersDeleteConnector?.sendRequest(userId);
    }

    completeUserListLoading(users: IUserDto[]) {
        this._users = users;
    }

    get Users(): ReadonlyArray<IUserDto> {
        return this._users;
    }
}

export function adminUserStoreFactory(): IAdminUserStore {
    const store = new UsersStore();
    
    store.attachUsersListConnector(new AjaxConnector("GET", store.getUsersListUrl, (response: IUserListResponse | undefined) => {
        store.completeUserListLoading(response?.users ?? []);
    }));

    store.attachUsersAddConnector(new AjaxConnector("POST", store.getUsersAddUrl, (response: IUserListResponse | undefined) => {
        store.loadUserList();
    }));

    store.attachUsersEditConnector(new AjaxConnector("POST", store.getUsersEditUrl, (response: IUserListResponse | undefined) => {
        store.loadUserList();
    }));

    store.attachUsersDeleteConnector(new AjaxConnector("POST", store.getUsersDeleteUrl, () => {
        store.loadUserList();
    }));

    return store;
}