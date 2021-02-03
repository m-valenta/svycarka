import * as b from "bobril";
import { colors } from "../styleConstants";

export const contentStyle = b.styleDef({
  margin: "109px auto 0 auto",
});

export const commonText = b.styleDef({
  textAlign: "center",
  fontSize: 16,
  marginBottom: 25,
});

export const commonTextBoldPrefix = {
  fontWeight: "bold",
};

export const headerText = b.styleDefEx(commonText, {
  fontSize: 30,
  marginBottom: 15,
});

export const subHeaderText = b.styleDefEx(commonText, {
  fontSize: 20,
  marginBottom: 5,
});

export const listStyle = b.styleDef({
  margin: 0,
  padding: 0,
  fontSize: 16,
  display: "inline-block",
});

export const linkStyle = b.styleDef(
  {
    textDecoration: "none",
    cursor: "pointer",
    color: "black",
  },
  {
    hover: { color: colors.calendarSilver },
  }
);
