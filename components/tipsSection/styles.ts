import * as b from "bobril";
import { contentWrapper, contentSize } from "../../styleConstants";
import { wrapper, content } from "../contact/styles";

const contentOverideStyle = b.styleDefEx(content, {
  padding: "109px 0 109px 0",
  boxSizing: "border-box"
});

export const contentOveride = [content, contentOverideStyle];

export const wrapperOveride = [wrapper];

const buttonWraperStyle = b.styleDefEx(contentWrapper, {
  marginTop: 27,
  textAlign: "center"
});

export const buttonWrapper = [contentWrapper, buttonWraperStyle];
