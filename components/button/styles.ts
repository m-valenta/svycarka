import * as b from "bobril";
import { colors, buttonHover } from "../../styleConstants";

export const buttonStyle = b.styleDef({
  fontSize: 18,
  textAlign: "center",
  color: "white",
  textTransform: "uppercase",
  cursor: "pointer",
  borderRadius: 2,
  padding: "16px 35px",
  display: "inline-block",
  height: 50,
  boxSizing: "border-box"
},{
  hover: buttonHover
});
