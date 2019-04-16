import * as b from "bobril";

export const wrapperStyle = b.styleDef({
  width: "100%",
  fontSize: 24
});

export const rowStyle = b.styleDef({
  height: 20,
  padding: "2px 0",
  clear: "both"
});

export const columnStyle = b.styleDef({
  width: "13%",
  cssFloat: "left",
  textAlign: "center",
  cursor: "default"
});

export const columnStyleOtherMonth = b.styleDefEx(columnStyle, {
  color: "silver"
});

export const columnStyleReserved = b.styleDefEx(
  [columnStyle, columnStyleOtherMonth],
  {
    textDecoration: "line-through"
  }
);

export const columnStyleSelectable = b.styleDefEx(
  [columnStyle, columnStyleOtherMonth],
  {
    cursor: "pointer"
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
