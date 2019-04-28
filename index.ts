import * as b from "bobril";
import { initGlobalization, setLocale } from "bobril-g11n";
import { locales } from "./constants";
import { initAppStore, appStore } from "./data/appStore";
import { dateInput } from "./components/dateInput/component";

initGlobalization({
  defaultLocale: locales.default
}).then(() => {
  setLocale(locales.czech);
  initAppStore();

  b.init(() => [dateInput({ store: appStore.reservationStore })]);
});
