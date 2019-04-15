import { IReservationListRequest, IReservationListResponse } from "./data/reservation/types";
import { Month } from "./utils/dateUtils";

export function reservationListDataMock(request: IReservationListRequest): IReservationListResponse | undefined {
    switch(request.year) {
        case 2019: 
            switch(request.month){
                case Month.April: 
                    return {
                        reservations: [

                        ]
                    };
                default: 
                    return undefined;
            }
        default:
            return undefined;
    }
}