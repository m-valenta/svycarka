import * as b from "bobril";
import { initGlobalization, setLocale } from "bobril-g11n";
import { locales } from "./constants";
import { initAppStore, appStore } from "./data/appStore";
import { dateInput } from "./components/dateInput/component";
import { button } from "./components/button/buton";
import { colors } from "./styleConstants";
import * as component from "./components/expander/component";
import { headerComp } from "./components/header/headerComponent";
import { map } from "./components/map/component";
import { contact } from "./components/contact/component";
import { copyRight } from "./components/copyright/component";

initGlobalization({
  defaultLocale: locales.default
}).then(() => {
  setLocale(locales.czech);
  initAppStore();

  b.init(() => [
    dateInput({ store: appStore.reservationStore }),
    { tag: "br" },
    button({
      colorScheme: colors.buttonYellow,
      text: "Rezervovat termín",
      onClick: () => alert("Rezervovat termín")
    }),
    { tag: "br" },
    button({
      colorScheme: colors.buttonRed,
      text: "Rezervovat termín",
      onClick: () => alert("Rezervovat termín (red)")
    }),
    { tag: "br" },
    component.expander({
      expandedWidth: 414,
      expandedHeight: 69,
      headerText: "Mám zájem o doplňkové služby",
      children: b.styledDiv("", {
        width: 414,
        height: 69,
        border: "solid 1px silver"
      })
    }),
    { tag: "br" },
    headerComp({
      showReservation: true,
      showTree: true
    }),
    map(),
    contact(),
    copyRight()
  ]);
});
