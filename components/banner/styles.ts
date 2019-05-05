import * as b from "bobril";
import { getResourceCssUrl } from "../../utils/resourceUtils";
import { banner_jpg, bannerArrow_svg } from "../../src/assets";

export const wrapper = b.styleDef({
  backgroundImage: getResourceCssUrl(b.asset(banner_jpg)),
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundAttachment: "fixed",
  backgroundPosition: "center",
  paddingBottom: "68.75%",
  position: "relative"
});

export const arrow = b.styleDef({
  backgroundImage: getResourceCssUrl(b.asset(bannerArrow_svg)),
  backgroundSize: "cover",
  width: 47.77,
  height: 21.18,
  position: "absolute",
  bottom: "9.4%",
  left: "50%",
  marginLeft: -23.89,
  transform: "rotate(180deg)"
});

export const textWrapper = b.styleDef({
  color: "white",
  position: "absolute",
  bottom: "17.57%"
});

export const textContent = b.styleDef({
  textAlign: "center",
  width: "48.54%",
  margin: "0 auto"
});
