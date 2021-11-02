import { BaseReservationStrategy as BaseReservationStrategy } from "./baseStrategy";
import { IMonthInfo, DayOfWeek, Month } from "../../../utils/dateUtils";

class BasicReservationStrategy extends BaseReservationStrategy {
  constructor() {
    super();
  }

  protected dayFormatter(day: number): string {
    return `${day}.`;
  }
}

export const basicReservationStrategy = new BasicReservationStrategy();
