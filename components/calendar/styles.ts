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
  lineHeight: "43px",
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

export const columnStyleSelectableWithHover = b.styleDefEx(columnStyleSelectable, {}, {
  hover: {
    border: "none",
    backgroundColor: colors.calendarRed,
    color: "white"
  }});


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
  height: 25,
  fontSize: 15,
  paddingTop: 7.5
});

export const closePosition = b.styleDefEx(headerButtonStyle, {
  cssFloat: "right",
  marginRight: 25,
});

export const mouseSelection = b.styleDef({
  borderTop: `solid 2px ${colors.calendarRed}`,
  borderBottom: `solid 2px ${colors.calendarRed}`
});

export const mouseSelectionEdge = b.styleDefEx(
  [columnStyle, columnStyleOtherMonth],
  {
    // borderLeft: `solid 2px ${colors.calendarRed}`,
    border: "none",
    backgroundColor: colors.calendarRed,
    color: "white"
  }
);

export const currentSelection = b.styleDefEx(
  [columnStyle, columnStyleOtherMonth, mouseSelectionEdge],
  {
    backgroundColor: colors.calendarRed,
    color: "black"
  }
);
