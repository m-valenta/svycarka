import * as b from "bobril";
import { t } from "bobril-g11n";
import * as styles from "./styles";
import { colors } from "../../styleConstants";

export class Gallery extends b.Component {
  render() {
    return (
      <div style={styles.wrapper}>
        <div style={styles.header}>{t("Take a look at us")}</div>
        <this.gallery />
        <this.gallerySlider />
        <div style={styles.descrition}>
          {[
            <div>{t("See photos to see if you like us.")}</div>,
            <div>
              {t(
                "If you missed some of the hilarious corners in our album, we will be happy"
              )}
            </div>,
            <div>
              {[
                t("if you add it to facebook or instagram under hastagem"),
                <span style={styles.hashtag}>#svycarka.com</span>
              ]}
            </div>
          ]}
        </div>
      </div>
    );
  }

  // TODO separate component
  protected gallery(): b.IBobrilNode {
    return (
      <div
        style={[
          styles.galleryWrapper,
          {
            fontSize: 30,
            color: colors.calendarSilver,
            position: "relative"
          }
        ]}
      >
        <div
          style={{
            position: "absolute",
            width: "100%",
            top: "50%",
            marginTop: -15,
            textAlign: "center"
          }}
        >
          Under construction
        </div>
      </div>
    );
  }

  // TODO separate component
  protected gallerySlider(): b.IBobrilNode {
    return (
      <div
        style={[
          styles.gallerySlider,
          {
            height: 20
          }
        ]}
      />
    );
  }
}
