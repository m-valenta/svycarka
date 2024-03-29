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
  nosmoke_svg,
} from "../../src/assets";
import { Button } from "../button/button";
import { colors } from "../../styleConstants";
import { appStore } from "../../data/appStore";
import { Page } from "../../data/pageStore/types";
import { getConfigValue } from "../../utils/localeUtils";

export class IconSet extends b.Component<{
  children: string[];
  increaseSize: Set<number>;
  useLowerMargin?: boolean;
}> {
  render() {
    const lastIndex = this.data.children.length - 1;
    const children = this.data.children.map((asset, index) => (
      <this.icon
        assetImg={asset}
        increaseSize={this.data.increaseSize.has(index)}
        isLast={index === lastIndex}
      />
    ));
    children.push(<div style={{ clear: "both" }} />);
    return (
      <div
        style={
          this.data.useLowerMargin
            ? styles.iconSetWrapperWithLowMargin
            : styles.iconSetWrapper
        }
      >
        <div style={styles.iconSetContent}>{children}</div>
      </div>
    );
  }

  private icon(data: {
    assetImg: string;
    increaseSize: boolean;
    isLast: boolean;
  }): b.IBobrilNode {
    const style = [
      styles.icon,
      {
        backgroundImage: getResourceCssUrl(data.assetImg),
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      },
    ];

    data.isLast && style.push(styles.iconLast);

    data.increaseSize && style.push(styles.increasedSizeIcon);

    return <div style={style} />;
  }
}

class TextBlock extends b.Component<{
  header: string;
  children: string[];
  specialInfo?: string;
  fontSize?: number;
}> {
  render(): b.IBobrilNode {
    let contentStyle: b.IBobrilStyle =
      this.data.fontSize !== undefined
        ? { fontSize: this.data.fontSize }
        : null;

    return (
      <div style={styles.textBlock}>
        <div style={styles.textHeader}>{this.data.header}</div>
        <div style={contentStyle}>
          {this.data.children.map((c) => (
            <div>{c}</div>
          ))}
        </div>
        <div style={styles.textSpecialContent}>{this.data.specialInfo}</div>
      </div>
    );
  }
}

export function ReservationIconSet(): b.IBobrilNode {
  const increaseSize: Set<number> = new Set();
  increaseSize.add(3);
  increaseSize.add(4);

  return (
    <IconSet increaseSize={increaseSize}>
      {[
        b.asset(wifi_svg),
        b.asset(parking_svg),
        b.asset(tv_svg),
        b.asset(nodog_svg),
        b.asset(nosmoke_svg),
      ]}
    </IconSet>
  );
}

export function PriceInfo(data: { fontSize?: number }): b.IBobrilNode {
  return (
    <>
      <TextBlock header={t("Week price")}>
        {[
          //t("Winter season: 19 500Kč / for cottage (december - march)"),
          //t("Summer season: 17 000Kč / for cottage (july - august)"),
          //t("Out of seeson 19000 Kč / for cottage")
          t(
            "Winter season: {value_0} Kč / for cottage (december - march)",
            getConfigValue("sezona_zima", "24 900")
          ),
          t(
            "Summer season: {value_0} Kč / for cottage (july - august)",
            getConfigValue("sezona_leto", "24 900")
          ),
          t(
            "Out of seeson {value_0} Kč / for cottage",
            getConfigValue("mimo_sezonu", "19 900")
          ),
        ]}
      </TextBlock>
      <TextBlock header={t("Weekend price")}>
        {[
          //t("Rezervace je možná pouze mimo sezónu: 8 000Kč / za chalupu")
          t(
            "Rezervace je možná pouze mimo sezónu: {value_0} Kč / za chalupu",
            getConfigValue("vikend", "9 900")
          ),
        ]}
      </TextBlock>
      <TextBlock
        header={t("Christmas")}
        specialInfo={t(
          "(As a bonus Christmas decor, candy, christmas tree and carp included)"
        )}
      >
        {[
          //t("19 500 CZK / for Christmas holidays including Christmas Eve")
          t(
            "{value_0} CZK / for Christmas holidays including Christmas Eve",
            getConfigValue("vanoce", "24 900")
          ),
        ]}
      </TextBlock>
      <TextBlock
        header={t("New Year's Eve - we're still free")}
        specialInfo={t(
          "(As a bonus Christmas decor and a bottle of champagne)"
        )}
      >
        {[
          //t("44 500 Kč / per week including New Year's Eve and New Year's Eve")
          t(
            "{value_0} Kč / per week including New Year's Eve and New Year's Eve",
            getConfigValue("silvestr", "54 900")
          ),
        ]}
      </TextBlock>
      <TextBlock header={t("Spring holiday")}>
        {[
          //t("22 900 Kč")
          t("spring: {value_0} Kč", getConfigValue("jarni_prazdniny", "24 900")),
        ]}
      </TextBlock>
      <TextBlock header={t("Easter")}>
        {[
          //t("16 000 Kč")
          t("easters: {value_0} Kč", getConfigValue("velikonoce", "19 900")),
        ]}
      </TextBlock>
    </>
  );
}

export class ReservationSection extends b.Component {
  render() {
    return (
      <div style={styles.wrapper}>
        <div style={contentOveride}>
          <TextSection>
            {{
              header: t("How much?"),
              content: t(
                "Svýcarka is able to accommodate a group of 12 people, has 2 double rooms (one of them has an extra bed), 1 triple room and 1 quadruple. Features 1 bathroom with shower and 3 toilets throughout the property. The warmth of the electrically heated radiators warms you up or you can heat up in the main living room with wood. The shortest accommodation time is 2 nights."
              ),
            }}
          </TextSection>
          <ReservationIconSet />
          <PriceInfo />
          <div style={[buttonWrapper, { paddingTop: 20 }]}>
            <Button
              colorScheme={colors.buttonYellow}
              text={t("Reservation")}
              onClick={() => appStore().pageStore.goToPage(Page.Reservation)}
            />
          </div>
        </div>
      </div>
    );
  }
}
