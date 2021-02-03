import * as b from "bobril";
import { TextSection } from "../textSection/component";
import * as styles from "./styles";
import { t } from "bobril-g11n";
import { colors } from "../../styleConstants";
import { Button } from "../button/button";
import { appStore } from "../../data/appStore";
import { Page } from "../../data/pageStore/types";
import { addLineBreaks } from "../../utils/textUtils";

export class TipsSection extends b.Component {
  render() {
    return (
      <div style={styles.wrapperOveride}>
        <div style={styles.contentOveride}>
          <TextSection>
            {{
              header: t("Why to visit"),
              content: addLineBreaks(
                t(
                  "The Švýcarka offers not only a quiet environment, but also the possibility of an active holiday.@br@Would you like to visit nearby places of interest? Here we have recommendations that have reasonable range and are tested directly by the owner of Švýcarka. If you wish, we are able to arrange excellent meat from the organic farm or beer from the brewery."
                )
              )
            }}
          </TextSection>
          <div style={styles.buttonWrapper}>
            <Button
              colorScheme={colors.buttonYellow}
              text={t("More informations")}
              onClick={() => appStore().pageStore.goToPage(Page.Tips)}
            />
          </div>
        </div>
      </div>
    );
  }
}
