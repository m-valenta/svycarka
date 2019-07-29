import * as b from "bobril";
import { colors } from "../../styleConstants";

export const base = b.styleDef({ 
    display: "inline-block",
    margin: "65px auto 0 auto",
    borderRadius: 2
});

export const invalid = b.styleDefEx(base, {
    border: `solid 1px ${colors.buttonRed}`,
});