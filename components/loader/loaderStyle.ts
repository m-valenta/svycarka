import * as b from "bobril";
import { getResourceCssUrl } from "../../utils/resourceUtils";
import { loader_gif } from "../../src/assets";
import { zIndex } from "../../styleConstants";

export const loaderWrapper = b.styleDef({
    position: "relative",
    pointerEvents: "none"
});

export const loaderContent = b.styleDef({
    position: "absolute",
    width: 150,
    height: 150,
    top: "50%",
    left: "50%",
    margin: "-75px 0 0 -75px",
    zIndex: zIndex.loader,
    backgroundImage: getResourceCssUrl(b.asset(loader_gif)),
});