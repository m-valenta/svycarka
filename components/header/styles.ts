import * as b from "bobril";
import {
  colors,
  logo,
  buttonHover,
  menuHeight,
  headerContentSize
} from "../../styleConstants";
import { button } from "../button/buton";

export const wrapper = b.styleDef({
  position: "fixed",
  left: 0,
  top: 0,
  zIndex: 2,
  width: "100%",
  backgroundColor: "white"
});

const contentStyle = b.styleDefEx(headerContentSize, {
  height: menuHeight,
  paddingLeft: 57,
  paddingRight: 43,
  position: "relative",
  margin: "0 auto"
});

export const content = [headerContentSize, contentStyle];

export const rezervationButton = b.styleDef(
  {
    height: menuHeight,
    backgroundColor: colors.buttonYellow,
    color: "white",
    textTransform: "uppercase",
    padding: "11px 45px",
    cssFloat: "left",
    cursor: "pointer",
    boxSizing: "border-box"
  },
  {
    hover: buttonHover
  }
);

export const sociaButton = b.styleDef({
  height: menuHeight,
  width: 30,
  marginLeft: 42,
  cursor: "pointer",
  display: "block",
  textDecoration: "none",
  cssFloat: "left",
  position: "relative"
});

export const socialButtonContent = b.styleDef({
  width: 41,
  height: 30,
  position: "absolute",
  top: 10
});

export const menuButton = b.styleDef({
  height: menuHeight,
  width: 41,
  marginLeft: 23,
  cursor: "pointer",
  cssFloat: "right",
  position: "relative"
});

export const menuButtonContent = b.styleDef({
  width: 35,
  height: 30,
  position: "absolute",
  top: 10
});

export const localeButton = b.styleDef(
  {
    marginTop: 13,
    marginLeft: 23,
    color: colors.lang,
    cssFloat: "right",
    cursor: "pointer"
  },
  {
    hover: {
      color: colors.hover
    }
  }
);

const localeButton_Selected = b.styleDefEx(localeButton, {
  color: colors.selected_lang
});

export const selectedLocaleButton = [localeButton, localeButton_Selected];

export const logoButton = {
  width: 44,
  height: 80,
  marginLeft: -22,
  position: "absolute",
  top: 0,
  left: "50%",
  cursor: "pointer"
};

const logoContentStyle = b.styleDef({
  width: 31,
  height: 35,
  marginTop: 6
});

export const logoContent = [logo, logoContentStyle];

export const MenutItem = b.styleDef(
  {
    marginTop: 13,
    marginLeft: 23,
    color: colors.menu,
    cssFloat: "right",
    cursor: "pointer",
    textTransform: "uppercase"
  }, {
    hover: {
      color: colors.hover_menu
    }
  });