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
import { usersPage } from "./pages/admin/users";
import { reservationsPage } from "./pages/admin/reservations";
import { accomodationRulesPage } from "./pages/accommodationRulesPage";
import { gdprPage } from "./pages/gdpr";
import { pageTitle } from "./components/Title/title";
import { errorPage } from "./pages/error";

// CSS files
b.asset("./css/reset.css");

initGlobalization({
  defaultLocale: locales.default
}).then(async () => {
  document.title = "Švýcarka";
  await setLocale(locales.czech);
  initAppStore();
  b.routes([
    b.route({
      url: "/login",
      name: "login",
      handler: loginPage
    }),
    b.route({
      url: "/rad",
      name: "accomodationRules",
      handler: accomodationRulesPage
    }),
    b.route({
      url: "/gdpr",
      name: "gdpr",
      handler: gdprPage
    }),
    b.route({
      url: "/admin/home",
      name: "adminHome",
      handler: adminHomePage
    }, [
      b.route({
        url: "/admin/users",
        name: "adminUsers",
        handler: usersPage
      }),
      b.route({
        url: "/admin/resevations",
        name: "adminReservations",
        handler: reservationsPage
      }),
    ]),
    b.route({ handler: masterPage }, [
      b.route({ url: "/tips", name: "tips", handler: tipsPage }),
      b.route({
        url: "/reservation",
        name: "reservation",
        handler: reservationPage
      }),
      b.routeDefault({ handler: homePage, name: "home" }),
      b.routeNotFound({
        url: "/error",
        handler: errorPage
      })
    ]),
  ]);
  b.addRoot(() => {
    return [
      pageTitle(),
      favIconLink(), 
      CaptchaScript()
    ];
  }, document.head);
});
