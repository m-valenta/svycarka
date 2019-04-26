import * as b from "bobril";

const colors = {
  silver: "#8c8c8c",
  red: "#a01a22"
};

export const wrapperStyle = b.styleDef({
  width: "100%",
  fontSize: 24
});

export const rowStyle = b.styleDef({
  margin: "2px 0"
});

export const columnStyle = b.styleDef({
  height: 43,
  width: "13%",
  cssFloat: "left",
  textAlign: "center",
  cursor: "default",
  boxSizing: "border-box"
});

export const columnStyleOtherMonth = b.styleDefEx(columnStyle, {
  color: colors.silver
});

export const columnStyleReserved = b.styleDefEx(
  [columnStyleOtherMonth, columnStyle],
  {
    color: colors.silver,
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
  borderTop: `solid 2px ${colors.red}`,
  borderBottom: `solid 2px ${colors.red}`
});

export const mouseSelectionStart = b.styleDefEx(
  [columnStyle, columnStyleOtherMonth],
  {
    borderLeft: `solid 2px ${colors.red}`,
    borderRadius: "2px 0 0 2px",
    backgroundColor: colors.red,
    color: "white"
  }
);

export const mouseSelectionEnd = b.styleDef({
  borderRight: `solid 2px ${colors.red}`,
  borderRadius: "0 2px 2px 0"
});

export const currentSelection = b.styleDefEx(
  [columnStyle, columnStyleOtherMonth, mouseSelectionStart],
  {
    backgroundColor: colors.red,
    color: "black"
  }
);
