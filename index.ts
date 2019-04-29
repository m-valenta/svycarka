import * as b from "bobril";
import { initGlobalization, setLocale } from "bobril-g11n";
import { locales } from "./constants";
import { initAppStore, appStore } from "./data/appStore";
import { dateInput } from "./components/dateInput/component";
import { button } from "./components/button/buton";
import { colors } from "./styleConstants";
import { expander } from "./components/expander/component";

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
    expander({
      expandedHeight: 176,
      expandedWidth: 440,
      headerText: "Mám zájem o doplňkové služby",
      children: b.styledDiv("", {
        width: 414,
        height: 69,
        border: "solid 1px silver"
      })
    })
  ]);
});
