import * as b from "bobril";
import * as styles from "./styles";
import { t, getLocale, setLocale } from "bobril-g11n";
import {
  reservationTransition,
  tipsTransition,
  defaultTransition
} from "../../transitions";
import { socialBackgrounds, menuButton } from "../../styleConstants";
import { locales } from "../../constants";
import { observable } from "bobx";
import { appStore } from "../../data/appStore";
import { Page } from "../../data/pageStore/types";

export interface IData {
  showReservation: boolean;
  showTree: boolean;
}

export class HeaderComponent extends b.Component<IData> {
  render() {
    const children = [];

    this.data.showReservation && children.push(<RezervationButton />);
    children.push(
      <SocialButton
        backgroundStyle={socialBackgrounds.instagramImage}
        url="https://www.instagram.com/svycarka"
      />
    );
    children.push(
      <SocialButton
        backgroundStyle={socialBackgrounds.facebook}
        url="https://www.facebook.com/nasvycarku/"
      />
    );
    children.push(<MenuButton />);
    children.push(<LanguageButton />);
    this.data.showTree && children.push(<Logo />);
    return (
      <>
        <div style>
          <div style={styles.content}>{children}</div>
          <div style={{ clear: "both" }} />
        </div>
      </>
    );
  }
}

class RezervationButton extends b.Component {
  render() {
    return <div style={styles.rezervationButton}>{t("Reservation")}</div>;
  }

  onClick() {
    appStore.pageStore.goToPage(Page.Reservation);
    return true;
  }
}

interface ISocialButtonData {
  backgroundStyle: b.IBobrilStyles;
  url: string;
}

class SocialButton extends b.Component<ISocialButtonData> {
  render() {
    return (
      <a style={styles.sociaButton} target="_blank" href={this.data.url}>
        <div style={[styles.socialButtonContent, this.data.backgroundStyle]} />
      </a>
    );
  }
}

class MenuButton extends b.Component {
  render() {
    return (
      <div style={styles.menuButton}>
        <div style={[menuButton, styles.menuButtonContent]} />
      </div>
    );
  }

  onClick() {
    // TODO
    b.runTransition(tipsTransition);
    return true;
  }
}

class LanguageButton extends b.Component {
  @observable
  protected _currentLocale: string;

  init() {
    this._currentLocale = getLocale();
  }

  render() {
    return <div style={styles.localeButton}>{this.localeName}</div>;
  }

  onClick() {
    // toggle
    switch (this._currentLocale) {
      case locales.czech:
        setLocale(locales.default);
        this._currentLocale = locales.default;
        break;
      default:
        setLocale(locales.czech);
        this._currentLocale = locales.czech;
        break;
    }
    return true;
  }

  protected get localeName(): string {
    switch (this._currentLocale) {
      case locales.default:
        return "EN";
      default:
        return "CS";
    }
  }
}

class Logo extends b.Component {
  render() {
    return (
      <div style={styles.logoButton}>
        <div style={styles.logoContent} />
      </div>
    );
  }

  onClick() {
    appStore.pageStore.goToPage(Page.Home);
    return true;
  }
}
