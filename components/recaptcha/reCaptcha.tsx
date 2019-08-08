/// <reference path="gReCaptcha.d.ts"/>
import * as b from "bobril";
import * as styles from "./style";

export var utils = {
  getResponse(): string {
    return grecaptcha.getResponse();
  },

  reset(): void {
    grecaptcha.reset();
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

  render(): b.IBobrilNode {
    const applicatedStyles = [styles.base];
    !this.data.isValid && applicatedStyles.push(styles.invalid);

    return (
      <div>
        <div id={this.captchaFieldId} style={applicatedStyles} />
      </div>
    );
  }

  postInitDom() {
    grecaptcha.render(document.getElementById(this.captchaFieldId), {
      sitekey: this.data.siteKey,
      theme: "light"
    });
  }
}

export default Captcha;