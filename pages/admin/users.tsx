import * as b from "bobril";
import { appStore } from "../../data/appStore";
import * as tableStyles from "./tableStyles";
import {
  addButton,
  editButton,
  removeButton,
  colors,
} from "../../styleConstants";
import { observable, observableProp } from "bobx";
import { Button } from "../../components/button/button";
import { IUserDto, IAdminUserStore } from "../../data/admin/types";

interface IEditableUser extends IUserDto {
  show: boolean;
}

export class UsersPage extends b.Component {
  protected _store: IAdminUserStore | undefined;

  @observable
  protected _user: IEditableUser = {
    id: undefined,
    login: "",
    password: "",
    show: false,
  };

  init() {
    this._store = appStore().adminUserStore;
    this._store.loadUserList();
  }

  render() {
    if (this._store == undefined) return <></>;

    if (this._store.Users.length == 0) {
      return <h2>Loading ...</h2>;
    }

    if (this._user.show) {
      return (
        <div>
          <EditSection
            user={this._user}
            saveHandler={this.save}
            cancelHandler={this.cancel}
          />
          <Table
            users={this._store.Users}
            addUserHandler={this.add}
            editUserHandler={this.edit}
            deleteUserHandler={this.delete}
          />
        </div>
      );
    }

    return (
      <Table
        users={this._store.Users}
        addUserHandler={this.add}
        editUserHandler={this.edit}
        deleteUserHandler={this.delete}
      />
    );
  }

  @b.bind
  protected add() {
    if (this._user.show) return;

    this.clear();
    this._user.show = true;
  }

  @b.bind
  protected edit(user: IUserDto) {
    if (this._user.show) return;

    this._user.login = user.login;
    this._user.password = user.password;
    this._user.id = user.id;
    this._user.show = true;
  }

  @b.bind
  protected delete(user: IUserDto) {
    if (this._store == undefined || user.id === undefined) return;
    this._store.deleteUser(user.id);
  }

  @b.bind
  protected save() {
    if(this._store == undefined) return;

    if (this._user.id !== undefined) {
      this._store.editUser({
        id: this._user.id,
        login: this._user.login,
        password: this._user.password,
      });
    } else {
      this._store.addUser({
        login: this._user.login,
        password: this._user.password,
      });
    }

    this.clear();
    this._user.show = false;
  }

  @b.bind
  protected cancel() {
    this.clear();
    this._user.show = false;
  }

  protected clear() {
    this._user.id = undefined;
    this._user.login = "";
    this._user.password = "";
  }
}

interface ITableData {
  users: ReadonlyArray<IUserDto>;
  addUserHandler(): void;
  editUserHandler(user: IUserDto): void;
  deleteUserHandler(user: IUserDto): void;
}

interface ITableRowData {
  user: IUserDto;
  editUserHandler(user: IUserDto): void;
  deleteUserHandler(user: IUserDto): void;
}

interface ITableHeaderData {
  addUserHandler(): void;
}

class Table extends b.Component<ITableData> {
  render() {
    const lines: b.IBobrilNode[] = [
      <this.HeaderLine addUserHandler={this.data.addUserHandler} />,
    ];
    for (let user of this.data.users) {
      lines.push(
        <this.TableRow
          user={user}
          editUserHandler={this.data.editUserHandler}
          deleteUserHandler={this.data.deleteUserHandler}
        />
      );
    }
    return (
      <div style={[tableStyles.tableWrapper, { width: 450 }]}>{lines}</div>
    );
  }

  protected HeaderLine(data: ITableHeaderData): b.IBobrilNode {
    return (
      <div style={[tableStyles.tableLine, tableStyles.headerLine]}>
        <div style={[tableStyles.tableColumn, { width: "70%" }]}>Login</div>
        <div style={[tableStyles.lastTableColumn, { width: "28%" }]}>
          <div
            style={addButton}
            onClick={() => {
              data.addUserHandler();
              return true;
            }}
          />
          <div style={{ clear: "both" }} />
        </div>
        <div style={{ clear: "both" }} />
      </div>
    );
  }

  protected TableRow(data: ITableRowData): b.IBobrilNode {
    return (
      <div style={tableStyles.tableLine}>
        <div style={[tableStyles.tableColumn, { width: "70%" }]}>
          {data.user.login}
        </div>
        <div style={[tableStyles.lastTableColumn, { width: "28%" }]}>
          <div
            style={editButton}
            onClick={() => {
              data.editUserHandler(data.user);
              return true;
            }}
          />
          <div
            style={removeButton}
            onClick={() => {
              data.deleteUserHandler(data.user);
              return true;
            }}
          />
          <div style={{ clear: "both" }} />
        </div>
        <div style={{ clear: "both" }} />
      </div>
    );
  }
}

interface IEditSectionData {
  user: IUserDto;
  saveHandler(): void;
  cancelHandler(): void;
}

const editSectionStyle = {
  wrapper: b.styleDef({
    width: 400,
    margin: "10px auto 0 auto",
    border: `solid 1px ${colors.calendarSilver}`,
    borderRadius: 3,
    padding: 5,
  }),
  leftColumn: { cssFloat: "left", width: 100 },
  rightColumn: { cssFloat: "left" },
  columnLine: {
    height: 25,
    marginBottom: 1,
  },
};

class EditSection extends b.Component<IEditSectionData> {
  render() {
    return (
      <div style={editSectionStyle.wrapper}>
        <div style={editSectionStyle.leftColumn}>
          <div style={editSectionStyle.columnLine}>Login: </div>
          <div style={editSectionStyle.columnLine}>Password: </div>
        </div>
        <div style={editSectionStyle.rightColumn}>
          <div style={editSectionStyle.columnLine}>
            <input
              type="text"
              value={observableProp(this.data.user, "login")}
            />
          </div>
          <div style={editSectionStyle.columnLine}>
            <input
              type="password"
              value={observableProp(this.data.user, "password")}
            />
          </div>
          <Button
            text="Uložit"
            onClick={() => {
              this.data.saveHandler();
              return true;
            }}
            colorScheme={colors.buttonYellow}
          />
          <Button
            text="Zrušit"
            onClick={() => {
              this.data.cancelHandler();
              return true;
            }}
            explicitMargin="0 0 0 2px"
            colorScheme={colors.buttonYellow}
          />
        </div>
        <div style={{ clear: "both" }} />
      </div>
    );
  }
}

export const usersPage = b.component(UsersPage);
