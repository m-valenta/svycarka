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
  margin: "0 auto 55px auto"
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

/*
  a) Original photos has dimensions: 1800 x 1080 (60% height:width ratio)
  b) Gallery item takes 52.5% of overall width (50% page width + 105% width of parent item (50%))
  c) padding (eq. photos height) = 60% * 0,525
*/

export const galleryWrapper = b.styleDef({
  paddingBottom: "31.4%",
  marginBottom: 44
});

export const gallerySlider = [content, gallerySliderStyle];

export const svgStyle = b.styleDef({
  margin: "0 auto"
});