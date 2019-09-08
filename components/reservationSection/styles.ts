import * as b from "bobril";
import { getResourceCssUrl } from "../../utils/resourceUtils";
import { zakolik_background_png } from "../../src/assets";
import { colors } from "../../styleConstants";

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

export const increasedSizeIcon = b.styleDefEx(icon,
{
    width: 66,
    height: 66,
});

export const textBlock = b.styleDef({
  textAlign: "center",
  marginBottom: 20
});

export const textHeader = b.styleDef({
  fontWeight: "bold"
});

export const textSpecialContent = b.styleDef({
  fontSize: 12
});

export const formWrapper = b.styleDef({
  width: 700,
  margin: "10% auto"
});

export const formInputsWrapper = b.styleDef({
  width: 439,
  margin: "60px auto"
});

export const formInput = b.styleDef({
  width: "100%",
  height: 59,
  fontSize: 16,
  color: colors.calendarSilver,
  display: "block !important",
  margin: "0 0 26px 0 !important",
  padding: "0 !important",
  textAlign: "center"
});

export const formInputWithValue = b.styleDefEx(formInput, {
  color: "black"
});

export const formInputInvalid = b.styleDefEx([formInput, formInputWithValue], {
  border: `solid 1px ${colors.buttonRed}`,
  color: colors.buttonRed
});

export const spinnerWrapper = b.styleDef({
  marginBottom: 11
});

export const agreement = b.styleDef({
  margin: "0 auto",
  lineHeight: "16px",
  fontSize: 16,
  display: "inline-block"
});

export const agreementCheckbox = b.styleDef({
  width: 20,
  height: 20,
  marginRight: 15
});

export const agreementCheckboxInvalid = b.styleDefEx(agreementCheckbox, {
  border: `solid 1px ${colors.calendarRed}`
});

export const agreementCheckboxWrapper = b.styleDef({
  cssFloat: "left"
});

export const agreementTextWrapper = b.styleDef({
  cssFloat: "left",
  paddingTop: 5,
  height: 20,
  display: "inline-block",
  textAlign: "left"
});

export const agreementTextWrapperInvalid = b.styleDefEx(agreementTextWrapper, {
  color: colors.buttonRed
});

export const aggrementWrapper = b.styleDef({
  margin: "56px 0 44px 0"
});
