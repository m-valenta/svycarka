import * as b from "bobril";
import { initGlobalization, setLocale } from "bobril-g11n";
import { locales } from "./constants";
import { initAppStore } from "./data/appStore";
import { masterPage } from "./pages/masterPage";
import { homePage } from "./pages/homePage";
import { tipsPage } from "./pages/tipsPage";
import { reservationPage } from "./pages/reservationPage";
import { favIconLink } from "./components/links/faviconlink";
import { CaptchaScript } from "./components/recaptcha/reCaptcha";
import { loginPage } from "./pages/admin/login";
import { adminHomePage } from "./pages/admin/home";

// CSS files
b.asset("./css/reset.css");

initGlobalization({
  defaultLocale: locales.default
}).then(() => {
  document.title = "Švýcarka";

  setLocale(locales.czech);
  initAppStore();
  b.routes([
    b.route({ handler: masterPage }, [
      b.route({ url: "/tips", name: "tips", handler: tipsPage }),
      b.route({
        url: "/reservation",
        name: "reservation",
        handler: reservationPage
      }),
      b.routeDefault({ handler: homePage, name: "home" })
    ]),
    b.route({
      url: "/login",
      name: "login",
      handler: loginPage
    }),
    b.route({
      url: "/admin/home",
      name: "adminHome",
      handler: adminHomePage
    }),
  ]);

  b.addRoot(() => {
    return [favIconLink(), CaptchaScript()];
  }, document.head);
});
