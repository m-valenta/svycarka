import * as b from "bobril";
import { colors } from "../../styleConstants";

export const wrapperStyle = b.styleDef({
  width: "100%",
  fontSize: 24
});

export const rowStyle = b.styleDef({
  margin: "2px 0"
});

export const columnStyle = b.styleDef({
  height: 43,
  width: "14%",
  cssFloat: "left",
  textAlign: "center",
  cursor: "default",
  boxSizing: "border-box"
});

export const columnStyleOtherMonth = b.styleDefEx(columnStyle, {
  color: colors.calendarSilver
});

export const columnStyleReserved = b.styleDefEx(
  [columnStyleOtherMonth, columnStyle],
  {
    color: colors.calendarSilver,
    textDecoration: "line-through"
  }
);

export const columnStyleSelectable = b.styleDefEx(
  [columnStyle, columnStyleOtherMonth],
  {
    cursor: "pointer !important"
  }
);

const dayLineStyle = b.styleDefEx(rowStyle, {
  fontSize: 7
});

export const dayLine = b.styleDef([rowStyle, dayLineStyle]);

export const headerWrapper = b.styleDef({
  marginLeft: "32.5%",
  marginBottom: 5
});

export const headerButtonStyle = b.styleDef({
  width: 25,
  height: 25,
  cursor: "pointer",
  cssFloat: "left"
});

export const monthWrapper = b.styleDef({
  cssFloat: "left",
  textAlign: "center",
  width: "26.8%",
  fontSize: 15
});

export const mouseSelection = b.styleDef({
  borderTop: `solid 2px ${colors.calendarRed}`,
  borderBottom: `solid 2px ${colors.calendarRed}`
});

export const mouseSelectionStart = b.styleDefEx(
  [columnStyle, columnStyleOtherMonth],
  {
    borderLeft: `solid 2px ${colors.calendarRed}`,
    borderRadius: "2px 0 0 2px",
    backgroundColor: colors.calendarRed,
    color: "white"
  }
);

export const mouseSelectionEnd = b.styleDef({
  borderRight: `solid 2px ${colors.calendarRed}`,
  borderRadius: "0 2px 2px 0"
});

export const currentSelection = b.styleDefEx(
  [columnStyle, columnStyleOtherMonth, mouseSelectionStart],
  {
    backgroundColor: colors.calendarRed,
    color: "black"
  }
);
