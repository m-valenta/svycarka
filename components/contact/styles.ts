import * as b from "bobril";
import { getResourceCssUrl } from "../../utils/resourceUtils";
import { kontakt_background_png, jakub_jpg } from "../../src/assets";
import { contentSize } from "../../styleConstants";

export const wrapper = b.styleDef({
  backgroundImage: getResourceCssUrl(b.asset(kontakt_background_png)),
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain"
});

const contentStyle = b.styleDefEx(contentSize, {
  paddingBottom: "21.4%",
  backgroundColor: "white",
  opacity: 0.95,
  position: "relative",
  margin: "0 auto"
});

export const kubaFoto = b.styleDef({
  backgroundImage: getResourceCssUrl(b.asset(jakub_jpg)),
  backgroundRepeat: "no-repeat",
  backgroundSize: "159px 159px",
  width: 159,
  height: 159,
  borderRadius: "50%",
  transform: "rotate(-35deg)",
  marginTop: 70.5,
  cssFloat: "left"
});

export const contaInfo = b.styleDef({
  width: 200,
  height: 70,
  cssFloat: "left",
  marginTop: 115,
  marginLeft: 14
});

export const contactItemLink = b.styleDef({
  display: "block",
  cssFloat: "left",
  textDecoration: "none",
  color: "black",
  cursor: "pointer"
});

export const contactContent = b.styleDef({
  width: 500,
  height: 300,
  position: "absolute",
  top: "50%",
  left: "50%",
  marginTop: -150,
  marginLeft: -250
});

export const contentItem = b.styleDef({
  height: 32,
  marginBottom: 10
});

export const content = [contentSize, contentStyle];
