import * as b from "bobril";
import { initGlobalization, setLocale } from "bobril-g11n";
import { locales } from "./constants";
import { initAppStore } from "./data/appStore";
import { masterPage } from "./pages/masterPage";
import { homePage } from "./pages/homePage";
import { tipsPage } from "./pages/tipsPage";
import { reservationPage } from "./pages/reservationPage";

// CSS files
b.asset("./css/reset.css");

initGlobalization({
  defaultLocale: locales.default
}).then(() => {
  setLocale(locales.czech);
  initAppStore();
  b.routes(
    b.route({ handler: masterPage }, [
      b.route({ url: "/tips", name: "tips", handler: tipsPage }),
      b.route({
        url: "/reservation",
        name: "reservation",
        handler: reservationPage
      }),
      b.routeDefault({ handler: homePage, name: "home" })
    ])
  );
});
