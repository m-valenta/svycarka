import * as b from "bobril";
import { appStore } from "../../data/appStore";
import { Button } from "../../components/button/buton";
import { colors } from "../../styleConstants";
import { IDataWithActiveRouteHandler } from "../masterPage";
import {
  adminUsersTransition,
  adminRegistrationsTransition as adminReservationsTransition
} from "../../transitions";

const styles = {
  headerWrapper: b.styleDef({
    backgroundColor: "black",
    color: "white"
  }),
  leftColumn: b.styleDef({
    cssFloat: "left",
    backgroundColor: "black",
    padding: "10px 5px 10px 5px",
    width: 250,
    height: "100vh",
    borderTop: `solid 1px ${colors.calendarSilver}`
  }),
  rightColumn: b.styleDef({
    cssFloat: "left",
    width: "calc(100% - 260px)",
    paddingTop: 1
  }),
  menuLine: b.styleDef({
    marginBottom: 2
  })
};

export class AdminHomePage extends b.Component<IDataWithActiveRouteHandler> {
  init() {
    appStore().adminStore.CheckAuthentication();
    document.body.style.marginTop = "0px";
  }

  @b.bind
  protected signOut() {
    appStore().adminStore.SignOut();
    return true;
  }

  protected runTrunsition(transition: b.IRouteTransition) {
    b.runTransition(transition);
    return true;
  }

  render() {
    const activeRouteName = b.getActiveRoutes()[0].name;

    return (
      <div>
        <div style={styles.headerWrapper}>
          <div style={{ cssFloat: "left", marginLeft: 10, marginTop: 15 }}>
            ADMINISTRACE
          </div>
          <div style={{ cssFloat: "right" }}>
            <Button
              onClick={this.signOut}
              text="Odhlásit"
              colorScheme={colors.buttonYellow}
            />
          </div>
          <div style={{ clear: "both" }} />
        </div>
        <div style={styles.leftColumn}>
          <div style={styles.menuLine}>
            <Button
              explicitWidth={240}
              onClick={() => this.runTrunsition(adminUsersTransition)}
              text="Uzivatelé"
              colorScheme={
                activeRouteName === adminUsersTransition.name
                  ? colors.buttonRed
                  : colors.buttonYellow
              }
            />
          </div>
          <div style={styles.menuLine}>
            <Button
              explicitWidth={240}
              onClick={() => this.runTrunsition(adminReservationsTransition)}
              text="Rezervace"
              colorScheme={
                activeRouteName === adminReservationsTransition.name
                  ? colors.buttonRed
                  : colors.buttonYellow
              }
            />
          </div>
        </div>
        <div style={styles.rightColumn}>
          {this.data.activeRouteHandler !== undefined &&
            this.data.activeRouteHandler()}
        </div>
        <div style={{ clear: "both" }} />
      </div>
    );
  }
}

export const adminHomePage = b.component(AdminHomePage);
