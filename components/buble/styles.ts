import * as b from "bobril";
import { zIndex } from "../../styleConstants";

export const wrapper = b.styleDef({
  position: "absolute",
  botom: 0,
  marginTop: 21,
  zIndex: zIndex.buble
});

export const arrowWrapper = b.styleDef(
  {
    position: "relative",
    padding: 5,
    background: "#ffffff",
    border: "1px solid #bababa",
    borderRadius: 2
  },
  {
    after: {
      bottom: "100%",
      left: "13%",
      border: "solid transparent",
      content: "''",
      height: 0,
      width: 0,
      position: "absolute",
      pointerEvents: "none",
      borderColor: "rgba(0, 0, 0, 0)",
      borderBottomColor: "#ffffff",
      borderWidth: 5,
      marginLeft: -5
    },
    before: {
      bottom: "100%",
      left: "13%",
      border: "solid transparent",
      content: "''",
      height: 0,
      width: 0,
      position: "absolute",
      pointerEvents: "none",
      borderColor: "rgba(175, 175, 175, 0)",
      borderBottomColor: "#bababa",
      borderWidth: 6,
      marginLeft: -6
    }
  }
);
