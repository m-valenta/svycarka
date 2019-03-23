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
    marginLeft: "0.8%",
    cssFloat: "left",
    textAlign: "center",
    border: "solid 1px red"
});

export const dayLine = b.styleDefEx(rowStyle, [rowStyle, {
    fontWeight: 700
}]);

