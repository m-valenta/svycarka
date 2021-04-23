/// <reference path="gReCaptcha.d.ts"/>
import * as b from "bobril";
import * as styles from "./style";
import { IReservationStore } from "../../data/reservation/types";
import { appStore } from "../../data/appStore";
import { invalidItemStyle } from "../../styleConstants";

export var utils = {
  getResponse(): string {
    return grecaptcha.getResponse();
  },

  reset(): void {
    try {
      grecaptcha?.reset();
    } catch (Error) {}
  },

  isLoaded(): boolean {
    return grecaptcha !== undefined;
  }
};

export interface IReCaptchaData {
  siteKey: string;
  isValid: boolean;
}

export function CaptchaScript(): b.IBobrilNode {
  return (
    <script
      src="https://www.google.com/recaptcha/api.js?render=explicit"
      //src="https://www.google.com/recaptcha/api.js?onload=initCaptcha&render=explicit"
      async
      defer
    />
  );
}

export class Captcha extends b.Component<IReCaptchaData> {
  captchaFieldId = "#gc_field";

  store: IReservationStore = appStore().reservationStore;

  render(): b.IBobrilNode {
    const usedStyles = [styles.base];
    !this.store.gc_Response.isValid && usedStyles.push(invalidItemStyle);

    return (
      <div>
        <div id={this.captchaFieldId} style={usedStyles} />
      </div>
    );
  }

  postInitDom() {
    let captchaElement = document.getElementById(this.captchaFieldId);
    if(captchaElement == null)
      return;

    grecaptcha.render(captchaElement, {
      sitekey: this.data.siteKey,
      theme: "light",
      callback: response => (this.store.gc_Response.value = response)
    });
  }
}

export default Captcha;
