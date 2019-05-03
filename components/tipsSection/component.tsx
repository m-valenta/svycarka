import * as b from "bobril";
import { TextSection } from "../textSection/component";
import * as styles from "./styles";
import { t } from "bobril-g11n";
import { colors } from "../../styleConstants";
import { Button } from "../button/buton";

export class TipsSection extends b.Component {
  render() {
    return (
      <div style={styles.wrapperOveride}>
        <div style={styles.contentOveride}>
          <TextSection>
            {{
              header: "Proč právě k nám",
              content: [
                t(
                  "The Švýcarka offers not only a quiet environment, but also the possibility of an active holiday. Would you like to visit nearby places of interest? Here we have recommendations that have reasonable range and are tested directly by the owner of Švýcarka. If you wish, we are able to arrange excellent meat from the organic farm or beer from the brewery."
                )
              ]
            }}
          </TextSection>
          <div style={styles.buttonWrapper}>
            <div>
              <Button
                colorScheme={colors.buttonYellow}
                text={t("More informations")}
                onClick={() => alert("TIPS")}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export const tips = b.component(TipsSection);
