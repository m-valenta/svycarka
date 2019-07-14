import { BaseReservationtrategy } from "./baseStrategy";
import { IMonthInfo, DayOfWeek, Month } from "../../../utils/dateUtils";

class BasicReservationtrategy extends BaseReservationtrategy {
  constructor() {
    super();
  }

  protected dayFormater(day: number): string {
    return `${day}.`;
  }
}

export const basicReservationtrategy = new BasicReservationtrategy();
