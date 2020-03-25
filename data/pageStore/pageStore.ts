import * as b from "bobril";
import { observable, IObservableMap } from "bobx";
import {
  defaultTransition,
  reservationTransition,
  tipsTransition
} from "../../transitions";
import { Page, IPageStore, IScrollItem } from "./types";
import {
  scrollSection,
  scrollToWrapper
} from "../../components/scrollToWrapper/utils";
import { IAppStore } from "../appStore";

class PageStore implements IPageStore {
  @observable
  protected _currentPagePage: Page;

  @observable
  forceShowTree: boolean;

  @observable
  mapOverlayActive: boolean = true;

  protected _scrollItems: Map<string, number>;
  protected _lastScrollTo?: scrollSection;
  protected readonly _parentStore: IAppStore;

  constructor(parentStore: IAppStore) {
    this._parentStore = parentStore;
    this._currentPagePage = Page.Home;
    this.forceShowTree = false;
    this.clearScrollItems();
  }

  get currentPage(): Page {
    return this._currentPagePage;
  }

  goToPage(page: Page, scrollTo?: scrollSection): void {
    if (page === this._currentPagePage) {
      if (scrollTo === undefined) {
        this._parentStore.resetPageState();
        window.scroll(0, 0);
      } else scrollToWrapper(scrollTo);

      return;
    }

    this._currentPagePage = page;
    this._lastScrollTo = scrollTo;

    let transition: b.IRouteTransition;
    switch (page) {
      case Page.Reservation:
        transition = reservationTransition;
        break;
      case Page.Tips:
        transition = tipsTransition;
        break;
      default:
        transition = defaultTransition;
        break;
    }

    b.runTransition(transition);
    scrollTo == undefined && window.scroll(0, 0);
  }

  setPageInitialized(page: Page): void {
    this._currentPagePage = page;
    this.clearScrollItems();
  }

  setScrollItemPosition(id: string, yPosition: number) {
    this._scrollItems.set(id, yPosition);
  }

  getScrollItemPosition(id: string): number | undefined {
    return this._scrollItems.get(id);
  }

  setPageRendered(_page: Page) {
    if (this._lastScrollTo == undefined) return;

    scrollToWrapper(this._lastScrollTo);
    this._lastScrollTo = undefined;
  }

  private clearScrollItems() {
    this._scrollItems = new Map();
    this._scrollItems.set("header", 0);
  }
}

export function pageStoreFactory(parentStore: IAppStore): IPageStore {
  return new PageStore(parentStore);
}
