import * as b from "bobril";
import { getResourceCssUrl } from "../../utils/resourceUtils";
import { zakolik_background_png } from "../../src/assets";

export const wrapper = b.styleDef({
  backgroundImage: getResourceCssUrl(b.asset(zakolik_background_png)),
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover"
});

export const iconSetWrapper = b.styleDef({
  marginTop: 7,
  marginBottom: 70,
  textAlign: "center"
});

export const iconSetContent = b.styleDef({
  display: "inline-block"
});

export const icon = b.styleDef(
  {
    width: 60,
    height: 60,
    marginRight: 60,
    cssFloat: "left"
  },
  {
    lastChild: { marginRight: 0 }
  }
);

export const textBlock = b.styleDef({
  textAlign: "center",
  marginBottom: 20
});

export const textHeader = b.styleDef({
  fontSize: 16
});

export const textContent = b.styleDef({
  fontSize: 12
});

export const textSpecialContent = b.styleDef({
  fontSize: 10
});
