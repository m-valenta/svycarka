import * as b from "bobril";
import {
  arrow_svg,
  dateArrow_svg,
  lucida_sans_unicode_woff,
  lucida_sans_unicode_woff2,
  fb_svg,
  instagram_svg,
  menu_svg,
  logo_svg,
  phone_svg,
  email_svg,
  close_svg,
  add_png,
  remove_png,
  edit_png
} from "./src/assets";
import { getResourceCssUrl } from "./utils/resourceUtils";

export const colors = {
  calendarSilver: "#8c8c8c",
  calendarRed: "#a01a22",
  inputSilver: "#d2c6b8",
  buttonYellow: "#a47b21",
  buttonRed: "#a01a22",
  hover: "#286140"
};

const arrow = b.styleDef({
  backgroundImage: getResourceCssUrl(b.asset(arrow_svg)),
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
  cursor: "pointer"
});

const arrow_right = b.styleDefEx(arrow, {
  transform: "rotate(90deg)"
});

const arrow_left = b.styleDefEx(arrow, {
  transform: "rotate(-90deg)"
});

const hoverArrow = b.styleDef({
  background: colors.hover,
  "-webkit-mask": getResourceCssUrl(b.asset(arrow_svg)) + " no-repeat",
  mask: getResourceCssUrl(b.asset(arrow_svg)) + " no-repeat",  
});

export const rightArrow = b.styleDef([arrow, arrow_right], {
  hover: [hoverArrow, { transform: "rotate(90deg)" }]
});

export const leftArrow = b.styleDef([arrow, arrow_left], {
  hover: [hoverArrow, {transform: "rotate(-90deg)"}]
});

export const closeButton = b.styleDef({
    background: getResourceCssUrl(b.asset(close_svg)) + " no-repeat",
    cursor: "pointer"
}, {
  hover: {
    background: colors.hover,
    "-webkit-mask": getResourceCssUrl(b.asset(close_svg)) + " no-repeat",
    mask: getResourceCssUrl(b.asset(close_svg)) + " no-repeat"  
  }
})

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
  backgroundSize: "30px 30px",
});



const fbImage = b.styleDefEx(socialImage, {
  backgroundImage: getResourceCssUrl(b.asset(fb_svg))
}, {
  hover: {
    background: colors.hover,
    "-webkit-mask": getResourceCssUrl(b.asset(fb_svg)) + "no-repeat",
    mask: getResourceCssUrl(b.asset(fb_svg)) + "no-repeat" 
  }
});

const instagramImage = b.styleDefEx(socialImage, {
  backgroundImage: getResourceCssUrl(b.asset(instagram_svg))
}, {
  hover: {
    background: colors.hover,
    "-webkit-mask": getResourceCssUrl(b.asset(instagram_svg)) +  "no-repeat",
    mask: getResourceCssUrl(b.asset(instagram_svg))+ "no-repeat" 
  }
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

export const buttonHover = b.styleDef({
    backgroundColor: colors.hover + " !important"
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

const tableButton = b.styleDef({
  width: 20,
  height: 20,
  backgroundRepeat: "no-repeat",
  backgroundSize: "20px 20px",
  cursor: "pointer",
  cssFloat: "left"
});

const addButtonBg = b.styleDefEx(tableButton, {
  backgroundImage: getResourceCssUrl(b.asset(add_png))
});

const removeButtonBg = b.styleDefEx(tableButton, {
  backgroundImage: getResourceCssUrl(b.asset(remove_png))
});

const editButtonBg = b.styleDefEx(tableButton, {
  backgroundImage: getResourceCssUrl(b.asset(edit_png))
});

export const addButton = [tableButton, addButtonBg];
export const editButton = [tableButton, editButtonBg];
export const removeButton = [tableButton, removeButtonBg];


b.injectCss(`
    @font-face {
        font-family: '${lucida_sans_unicoderegular}';
        src: ${getResourceCssUrl(
          b.asset(lucida_sans_unicode_woff)
        )} format('woff2'),
            ${getResourceCssUrl(
              b.asset(lucida_sans_unicode_woff2)
            )} format('woff');
        font-weight: normal;
        font-style: normal;
    }
    body {
        margin-top: 50px;
        font-family: ${lucida_sans_unicoderegular};
    }
`);

export const zIndex = {
  modal: 9999,
  buble: 10000
};
