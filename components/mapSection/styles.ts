import * as b from "bobril";
import { zIndex } from "../../styleConstants";

export const mapIframeStyle = b.styleDef({
  border: "none",
  width: "100%"
});

export const header = b.styleDef({
  lineHeight: "40px",
  fontSize: 30,
  marginBottom: 50,
  textAlign: "center"
});

export const footer = b.styleDef({
  lineHeight: "40px",
  fontSize: 16,
  marginTop: 30,
  textAlign: "center"
});

export const wrapper = b.styleDef({
  marginTop: 101,
  marginBottom: 45,
  position: "relative"
});

export const overlay = b.styleDef({
  width: "100%",
  position: "absolute",
  top: "90px",
  zIndex: zIndex.overlay
});