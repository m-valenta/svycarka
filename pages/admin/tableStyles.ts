import * as b from "bobril";
import { colors } from "../../styleConstants";
import { ReservationState } from "../../utils/stateUtils";

export const boldText = b.styleDef({
  fontWeight: "bold",
});

export const tableWrapper = b.styleDef({
  margin: "10px auto 10px auto",
  border: `solid 1px ${colors.calendarSilver}`,
  boxSizing: "border-box",
  fontSize: 20,
  borderRadius: 3,
});

export const tableLine = b.styleDef(
  {
    height: 20,
    fontSize: 20,
    padding: 5,
    margin: 0,
    width: "100%",
    borderBottom: `solid 1px ${colors.calendarSilver}`,
  },
  {
    hover: { fontWeight: "bold" },
  }
);

export const tableColumn = b.styleDef({
  cssFloat: "left",
  paddingLeft: 2,
  borderRight: `solid 1px ${colors.calendarSilver}`,
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "nowrap",
  lineHeight: "20px",
});

export const headerColumn = b.styleDefEx(tableColumn, {
  lineHeight: "30px",
  border: "none"
});

const lastTableColumnDef = b.styleDefEx(tableColumn, {
  cssFloat: "left",
  borderRight: "none",
});

export const lastTableColumn = [tableColumn, lastTableColumnDef];

export const headerLine = b.styleDefEx(tableLine, {
  fontWeight: "bold",
  borderBottom: `solid 1px #f2f2f2`,
  width: "100%",
  background: colors.calendarSilver,
  color: "white",
  height: 30,
  lineHeight: "30px",
  padding: "2px 0",
});

export function getRowColorDueState(
  isSelected: boolean,
  state: ReservationState
): b.IBobrilStyle {
  let color: string | undefined = undefined;

  if (isSelected) color = "#A47B21";

  if (color == undefined) {
    switch (state) {
      case ReservationState.New:
        color = "#86BE9D";
        break;
      case ReservationState.Denied:
      case ReservationState.NoCapacity:
      case ReservationState.Concluded:
        color = "#D2C6B8";
        break;
    }
  }
  if (color === undefined) color = "#FFFFFF";

  return { backgroundColor: color };
}
