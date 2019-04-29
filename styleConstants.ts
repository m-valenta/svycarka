import * as b from "bobril";
import {
  arrow_svg,
  dateArrow_svg,
  lucida_sans_unicode_webfont_woff,
  lucida_sans_unicode_webfont_woff2
} from "./src/assets";
import { getResourceCssUrl } from "./utils/resourceUtils";

const arrow = b.styleDef({
  backgroundImage: getResourceCssUrl(b.asset(arrow_svg)),
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain"
});

const arrow_right = b.styleDefEx(arrow, {
  transform: "rotate(90deg)"
});

const arrow_left = b.styleDefEx(arrow, {
  transform: "rotate(-90deg)"
});

export const rightArrow = [arrow, arrow_right];
export const leftArrow = [arrow, arrow_left];
export const lucida_sans_unicoderegular = "lucida_sans_unicoderegular";

export const dateArrow = b.styleDef({
  backgroundImage: getResourceCssUrl(b.asset(dateArrow_svg)),
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain"
});

export const colors = {
  calendarSilver: "#8c8c8c",
  calendarRed: "#a01a22",
  inputSilver: "#d2c6b8",
  buttonYellow: "#a47b21",
  buttonRed: "#a01a22"
};

b.injectCss(`
    @font-face {
        font-family: '${lucida_sans_unicoderegular}';
        src: ${getResourceCssUrl(
          b.asset(lucida_sans_unicode_webfont_woff2)
        )} format('woff2'),
            ${getResourceCssUrl(
              b.asset(lucida_sans_unicode_webfont_woff)
            )} format('woff');
        font-weight: normal;
        font-style: normal;
    }
    body {
        font-family: ${lucida_sans_unicoderegular}
    }
`);
