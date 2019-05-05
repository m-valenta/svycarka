import * as b from "bobril";
import * as styles from "./styles";
import { contentOveride, buttonWrapper } from "../tipsSection/styles";
import { TextSection } from "../textSection/component";
import { t } from "bobril-g11n";
import { getResourceCssUrl } from "../../utils/resourceUtils";
import {
  wifi_svg,
  parking_svg,
  tv_svg,
  nodog_svg,
  nosmoke_svg
} from "../../src/assets";
import { Button } from "../button/buton";
import { colors } from "../../styleConstants";
import { buttonStyle } from "../button/styles";

export class RezervationSection extends b.Component {
  render() {
    return (
      <div style={styles.wrapper}>
        <div style={contentOveride}>
          <TextSection>
            {{
              header: t("How much?"),
              content: t(
                "Svýcarka is able to accommodate a group of 12 people, has 2 double rooms (one of them has an extra bed), 1 triple room and 1 quadruple. Features 1 bathroom with shower and 3 toilets throughout the property. The warmth of the electrically heated radiators warms you up or you can heat up in the main living room with wood. The shortest accommodation time is 2 nights."
              )
            }}
          </TextSection>
          <this.iconSet>
            <this.icon assetImg={b.asset(wifi_svg)} />
            <this.icon assetImg={b.asset(parking_svg)} />
            <this.icon assetImg={b.asset(tv_svg)} />
            <this.icon assetImg={b.asset(nodog_svg)} />
            <this.icon assetImg={b.asset(nosmoke_svg)} />
          </this.iconSet>
          <this.textBlock header={t("Week price")}>
            {[
              t("Winter season: 19 500Kč / for cottage (december - march)"),
              t("Summer season: 17 000Kč / for cottage (july - august)"),
              t("Out of seeson 19000 Kč / for cottage")
            ]}
          </this.textBlock>
          <this.textBlock header={t("Weekend price")}>
            {[t("Rezervace je možná pouze mimo sezónu: 8 000Kč / za chalupu")]}
          </this.textBlock>
          <this.textBlock
            header={t("New Year's Eve - we're still free")}
            specialInfo={t(
              "(As a bonus Christmas decor and a bottle of champagne)"
            )}
          >
            {[
              t(
                "44 500 Kč / per week including New Year's Eve and New Year's Eve"
              )
            ]}
          </this.textBlock>
          <this.textBlock
            header={t("Christmas")}
            specialInfo={t(
              "(As a bonus Christmas decor, candy, christmas tree and carp included)"
            )}
          >
            {[t("19 500 CZK / for Christmas holidays including Christmas Eve")]}
          </this.textBlock>
          <div style={[buttonWrapper, { paddingTop: 20 }]}>
            <Button
              colorScheme={colors.buttonYellow}
              text={t("Reservation")}
              onClick={() => alert("reservations")}
            />
          </div>
        </div>
      </div>
    );
  }

  protected iconSet(data: { children: b.IBobrilNode[] }): b.IBobrilNode {
    const children = data.children.slice();
    children.push(<div style={{ clear: "both" }} />);

    return (
      <div style={styles.iconSetWrapper}>
        <div style={styles.iconSetContent}>{children}</div>
      </div>
    );
  }

  protected icon(data: { assetImg: string }): b.IBobrilNode {
    return (
      <div
        style={[
          styles.icon,
          {
            backgroundImage: getResourceCssUrl(data.assetImg),
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
          }
        ]}
      />
    );
  }

  protected textBlock(data: {
    header: string;
    children: string[];
    specialInfo?: string;
  }): b.IBobrilNode {
    return (
      <div style={styles.textBlock}>
        <div style={styles.textHeader}>{data.header}</div>
        <div style={styles.textContent}>
          {data.children.map(c => (
            <div>{c}</div>
          ))}
        </div>
        <div style={styles.textSpecialContent}>{data.specialInfo}</div>
      </div>
    );
  }
}

export const rezervationSection = b.component(RezervationSection);
