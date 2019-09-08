import * as b from "bobril";
import { colors } from "../../styleConstants";

export const tableWrapper = b.styleDef({
    margin: "10px auto 0 auto",
    border: `solid 1px ${colors.calendarSilver}`,
    boxSizing: "border-box",
    borderRadius: 3,

});

export const tableLine = b.styleDef({
    height: 20,
    fontSize: 20
});

export const tableColumn = b.styleDef({
    cssFloat: "left",
    paddingLeft: 2,
    borderRight: `solid 1px ${colors.calendarSilver}`,
    textOverflow: "ellipsis",
    overflow: "hidden", 
    whiteSpace: "nowrap" 
});

const lastTableColumnDef = b.styleDefEx(tableColumn,{
    cssFloat: "left",
    borderRight: "none" 
});

export const lastTableColumn = [tableColumn, lastTableColumnDef];

export const headerLine = b.styleDefEx(tableLine, {
    fontWeight: "bold",
    marginBottom: 2,
    borderBottom: `solid 1px ${colors.calendarSilver}`
});