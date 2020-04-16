import * as b from "bobril";
import { colors, dateArrow } from "../../styleConstants";

export const wrapper = b.styleDef(
  {
    width: 294,
    height: 54,
    cursor: "pointer",
    border: `solid 1px ${colors.inputSilver}`,
    position: "relative",
    borderRadius: 2,
    display: "inline-block",
    backgroundColor: "white"
  },
  {
    hover: {
      border: `solid 1px ${colors.hover}`
    }
  }
);

export const date = b.styleDef({
  width: 116,
  height: 23,
  marginTop: 15,
  fontSize: 16,
  cssFloat: "left",
  textAlign: "center"
});

const dateSeparatorDimension = b.styleDefEx(date, {
  width: 47,
  height: 24,
  marginTop: 16
});

export const dateSeprator = [date, dateArrow, dateSeparatorDimension];
