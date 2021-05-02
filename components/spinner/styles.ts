import * as b from "bobril";
import { colors } from "../../styleConstants";

export const wrapper = b.styleDef({
  height: 29
});

export const text = b.styleDef({
  fontSize: 16,
  marginRight: 10,
  marginTop: 6.5,
  textAlign: "left",
  cssFloat: "left",
  color: colors.calendarSilver
});

export const inputWrapper = b.styleDef({
  width: 58,
  cssFloat: "left"
});

export const input = b.styleDef({
  width: 43,
  fontSize: 16,
  marginTop: 4.5,
  border: `solid 1px ${colors.inputSilver}`
});

export const inputWithValue = b.styleDef({
  colors: "black"
});
