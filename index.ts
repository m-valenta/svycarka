import * as b from "bobril";
import { initGlobalization, setLocale } from "bobril-g11n";
import { locales } from "./constants";
import { calendar } from "./components/calendar/component"

initGlobalization({
    defaultLocale: locales.default
}).then(() => {
    setLocale(locales.czech);
    b.init(() => calendar({}));
});

