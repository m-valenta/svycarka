import { reservationStoreFactory } from "./reservation/reservationStore";
import { IReservationStore } from "./reservation/types";
import { pageStoreFactory } from "./pageStore/pageStore";
import { IPageStore } from "./pageStore/types";
import { IAdminStore } from "./admin/type";
import { adminStoreFactory } from "./admin/adminStore";

export interface IAppStore {
  reservationStore: IReservationStore;
  pageStore: IPageStore;
  adminStore: IAdminStore;
}

const appStoreKey = "$appStore";
window[appStoreKey] = {};

export function initAppStore(): void {
  window[appStoreKey].reservationStore = reservationStoreFactory();
  window[appStoreKey].pageStore = pageStoreFactory();
  window[appStoreKey].adminStore = adminStoreFactory();
}

export function appStore(): IAppStore {
  return window[appStoreKey];
}
