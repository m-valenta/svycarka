import { reservationStoreFactory } from "./reservation/reservationStore";
import { IReservationStore } from "./reservation/types";
import { pageStoreFactory } from "./pageStore/pageStore";
import { IPageStore } from "./pageStore/types";
import { IAdminStore, IAdminReservationStore, IAdminUserStore } from "./admin/types";
import { adminStoreFactory } from "./admin/adminStore";
import { adminUserStoreFactory } from "./admin/usersStore";
import { adminReservationStoreFactory } from "./admin/adminReservationStore";

export interface IAppStore {
  reservationStore: IReservationStore;
  pageStore: IPageStore;
  adminStore: IAdminStore;
  adminUserStore: IAdminUserStore;
  adminReservationStore: IAdminReservationStore;
}

const appStoreKey = "$appStore";
window[appStoreKey] = {};

export function initAppStore(): void {
  const appStore: IAppStore = window[appStoreKey]; 
  
  appStore.reservationStore = reservationStoreFactory();
  appStore.pageStore = pageStoreFactory();
  appStore.adminStore = adminStoreFactory();
  appStore.adminUserStore = adminUserStoreFactory();
  appStore.adminReservationStore = adminReservationStoreFactory();
}

export function appStore(): IAppStore {
  return window[appStoreKey];
}
