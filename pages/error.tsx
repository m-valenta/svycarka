import * as b from "bobril";
import { IPageStore, Page } from "../data/pageStore/types";
import { appStore } from "../data/appStore";
import { colors, menuHeight, copyrightSectionHeight, contentSize, centerAbsoluteContent } from "../styleConstants";
import { getResourceCssUrl } from "../utils/resourceUtils";
import { errorBackground_png } from "../src/assets";
import { t } from "bobril-g11n";
import { Button } from "../components/button/button";
import { defaultTransition } from "../transitions";
import * as styles from "./error_styles";


export class ErrorPage extends b.Component {
    private readonly store: IPageStore = appStore().pageStore;
    
    init() {
        this.store.showContactInformation = false;
        this.store.setPageInitialized(Page.Error);
    }
    render() {
        console.log(b.getMedia());
        return <div style={styles.wrapperStyle}>
            <div style={styles.errorContent}>
                <div style={styles.errorImage}></div>
                <div style={[styles.errorInfo, centerAbsoluteContent]}>
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