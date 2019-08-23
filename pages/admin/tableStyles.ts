import * as b from "bobril";
import { colors } from "../../styleConstants";

export const tableWrapper = b.styleDef({
    margin: "10px 50% 0 50%",
    border: `solid 1px ${colors.calendarSilver}`,
    borderRadius: 3,

});

export const tableLine = b.styleDef({
    height: 20,
    fontSize: 20
});

export const tableColumn = b.styleDef({
    cssFloat: "left",
    borderRight: `solid 1px ${colors.calendarSilver}` 
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