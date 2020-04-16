import * as b from "bobril";
import { zIndex, closeButton } from "../../styleConstants";
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
  height: "95%",
  top: "5%",
  position: "relative"
});

export const closeContent = b.styleDef([{
  position: "absolute",
  top: "0",
  right: "20.78%",
  cursor: "pointer",
  width: 43,
  height: 43
}, closeButton]);

export const closeContentCentered = b.styleDef([{
  position: "absolute",
  top: "50%",
  right: "20.78%",
  cursor: "pointer",
  width: 43,
  height: 43,
  transform: "translate(0, -300%)"
}, closeButton]);