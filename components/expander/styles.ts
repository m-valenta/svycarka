import * as b from "bobril";
import { colors } from "../../styleConstants";

export const wrapper = b.styleDef({
  display: "inline-block",
  padding: "17px 23px",
  backgroundColor: colors.buttonYellow
});

export const header = b.styleDef({
  width: "100%",
  fontSize: 16,
  textAlign: "center",
  color: "white",
  cursor: "pointer"
});

export const content = b.styleDef({
  marginTop: 41
});
