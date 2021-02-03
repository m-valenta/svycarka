import * as b from "bobril";
import { errorBackground_png } from "../src/assets";
import { colors, contentSize, copyrightSectionHeight, menuHeight } from "../styleConstants";
import { getResourceCssUrl } from "../utils/resourceUtils";


const otherContentHeight = menuHeight + copyrightSectionHeight;

export const wrapperStyle = b.styleDef({
    backgroundColor: colors.errorBackground,
    height: `calc(100vh - ${otherContentHeight}px)`
});

export const errorContent = b.styleDef([{
        paddingTop: 60,
        paddingLeft: 57,
        paddingRight: 43,
        position: "relative",
        margin: "0 auto",
}, contentSize]);

export const errorImage = b.styleDef({
    width: "45%",
    paddingBottom: "38%", 
    backgroundSize: "cover",
    backgroundImage: getResourceCssUrl(b.asset(errorBackground_png))
});

export const errorInfo = b.styleDef({
    width: "330px",
    position: "absolute",
    top: 100
});

export const textBase = b.styleDef({
    textAlign: "center",
    color: colors.menu,
    display: "inline-block",
    marginBottom: 35
});

export const textShadow = b.styleDef({        
    color: "white",
    textShadow: "0px 3px 6px #00000029"
});

export const text404 = b.styleDefEx(textBase, {
    fontSize: "163px",
    margin: "63px 0 -78px 0" 
});

export const buttonCenter = b.styleDef({
    display: "table",
    margin: "0 auto"
});