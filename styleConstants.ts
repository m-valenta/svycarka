import * as b from "bobril";
import {
  arrow_svg,
  dateArrow_svg,
  lucida_sans_unicode_webfont_woff,
  lucida_sans_unicode_webfont_woff2,
  fb_svg,
  instagram_svg,
  menu_svg,
  logo_svg,
  phone_svg,
  email_svg
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

export const contentSize = b.styleDef({
  width: "67%"
});

export const contentWrapper = b.styleDef({
  margin: "0 11% 0 14%",
  padding: 0
});

export const dateArrow = b.styleDef({
  backgroundImage: getResourceCssUrl(b.asset(dateArrow_svg)),
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain"
});

const socialImage = b.styleDef({
  backgroundRepeat: "no-repeat",
  backgroundSize: "30px 30px"
});

const fbImage = b.styleDefEx(socialImage, {
  backgroundImage: getResourceCssUrl(b.asset(fb_svg))
});

const instagramImage = b.styleDefEx(socialImage, {
  backgroundImage: getResourceCssUrl(b.asset(instagram_svg))
});

export const socialBackgrounds = {
  facebook: [socialImage, fbImage],
  instagramImage: [socialImage, instagramImage]
};

export const menuButton = {
  backgroundImage: getResourceCssUrl(b.asset(menu_svg)),
  backgroundRepeat: "no-repeat",
  backgroundSize: "41px 30px"
};

export const logo = b.styleDef({
  backgroundImage: getResourceCssUrl(b.asset(logo_svg)),
  backgroundRepeat: "no-repeat",
  backgroundSize: "44px 50px"
});

export const contacsBackgrounds = {
  phone: b.styleDef({
    backgroundImage: getResourceCssUrl(b.asset(phone_svg)),
    backgroundRepeat: "no-repeat",
    backgroundSize: "16px 28px",
    width: 16,
    height: 28,
    marginRight: 23
  }),
  email: b.styleDef({
    backgroundImage: getResourceCssUrl(b.asset(email_svg)),
    backgroundRepeat: "no-repeat",
    backgroundSize: "26px 16px",
    width: 26,
    height: 16,
    marginRight: 13
  })
};

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

export const zIndex = {
  buble: 10000
};
