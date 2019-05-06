import * as b from "bobril";
import { observable } from "bobx";
import {
  defaultTransition,
  reservationTransition,
  tipsTransition
} from "../../transitions";
import { Page, IPageStore } from "./types";

class PageStore implements IPageStore {
  @observable
  protected _currentPagePage: Page;

  constructor() {
    this._currentPagePage = Page.Home;
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
  }

  setPageInitialized(page: Page): void {
    this._currentPagePage = page;
  }
}

export function pageStoreFactory(): IPageStore {
  return new PageStore();
}
