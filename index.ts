import * as b from "bobril";
import { initGlobalization, setLocale } from "bobril-g11n";
import { locales } from "./constants";
import { calendar } from "./components/calendar/component";
import { initAppStore, IAppStore, appStore } from "./data/appStore";
import { basicReservationtrategy } from "./components/calendar/reservationStrategies/basicStrategy";

initGlobalization({
  defaultLocale: locales.default
}).then(() => {
  setLocale(locales.czech);
  initAppStore();

  b.init(() =>
    calendar({
      store: appStore.reservationStore,
      reservationStrategy: basicReservationtrategy
    })
  );
});
