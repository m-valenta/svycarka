import * as b from "bobril";
import { IPageStore, Page } from "../data/pageStore/types";
import { appStore } from "../data/appStore";
import { colors, menuHeight, copyrightSectionHeight, contentSize } from "../styleConstants";
import { getResourceCssUrl } from "../utils/resourceUtils";
import { errorBackground_png } from "../src/assets";
import { t } from "bobril-g11n";
import { Button } from "../components/button/buton";
import { defaultTransition } from "../transitions";

const otherContentHeight = menuHeight + copyrightSectionHeight;

const styles = {
    wrapperStyle: b.styleDef({
        backgroundColor: colors.errorBackground,
        height: `calc(100vh - ${otherContentHeight}px)`
    }),
    errorContent: b.styleDef([{
            paddingTop: 60,
            paddingLeft: 57,
            paddingRight: 43,
            position: "relative",
            margin: "0 auto",
    }, contentSize]), 
    errorImage: b.styleDef({
        width: "45%",
        paddingBottom: "38%", 
        backgroundSize: "cover",
        backgroundImage: getResourceCssUrl(b.asset(errorBackground_png))
    }),
    errorInfo: b.styleDef({
        width: "30%",
        position: "absolute",
        left: "35%",
        top: 100,
    }),
    textBase: b.styleDef({
        textAlign: "center",
        color: colors.menu,
        display: "inline-block",
        marginBottom: 35
    }),
    textShadow: b.styleDef({        
        color: "white",
        textShadow: "0px 3px 6px #00000029"
    }),
    text404: b.styleDefEx(this.textBase, {
        fontSize: "163px",
        margin: "63px 0 -78px 0" 
    }),
    buttonCenter: b.styleDef({
        display: "table",
        margin: "0 auto"
    })
};

export class ErrorPage extends b.Component {
    private readonly store: IPageStore = appStore().pageStore;
    
    init() {
        this.store.showContactInformation = false;
        this.store.setPageInitialized(Page.Error);
    }
    render() {
        return <div style={styles.wrapperStyle}>
            <div style={styles.errorContent}>
                <div style={styles.errorImage}></div>
                <div style={styles.errorInfo}>
                    <div style={[styles.textBase, styles.textShadow, styles.text404]}>404</div>
                    <div style={[styles.textBase, styles.textShadow]}>{t("Sorry, this door is locked, you will have to come back.")}</div>
                    <div style={styles.buttonCenter}>
                        <Button text={t("Go back")} onClick={( )=> b.runTransition(defaultTransition)} colorScheme={colors.hover_menu} />
                    </div>
                </div>
            </div>
        </div>
    }
    destroy() {
        this.store.showContactInformation = true;
    }
    postInitDom() {
        this.store.setPageRendered(Page.Reservation);
    }
}

export const errorPage = b.component(ErrorPage);