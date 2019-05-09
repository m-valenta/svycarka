import * as b from "bobril";
import { zIndex } from "../../styleConstants";

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
  top: "10%",
  right: "10%"
});
