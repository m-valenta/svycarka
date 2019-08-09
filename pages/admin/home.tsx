import * as b from "bobril";
import { appStore } from "../../data/appStore";
import { Button } from "../../components/button/buton";
import { colors } from "../../styleConstants";

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
        cssFloat: "left"
    }),
    menuLine: b.styleDef({
        marginBottom: 2
    }) 
};

export class AdminHomePage extends b.Component {
  init() {
    appStore().adminStore.CheckAuthentication();
    document.body.style.marginTop = "0px";
  }

  @b.bind
  signOut() {
    appStore().adminStore.SignOut();
    return true;
  }

  render() {
      b.getActiveRoutes()
    return (
      <div>
        <div style={styles.headerWrapper}>
          <div style={{cssFloat: "left", marginLeft: 10, marginTop: 15}}>ADMINISTRACE</div>
          <div style={{cssFloat: "right"}}><Button onClick={this.signOut} text="SignOut" colorScheme={colors.buttonYellow} /></div>
          <div style={{clear: "both"}} />
        </div>
        <div style={styles.leftColumn}>
            <div style={styles.menuLine}><Button explicitWidth={240} onClick={this.signOut} text="Add user" colorScheme={colors.buttonYellow} /></div>
            <div style={styles.menuLine}><Button explicitWidth={240} onClick={this.signOut} text="Users" colorScheme={colors.buttonYellow} /></div>
            <div style={styles.menuLine}><Button explicitWidth={240} onClick={this.signOut} text="Add reservation" colorScheme={colors.buttonYellow} /></div>
            <div style={styles.menuLine}><Button explicitWidth={240} onClick={this.signOut} text="Reservations" colorScheme={colors.buttonYellow} /></div>
        </div>
        <div style={styles.rightColumn}>
        </div>            
        <div style={{clear: "both"}}></div>
      </div>
    );
  }
}

export const adminHomePage = b.component(AdminHomePage);
