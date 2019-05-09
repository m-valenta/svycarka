import * as b from "bobril";
import { zIndex } from "../../styleConstants";
import { getResourceCssUrl } from "../../utils/resourceUtils";
import { close_svg } from "../../src/assets";

export const wrapper = b.styleDef({
  width: "100%",
  height: "100%",
  position: "fixed",
  left: 0,
  top: 0,
  zIndex: zIndex.modal,
  backgroundColor: "rgba(255, 255, 255, 0.98)",
  overflowY: "auto"
});

export const wrapperContent = b.styleDef({
  width: "100%",
  height: "100%",
  position: "relative"
});

export const closeContent = b.styleDef({
  position: "absolute",
  top: "0",
  right: "20.78%",
  cursor: "pointer",
  backgroundImage: getResourceCssUrl(b.asset(close_svg)),
  width: 43,
  height: 43,
  marginTop: -43
});
