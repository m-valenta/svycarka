import {
  IReservationListRequest,
  IReservationListResponse,
  IReservation
} from "./data/reservation/types";
import { Month } from "./utils/dateUtils";

export function reservationListDataMock(
  request: IReservationListRequest
): IReservationListResponse | undefined {
  let reservations: IReservation[] = [];

  let currentMonth = request.month - 1;
  let currentMonthReservation = getReservationData(
    currentMonth < Month.January ? request.year - 1 : request.year,
    currentMonth < Month.January ? Month.December : request.month
  );
  if (currentMonthReservation !== undefined) {
    reservations = reservations.concat(currentMonthReservation);
  }

  currentMonthReservation = getReservationData(request.year, request.month);
  if (currentMonthReservation !== undefined) {
    reservations = reservations.concat(currentMonthReservation);
  }

  return reservations.length > 0 ? {year: request.year, month: request.month, reservations } : undefined;

  function getReservationData(
    year: number,
    month: number
  ): IReservation[] | undefined {
    switch (request.year) {
      case 2019:
        switch (request.month) {
          case Month.June:
            return [
              {
                dateItem: [2019, 3, 11],
                duration: 7
              }
            ];
          default:
            return undefined;
        }
      default:
        return undefined;
    }
  }
}
