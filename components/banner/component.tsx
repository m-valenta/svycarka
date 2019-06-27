import * as b from "bobril";
import * as styles from "./styles";
import { t } from "bobril-g11n";
import { scrollToWrapper } from "../scrollToWrapper/utils";

export class Banner extends b.Component {
  render() {
    return (
      <div style={styles.wrapper}>
        <div style={styles.logo} />
        <div style={styles.textWrapper}>
          <div style={styles.textContent}>
            {t(
              "Chalupa Švýcarka is located in the border village of Olešnice in the Orlické Mountains. We recognized her as an impoverished old lady who charmed us mainly with the surrounding nature and a certain genius loci. We would like you to discover her magic. That is why we have gradually reconstructed it and in 2018 opened the door to the first visitors. We will be glad when you visit us and feel the magic of it."
            )}
          </div>
        </div>
        <div style={styles.arrow} onClick={this.scrollToTips}/>
      </div>
    );
  }

  @b.bind
  private scrollToTips(): boolean {
    scrollToWrapper("tips");
    return true;
  }
}
