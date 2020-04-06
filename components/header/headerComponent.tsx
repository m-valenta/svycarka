import * as b from "bobril";
import * as styles from "./styles";
import { t, getLocale, setLocale } from "bobril-g11n";
import { tipsTransition } from "../../transitions";
import { socialBackgrounds, menuButton, closeButton } from "../../styleConstants";
import { locales } from "../../constants";
import { observable } from "bobx";
import { appStore } from "../../data/appStore";
import { Page, IPageStore } from "../../data/pageStore/types";
import { scrollToWrapper, scrollSection } from "../scrollToWrapper/utils";
import { homePage } from "../../pages/homePage";
import { getlocaleName } from "../../utils/localeUtils";
import { IHeaderStore } from "../../data/header/types";

export interface IData {
  showReservation: boolean;
  showTree: boolean;
}

export class HeaderComponent extends b.Component<IData> {
  render() {
    const store = appStore().headerStore;

    const children = [];
    this.data.showReservation && children.push(<RezervationButton key="h-rez" />);
    children.push(
      <SocialButton key="h-sb_0"
        backgroundStyle={socialBackgrounds.instagramImage}
        url="https://www.instagram.com/svycarka"
      />
    );
    children.push(
      <SocialButton key="h-sb_1"
        backgroundStyle={socialBackgrounds.facebook}
        url="https://www.facebook.com/nasvycarku/"
      />
    );
    children.push(<MenuContent key="h-mc" store={store} />);
    children.push(<LanguageSection key={`h-ls${store.isMenuOpen}`} store={store} />);
    this.data.showTree && !store.isMenuOpen && children.push(<Logo key="h-logo" />);
    return (
      <div style={styles.wrapper}>
        <div style={styles.content}>{children}</div>
        <div style={{ clear: "both" }} />
      </div>
    );
  }
}

class RezervationButton extends b.Component {
  render() {
    return <div style={styles.rezervationButton}>{t("Reservation")}</div>;
  }

  onClick() {
    const store = appStore();
    store.resetPageState();
    store.pageStore.goToPage(Page.Reservation);
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

class MenuContent extends b.Component<{store: IHeaderStore}>{
  readonly pageStore: IPageStore = appStore().pageStore;
  
  render() {
    const children = [<MenuButton store={this.data.store}/>];
    if(this.data.store.isMenuOpen){
      children.push(<this.menuItem text={t("Contact")} onClick={() => this.scrollTo("contact")} />);
      children.push(<this.menuItem text={t("Location")} onClick={() => this.navigateTo(Page.Home, "location")}/>);
      children.push(<this.menuItem text={t("Price")} onClick={() => this.navigateTo(Page.Home, "how_much")}/>);
      children.push(<this.menuItem text={t("Visit us")} onClick={() => this.navigateTo(Page.Home, "at_us")}/>);
      children.push(<this.menuItem text={t("Why")} onClick={() => this.navigateTo(Page.Tips,)}/>);
    }

    return <>{children}</>;
  }

  scrollTo(sectionName: scrollSection): boolean {
    if(this.pageStore.currentPage === Page.Error)
      this.navigateTo(Page.Home, "contact");
    else
      scrollToWrapper(sectionName);
    return true;
  }

  navigateTo(page: Page, sectionName?: scrollSection): boolean {
    this.pageStore.goToPage(page, sectionName);
    return true;
  }

  menuItem(data: {text: string, onClick: () => boolean}): b.IBobrilNode {
    return <div style={styles.MenutItem} onClick={data.onClick}>{data.text}</div>;
  }
}

class MenuButton extends b.Component<{store: IHeaderStore}> {
  render() {
    return (
      <div style={styles.menuButton}>
        <div style={[this.data.store.isMenuOpen ? closeButton : menuButton, styles.menuButtonContent]} />
      </div>
    );
  }

  onClick() {
    if(this.data.store.isMenuOpen)
      this.data.store.closeMenu();
    else
      this.data.store.openMenu();

    return true;
  }
}

class LanguageSection extends b.Component<{ store: IHeaderStore }> {
  @observable
  protected _currentLocale: string;

  init() {
    this._currentLocale = getLocale();
  }

  render() {
    const children: b.IBobrilNode[] = [];
    if (this.data.store.isLanguageSelectionOpen) {
      for (let localeKey in locales) {
        let locale = locales[localeKey];
        let isSelected = locale === this._currentLocale;
        children.push(
          <this.languageButton
            localeName={getlocaleName(locale)}
            isSelected={isSelected}
            onClickHandler={() => {
              if (!isSelected) this.changeLocale(locale);
              this.data.store.closeLanguageSection();
              return true;
            }}
          />
        );
      }
    } else {
      children.push(
        <this.languageButton
          localeName={getlocaleName(this._currentLocale)}
          isSelected={false}
          onClickHandler={() => {
            this.data.store.openLanguageSection();
            return true;
          }}
        />
      );
    }

    return <div>{children}</div>;
  }

  protected languageButton(data: {
    onClickHandler: () => boolean;
    localeName: string;
    isSelected: boolean;
  }): b.IBobrilNode {
    return (
      <div
        style={
          data.isSelected ? styles.selectedLocaleButton : styles.localeButton
        }
        onClick={data.onClickHandler}
      >
        {data.localeName}
      </div>
    );
  }

  protected async changeLocale(targetLocale: string): Promise<void> {
    await setLocale(targetLocale);
    this._currentLocale = targetLocale;
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
    appStore().pageStore.goToPage(Page.Home);
    return true;
  }
}
