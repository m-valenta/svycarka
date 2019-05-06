import { reservationStoreFactory } from "./reservation/reservationStore";
import { IReservationStore } from "./reservation/types";
import { pageStoreFactory } from "./pageStore/pageStore";
import { IPageStore } from "./pageStore/types";

export interface IAppStore {
  reservationStore: IReservationStore;
  pageStore: IPageStore;
}

export let appStore: IAppStore;

export function initAppStore(): void {
  appStore = {
    reservationStore: reservationStoreFactory(),
    pageStore: pageStoreFactory()
  };
}
