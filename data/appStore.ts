import { reservationStoreFactory } from "./reservation/reservationStore";
import { IReservationStore } from "./reservation/types";


export interface IAppStore {
    reservationStore: IReservationStore;
}

export let appStore: IAppStore;

export function initAppStore(): void {
    appStore = {
        reservationStore: reservationStoreFactory()
    }
}

