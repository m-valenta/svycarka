import { BaseReservationtrategy } from "./baseStrategy";
import { IMonthInfo, DayOfWeek, Month } from "../../../utils/dateUtils";

class BasicReservationtrategy extends BaseReservationtrategy {
  constructor() {
    super({
      specialDates: [
        {
          day: 30,
          month: Month.December,
          priceWeek: 44500
        },
        {
          day: 1,
          month: Month.January,
          priceWeek: 44500
        }
      ],
      seasons: [
        {
          months: [Month.December, Month.January, Month.February, Month.March],
          priceWeek: 19500
        },
        {
          months: [Month.June, Month.July, Month.August],
          priceWeek: 17000
        }
      ],
      weekPrice: 19000,
      weekendPrice: 8000
    });
  }

  protected dayFormater(day: number): string {
    return `${day}.`;
  }
}

export const basicReservationtrategy = new BasicReservationtrategy();
