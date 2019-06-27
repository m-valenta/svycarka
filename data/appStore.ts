import { reservationStoreFactory } from "./reservation/reservationStore";
import { IReservationStore } from "./reservation/types";
import { pageStoreFactory } from "./pageStore/pageStore";
import { IPageStore } from "./pageStore/types";

export interface IAppStore {
  reservationStore: IReservationStore;
  pageStore: IPageStore;
}

const appStoreKey = "$appStore";
window[appStoreKey] = {};

export function initAppStore(): void {
  window[appStoreKey].reservationStore = reservationStoreFactory();
  window[appStoreKey].pageStore = pageStoreFactory();
}

export function appStore(): IAppStore {
  return window[appStoreKey];
}
