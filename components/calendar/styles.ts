import * as b from "bobril";

export const wrapperStyle = b.styleDef({
    width: "100%",
    fontSize: "12pt"
})

export const rowStyle = b.styleDef({
    height: 20,
    padding: "2px 0",
    clear: "both"
});

export const columnStyle = b.styleDef({
    width: "13%",
    cssFloat: "left",
    textAlign: "center"
});

export const columnStyleOtherMonth = b.styleDefEx(columnStyle, {
    color: "silver"
})

export const columnStyleReserved = b.styleDefEx(columnStyleOtherMonth, {
    textDecoration: "line-through"
});

export const dayLine = b.styleDefEx(rowStyle, [rowStyle, {
    fontWeight: 700
}]);
