import { reservationStoreFactory } from "./reservation/reservationStore";
import { IReservationStore } from "./reservation/types";
import { pageStoreFactory } from "./pageStore/pageStore";
import { IPageStore } from "./pageStore/types";
import { IAdminStore, IAdminReservationStore, IAdminUserStore } from "./admin/types";
import { adminStoreFactory } from "./admin/adminStore";
import { adminUserStoreFactory } from "./admin/usersStore";
import { adminReservationStoreFactory } from "./admin/adminReservationStore";
import { IGalleryStore } from "./gallery/types";
import { galletyStoreFactory as galleryStoreFactory } from "./gallery/galleryStore";
import { IHeaderStore } from "./header/types";
import { headerStoreFactory } from "./header/headerStore";

export interface IAppStore {
  reservationStore: IReservationStore;
  pageStore: IPageStore;
  adminStore: IAdminStore;
  adminUserStore: IAdminUserStore;
  adminReservationStore: IAdminReservationStore;
  galleryStore: IGalleryStore;
  headerStore: IHeaderStore;

  resetPageState(): void;
}

const appStoreKey = "$appStore";
(window as any)[appStoreKey] = {};


export function initAppStore(): void {
  const appStore: IAppStore = (window as any)[appStoreKey]; 
  
  appStore.reservationStore = reservationStoreFactory();
  appStore.pageStore = pageStoreFactory(appStore);
  appStore.adminStore = adminStoreFactory();
  appStore.adminUserStore = adminUserStoreFactory();
  appStore.adminReservationStore = adminReservationStoreFactory();
  appStore.galleryStore = galleryStoreFactory();
  appStore.headerStore = headerStoreFactory();

  appStore.resetPageState = function(this: IAppStore) {
    this.headerStore.closeMenu();
    this.pageStore.mapOverlayActive = true;
  }
}

export function appStore(): IAppStore {
  return (window as any)[appStoreKey];
}
