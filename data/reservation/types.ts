import { IAjaxRequest, IAjaxResponse } from "../ajaxUtils";
import { Month } from "../../utils/dateUtils";

export interface IReservationListRequest extends IAjaxRequest {
    month: number;
    year: number;    
}

export interface IReservationListResponse extends IAjaxResponse {
    reservations: IReservation[];
}

export interface IReservationStore {
    reservationList: IReservation[] | undefined;
    loadReservationList(month: Month, year: number): void;
}

export interface IReservation {
    day: number;
    month: number;
    year: number;
    duration: number;
}