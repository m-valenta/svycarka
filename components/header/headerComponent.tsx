import * as b from "bobril";
import * as styles from "./styles";
import { t, getLocale, setLocale } from "bobril-g11n";
import { tipsTransition } from "../../transitions";
import { socialBackgrounds, menuButton, closeButton } from "../../styleConstants";
import { locales } from "../../constants";
import { observable } from "bobx";
import { appStore } from "../../data/appStore";
import { Page } from "../../data/pageStore/types";
import { scrollToWrapper, scrollSection } from "../scrollToWrapper/utils";
import { homePage } from "../../pages/homePage";

export interface IData {
  showReservation: boolean;
  showTree: boolean;
}

class HeaderStore {
  @observable
  protected languageSelectionOpen: boolean = false;
  @observable
  protected menuOpen: boolean = false;

  get isMenuOpen(): boolean {
    return this.menuOpen;
  }

  get isLanguageSelectionOpen(): boolean {
    return this.languageSelectionOpen;
  }

  openMenu() {
    this.menuOpen = true;
    this.languageSelectionOpen = false;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  openLanguageSection() {
    this.languageSelectionOpen = true;
    this.menuOpen = false;
  }

  closeLanguageSection() {
    this.languageSelectionOpen = false;
  }
}

export class HeaderComponent extends b.Component<IData> {
  protected store: HeaderStore;

  init() {
    this.store = new HeaderStore();
  }

  render() {
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
    children.push(<MenuContent key="h-mc" store={this.store} />);
    children.push(<LanguageSection key="h-ls" store={this.store} />);
    this.data.showTree && !this.store.isMenuOpen && children.push(<Logo />);
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
    appStore().pageStore.goToPage(Page.Reservation);
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

class MenuContent extends b.Component<{store: HeaderStore}>{
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
    this.data.store.closeMenu();
    scrollToWrapper(sectionName);
    return true;
  }

  navigateTo(page: Page, sectionName?: scrollSection): boolean {
    this.data.store.closeMenu();
    appStore().pageStore.goToPage(page, sectionName);
    return true;
  }

  menuItem(data: {text: string, onClick: () => boolean}): b.IBobrilNode {
    return <div style={styles.MenutItem} onClick={data.onClick}>{data.text}</div>;
  }
}

class MenuButton extends b.Component<{store: HeaderStore}> {
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

class LanguageSection extends b.Component<{ store: HeaderStore }> {
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
            localeName={this.getlocaleName(locale)}
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
          localeName={this.getlocaleName(this._currentLocale)}
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

  protected getlocaleName(locale: string): string {
    switch (locale) {
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
    appStore().pageStore.goToPage(Page.Home);
    return true;
  }
}
