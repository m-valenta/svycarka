import { reservationStoreFactory } from "./reservation/reservationStore";
import { IReservationStore } from "./reservation/types";
import { pageStoreFactory } from "./pageStore/pageStore";
import { IPageStore } from "./pageStore/types";
import { IAdminStore, IAdminReservationStore, IAdminUserStore } from "./admin/types";
import { adminStoreFactory } from "./admin/adminStore";
import { adminUserStoreFactory } from "./admin/usersStore";
import { adminReservationStoreFactory } from "./admin/adminReservationStore";
import { IGalleryStore } from "./gallery/types";
import { galletyStoreFactory } from "./gallery/galleryStore";

export interface IAppStore {
  reservationStore: IReservationStore;
  pageStore: IPageStore;
  adminStore: IAdminStore;
  adminUserStore: IAdminUserStore;
  adminReservationStore: IAdminReservationStore;
  galleryStore: IGalleryStore;
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
  appStore.galleryStore = galletyStoreFactory();
}

export function appStore(): IAppStore {
  return window[appStoreKey];
}
