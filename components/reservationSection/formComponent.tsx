import * as b from "bobril";
import { IReservationStore, IFormItem } from "../../data/reservation/types";
import * as styles from "./styles";
import { TextSection } from "../textSection/component";
import { t } from "bobril-g11n";
import { DateInput } from "../dateInput/component";
import { observable } from "bobx";
import { Expander } from "../expander/component";
import { Spinner } from "../spinner/component";
import { appStore } from "../../data/appStore";
import { buttonWrapper } from "../tipsSection/styles";
import { colors, invalidItemStyle } from "../../styleConstants";
import { Button } from "../button/buton";
import Captcha, { utils } from "../recaptcha/reCaptcha";
import { gdprTransition } from "../../transitions";
import { Loader } from "../loader/loader";
export interface IData {
  store: IReservationStore;
}

export class ReservationForm extends b.Component<IData> {
  render(): b.IBobrilNode {
    const isValidBeforeRevalidate = this.data.store.test();

    return (
      <div style={styles.formWrapper}>
        <TextSection>
          {{
            header: t("Reservation form"),
            content: t(
              "All data must be filled in to complete the reservation."
            ),
          }}
        </TextSection>
        <DateInput store={this.data.store} />
        <div style={styles.formInputsWrapper}>
          <FormInput
            placeholder={t("Name and surname")}
            formItem={this.data.store.name}
            type="text"
          />
          <FormInput
            placeholder={t("Street, house number, city, postal code")}
            formItem={this.data.store.address}
            type="text"
          />
          <FormInput
            placeholder={t("Email")}
            formItem={this.data.store.email}
            type="email"
          />
          <FormInput
            placeholder={t("Phone")}
            formItem={this.data.store.phone}
            type="text"
          />
        </div>
        {/* <Expander
          headerText={t("I'm interested in additional services")}
          expandedWidth={440}
          expandedHeight={105}
        >
          <div>
            <div style={styles.spinnerWrapper}>
              <Spinner
                item={appStore().reservationStore.beer}
                text={t("Barrel of beer (including bar):")}
                explicitWidth={230}
              />
            </div>
            <div style={styles.spinnerWrapper}>
              <Spinner
                item={appStore().reservationStore.meat}
                text={t("Grill meat for:")}
                explicitWidth={230}
              />
            </div>
          </div>
        </Expander> */}
        <Captcha
          siteKey="6LfK768UAAAAAAjphbs9g6GErMGX3B7ZmYr9hk-R"
          isValid={this.data.store.gc_Response.isValid}
        />
        <div style={styles.aggrementWrapper}>
          <FormAgreement agreementItem={this.data.store.agreement} />
        </div>
        <div
          style={[
            buttonWrapper,
            isValidBeforeRevalidate ? { paddingTop: 20 } : { marginTop: -17 },
          ]}
        >
          {isValidBeforeRevalidate ? (
            b.withKey(<></>, "valInfoEmpty")
          ) : (
            <div key="valInfo" style={styles.validationInfoStyle}>
              {t("*Reservation form contains some validation errors.")}
            </div>
          )}
          <Button
            key="resBtn"
            colorScheme={colors.buttonRed}
            text={t("Reserve date")}
            onClick={() => {
              if (this.data.store.validate()) {
                this.data.store.storeReservation();
              }
            }}
          />
        </div>
      </div>
    );
  }
}

declare type InputType = "type" | "email" | "number" | "text";

class FormInput extends b.Component<{
  placeholder: string;
  formItem: IFormItem<string>;
  type: InputType;
}> {
  @observable
  protected focused: boolean = false;

  render() {
    const item = this.data.formItem;
    const style: b.IBobrilStyle[] = [styles.formInput];

    if (item.value !== undefined) {
      style.push(styles.formInputWithValue);
    }

    if (!item.isValid) {
      style.push(invalidItemStyle);
    }

    return (
      <input
        type={this.data.type}
        style={style}
        value={item.value}
        placeholder={this.data.placeholder}
        onChange={(value: string) => {
          item.value = value;
        }}
      />
    );
  }
}

class FormAgreement extends b.Component<{
  agreementItem: IFormItem<boolean>;
}> {
  render() {
    const checkboxStyle: b.IBobrilStyle[] = [styles.agreementCheckbox];
    const textStyle: b.IBobrilStyle[] = [styles.agreementTextWrapper];
    if (!this.data.agreementItem.isValid) {
      checkboxStyle.push(invalidItemStyle);
      textStyle.push(styles.agreementTextWrapperInvalid);
    }

    return (
      <div style={styles.agreement}>
        <div style={styles.agreementCheckboxWrapper}>
          <input
            style={checkboxStyle}
            type="checkbox"
            checked={this.data.agreementItem.value}
            onChange={(value: boolean) =>
              (this.data.agreementItem.value = value)
            }
          />
        </div>
        <div style={textStyle}>
          {t("I agree to process my personal data in accordance with ")}
          <GdprLink />
          {"."}
        </div>
        <div style={{ clear: "both" }} />
      </div>
    );
  }
}

class GdprLink extends b.Component<{}> {
  render() {
    return <span style={styles.linkStyle}>{t("GDPR")}</span>;
  }
  onClick() {
    b.runTransition(gdprTransition);
  }
}
