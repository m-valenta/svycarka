import * as b from "bobril";
import { contentSize, colors } from "../../styleConstants";

const contentStyle = b.styleDefEx(contentSize, {
  marginLeft: "auto",
  marginRight: "auto"
});

const content = [contentSize, contentStyle];

const headerTextStyle = b.styleDefEx(content, {
  textAlign: "center",
  fontSize: 30,
  margin: "0 auto 50px auto"
});

const descriptionTextStyle = b.styleDefEx(content, {
  textAlign: "center",
  fontSize: 16
});

const gallerySliderStyle = b.styleDefEx(content, {
  marginBottom: 55
});


export const wrapper = b.styleDef({
  marginTop: 109,
  marginBottom: 109
});

export const header = [content, headerTextStyle];

export const descrition = [content, descriptionTextStyle];

export const hashtag = b.styleDef({
  color: colors.buttonYellow
});

export const galleryWrapper = b.styleDef({
  paddingBottom: "40%",
  marginBottom: 64
});

export const gallerySlider = [content, gallerySliderStyle];

export const svgStyle = b.styleDef({
  margin: "0 auto"
});