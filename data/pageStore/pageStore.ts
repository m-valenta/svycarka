import * as b from "bobril";
import { observable, IObservableMap, } from "bobx";
import {
  defaultTransition,
  reservationTransition,
  tipsTransition
} from "../../transitions";
import { Page, IPageStore, IScrollItem } from "./types";

class PageStore implements IPageStore {
  @observable
  protected _currentPagePage: Page;

  protected _scrollItems: Map<string, number>;

  @observable
  forceShowTree: boolean;

  constructor() {
    this._currentPagePage = Page.Home;
    this.forceShowTree = false;
    this.clearScrollItems();
  }

  get currentPage(): Page {
    return this._currentPagePage;
  }

  goToPage(page: Page): void {
    this._currentPagePage = page;

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
    window.scroll(0,0);
  }

  setPageInitialized(page: Page): void {
    this._currentPagePage = page;
    this.clearScrollItems();
  }

  setScroolItemPosition(id: string, yPosition: number) {
    this._scrollItems.set(id, yPosition);
  }

  getScrollItemPosition(id: string): number | undefined {
    return this._scrollItems.get(id);
  }

  private clearScrollItems(){
    this._scrollItems = new Map();
    this._scrollItems.set("header", 0);
  }
}

export function pageStoreFactory(): IPageStore {
  return new PageStore();
}
