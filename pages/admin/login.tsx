import * as b from "bobril";
import { observable, observableProp } from "bobx";
import { appStore } from "../../data/appStore";
import { colors } from "../../styleConstants";
import { Button } from "../../components/button/buton";

const styles = {
    loginWrapper: b.styleDef({
        width: 350,
        height: 150,
        border: `solid 1px ${colors.calendarSilver}`,
        borderRadius: 5,
        padding: "50px 10px 0 10px",
        margin: "10% auto 0 auto"
    }),
    leftColumn: b.styleDef({
        cssFloat: "left",
        width: 150
    }),
    rigthColumn: b.styleDef({
        cssFloat: "left",
        width: 200
    }),
    lineStyle:b.styleDef({
        textAlign: "left",
        verticalAlign: "middle",
        height: 25,
        marginBottom: 3
    })
};

export class LoginPage extends b.Component {
    
    @observable
    login: string = "";
    
    @observable
    password: string = "";

    @b.bind
    signIn(): boolean {
        if(this.login === "" || this.password === "")
            return true;
        
        appStore().adminStore.SignIn(this.login, this.password);
        this.password = "";
        return true;
    }

    init() {
        const adminStore = appStore().adminStore;
        adminStore.IsLogged = undefined;
    }

    render() {
        return <div style={styles.loginWrapper}>
            <div style={styles.leftColumn}>
                <div style={styles.lineStyle}>Login:</div>
                <div style={styles.lineStyle}>Password:</div>
            </div>
            <div style={styles.rigthColumn}>
                <div style={styles.lineStyle}><input type="text" value={observableProp(this, "login")} /></div>
                <div style={styles.lineStyle}><input type="password" value={observableProp(this, "password")} /></div>
                <div style={styles.lineStyle}><Button onClick={this.signIn} text="Sign in" colorScheme={colors.buttonYellow}/></div>
            </div>
        </div>;
    }
}

export const loginPage = b.component(LoginPage);