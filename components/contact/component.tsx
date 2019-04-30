import * as b from "bobril";
import * as styles from "./styles";
import { contacsBackgrounds } from "../../styleConstants";

export class Contact extends b.Component {
  render() {
    return (
      <div style={styles.wrapper}>
        <div style={styles.content}>
          <div style={styles.contactContent}>
            <div style={styles.kubaFoto} />
            <div style={styles.contaInfo}>
              <ContactItem
                href="tel:+420720630136"
                imgBackground={contacsBackgrounds.phone}
                text="info@svycarka.com"
              />
              <ContactItem
                href="mailto:info@svycarka.com"
                imgBackground={contacsBackgrounds.email}
                text="+420 720 630 136"
                linkMarginTopCorrection={-3}
              />
            </div>
            <div style={{ clear: "both" }} />
          </div>
        </div>
      </div>
    );
  }
}

export class ContactItem extends b.Component<{
  imgBackground: b.IBobrilStyle;
  href: string;
  text: string;
  linkMarginTopCorrection?: number;
}> {
  render() {
    const linkStyles: b.IBobrilStyle[] = [styles.contactItemLink];
    this.data.linkMarginTopCorrection !== undefined &&
      linkStyles.push({
        marginTop: this.data.linkMarginTopCorrection
      });

    return (
      <div style={styles.contentItem}>
        <div style={[this.data.imgBackground, { cssFloat: "left" }]} />
        <a href={this.data.href} style={linkStyles}>
          {this.data.text}
        </a>
        <div style={{ clear: "both" }} />
      </div>
    );
  }
}

export const contact = b.component(Contact);
