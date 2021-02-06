import * as b from "bobril";
import { colors } from "../../styleConstants";

export const boldText = b.styleDef({
    fontWeight: "bold"
});

export const tableWrapper = b.styleDef({
    margin: "10px auto 10px auto",
    border: `solid 1px ${colors.calendarSilver}`,
    boxSizing: "border-box",
    fontSize: 20,
    borderRadius: 3,

});

export const tableLine = b.styleDef({
    height: 20,
    fontSize: 20,
    padding: "3px 0",
    display: "inline-block",
    width: "100%",
}, {
    "nth-child(even)": {background: "#ffffcc"},
    "nth-child(odd)": {background: "#f2f2f2"}
});

export const tableColumn = b.styleDef({
    cssFloat: "left",
    paddingLeft: 2,
    borderRight: `solid 1px ${colors.calendarSilver}`,
    textOverflow: "ellipsis",
    overflow: "hidden", 
    whiteSpace: "nowrap",
    lineHeight: "20px", 
});

const lastTableColumnDef = b.styleDefEx(tableColumn,{
    cssFloat: "left",
    borderRight: "none" 
});

export const lastTableColumn = [tableColumn, lastTableColumnDef];

export const headerLine = b.styleDefEx(tableLine, {
    fontWeight: "bold",
    borderBottom: `solid 1px #f2f2f2`,
    display: "inline-block",
    width: "100%",
    background: colors.calendarSilver,
    color: "white",
    lineHeight: "20px",
    padding: "2px 0"
});