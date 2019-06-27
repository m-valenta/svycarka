import * as b from "bobril";
import { contentSize, colors, leftArrow, logo } from "../../styleConstants";

export const wrapper = b.styleDef({
  position: "fixed",
  left: 0,
  top: 0,
  zIndex: 2,
  width: "100%",
  backgroundColor: "white"
});

const contentStyle = b.styleDefEx(contentSize, {
  height: 50,
  paddingLeft: 57,
  paddingRight: 43,
  position: "relative",
  margin: "0 auto"
});

export const content = [contentSize, contentStyle];

export const rezervationButton = b.styleDef({
  fontSize: 18,
  height: 50,
  backgroundColor: colors.buttonYellow,
  color: "white",
  textTransform: "uppercase",
  padding: "16px 45px",
  cssFloat: "left",
  cursor: "pointer",
  boxSizing: "border-box"
});

export const sociaButton = b.styleDef({
  height: 50,
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
  height: 50,
  width: 41,
  marginLeft: 23,
  cursor: "pointer",
  cssFloat: "right",
  position: "relative"
});

export const menuButtonContent = b.styleDef({
  width: 41,
  height: 30,
  position: "absolute",
  top: 10
});

export const localeButton = b.styleDef({
  fontSize: 18,
  marginTop: 16,
  color: colors.inputSilver,
  cssFloat: "right",
  cursor: "pointer"
});

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
  width: 44,
  height: 50
});

export const logoContent = [logo, logoContentStyle];
