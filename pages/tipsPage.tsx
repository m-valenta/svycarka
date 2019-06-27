import * as b from "bobril";
import { appStore } from "../data/appStore";
import { Page } from "../data/pageStore/types";
import { contentSize, colors } from "../styleConstants";
import { t } from "bobril-g11n";

const contentStyle = b.styleDef({
  margin: "109px auto 0 auto"
});

const commonText = b.styleDef({
  textAlign: "center",
  fontSie: 16,
  marginBottom: 25
});

const headerText = b.styleDefEx(commonText, {
  fontSize: 30,
  marginBottom: 15
});

const subHeaderText = b.styleDefEx(commonText, {
  fontSize: 20,
  marginBottom: 5
});

const listStyle = b.styleDef({
  margin: 0,
  padding: 0,
  fontSize: 16,
  display: "inline-block"
});

const linkStyle = b.styleDef(
  {
    textDecoration: "none",
    cursor: "pointer",
    color: "black"
  },
  {
    hover: { color: colors.calendarSilver }
  }
);

class TipsPage extends b.Component {
  init() {
    appStore().pageStore.setPageInitialized(Page.Tips);
  }

  render() {
    return (
      <div style={[contentSize, contentStyle]}>
        <this.commonText>
          {t("The nearest food in Olešnice, 1.6 km from the cottage.")}
        </this.commonText>
        <this.commonText>
          {t(
            "Hospitality directly in Olešnice: Jurášek (350 m), U Anděla pub (1,7km), planned microbrewery (4km, direction Rzy), Deštné in O.h. - Restaurant Kozí chlívek (12km)"
          )}
        </this.commonText>
        <this.headerText>{t("Trip Tips / Sports Activities")}</this.headerText>
        <this.section header={t("Skiing")}>
          {[
            t("Kačenčina ski slope - Horská chata Juráška (350m)"),
            t("Ski Resort Hartman (2.3km)"),
            t("Ski Resort Olešnice in O.h. (3.0km)"),
            t("SkiSedloňov (6,4km)"),
            t("Ski center Deštné v Orlických horách (12,4km)"),
            t("Zieleniec Ski Arena (PL) (21.3km)"),
            t(
              "Ski slopes in Orlické Záhoří - Ski Resort Bedřichovka, Orlické Záhoří Jadrná, Orlické Záhoří Černá voda (Orlické Záhoří 26.3km)"
            ),
            t("Ski center Říčky v Orlických horách (31.9km)"),
            t(
              "The possibility to visit even more distant ski resorts in the Giant Mountains: Areál Buky (60.1km), SkiResort ČERNÁ HORA - PEC (67.3km), Malá Úpa (81.7km) SKI Pec pod Snezkou (75km)"
            )
          ]}
        </this.section>
        <this.section header={t("Cross-country skiing ")}>
          {[
            {
              text: t(
                "https://www.region-orlickehory.cz/aktivni-vyziti/bezkarske-stezky/"
              ),
              url:
                "https://www.region-orlickehory.cz/aktivni-vyziti/bezkarske-stezky/"
            },
            {
              text: t(
                "http://skimapa.cz/oblast/orlicke-hory - start of circuits from Olešnice crossroad (1.2km), or from Číhalka (1,7km)"
              ),
              url: "http://skimapa.cz/oblast/orlicke-hory"
            },
            t(
              "To the highest peak of the Orlické Mountains - from Deštné via Luisino Údolí, Velká Deštná (1115 meters above sea level), Šerlišské sedlo, Masaryk chateau, Šerlišský mlýn-back to Deštné, route length 18km (12.4km)"
            ),
            t(
              "Orlické záhoří - Illuminated cross-country skiing circuit (24.4km)"
            ),
            t(
              "On the mountain ridges Olešnice in the Orlické Mountains (Číhalka-1.7km) - Otružník - Vrchmezí - Šerlich (13km from the cottage), route 8km Olešnice v Orlických horách (Číhalka- 1.7km) - Ostružník - Vrchmezí - Šerlich - Šerlišský mlýn - Sedloňovský vrch - Olešnice v Orlických horách (crossroads 1.2km in the direction of náměstíčko), length of the route 16km (possibility to terminate the route at Masaryk Cottage and cross to Olešnice by bus)"
            )
          ]}
        </this.section>
        <this.section header={t("Cycling")}>
          {[
            t(
              "Possibility of using the cyclobus on the route Olešnice v Orlických horách (9:05) - Sedloňov (9:14) - Deštné (9:22) - Masarykova chata (9:35) valley back to Olešnice v Orl.horách"
            ),
            t(
              "The whole circuit: Olešnice v oh pezes Číhalka in Olešnice in O.h. - Zieleniec - Lasówka-Mostowice-Orlické Záhoří - Masaryk Chalet - Šerlišský Mill - Russian Valley - Olešnice in O.h. - Skutina Artillery Fortress in Sněžná - Ruské údolí - Olešnice v Oh, route length 12km, link: https://mapy.cz/s/368PL"
            ),
            t(
              "Circuit: Olešnice v Orl.horách, Číhalka - Zieleniec - Orlické Záhoří - Šerliššký Mill - Sedloňovský vrch - Olešnice v Orl.horách, Horní Olešnice crossroad"
            ),
            {
              text: t(
                "Circuit: Olešnice v Oh through Borova to Pekelske udoli-Lookout Tower Sendraz-Ruins of Frymburk-Rokole Castle - track length 34km, link: https://mapy.cz/s/368g1"
              ),
              url: "https://mapy.cz/s/368g1"
            },
            {
              text: t(
                "Circuit: Olesnice in O.h. through Číhalka in Olešnice in O.h. - Masarykova chata - Velká Deštná 1115 m.n. - Sedloňovský vrch to Olešnice in O.h., route 34km, link: https://mapy.cz/s/368zq"
              ),
              url: "https://mapy.cz/s/368zq"
            },
            {
              text: t(
                "Circuit: Olešnice in O.h. through Číhalka in Olešnice in O.h. - Masarykova chata - Velká Deštná 1115 m.n. further to Kunštátská chapel - Anenský vrch - fortress Hanička and back through Deštná in o.h-Sedloňov - Polom to Olešnice in O.h., track length 73km, link: https://mapy.cz/s/368r7"
              ),
              url: "https://mapy.cz/s/368r7"
            }
          ]}
        </this.section>
        <this.section header={t("Hiking ")}>
          {[
            t(
              "From Masaryk Cottage (17km away) either to Šerlišský Mill or to Velká Deštná 1115 meters above sea level "
            ),
            t("Panský kopec, 2.4km from the cottage "),
            t(
              "Jiráskova cesta - marked in red, coming to Olešnice from Náchod via Peklo and Nový Hrádek, from Olešnice rising through Ostružník to Vrchmezí, Šerlich and Velká Deštná and then winds through the entire length of the Orlické Mountains ridge to Jablonné nad Orlicí. Jiraskova cesta is 100 km long. "
            ),
            t("Rock town Hejšovina (Szczeliniec Wielki-PL), 28km away "),
            t(
              "Broumovská vrchovina - Ostaš - distance 35km, Teplické skály - 42km away, Adršpašské skály - 48km, Chapel of Our Lady of the Snow (Hvězda) with view of Broumovsko - 37km in Neratov, microbrewery, café (recommended), 36km away "
            ),
            t("Pstrążna, Kudowa-Zdrój - Łowisko Pstrąga (PL), 19km away "),
            t("Kudowa-Zdrój Spa, 14km away "),
            t(
              "Japanese Garden (Ogród Japoński-PL), 10km distance Náchod (19km), Nové Město nad Metují (17km), Ratibořice near Česká Skalice (33km) and Opočno (23km) "
            ),
            t("Dobrošov - Jiráskova chata and artillery fortress, 14km away "),
            t("Rozkoš Reservoir")
          ]}
        </this.section>
        <this.section header={t("More: ")}>
          {[
            {
              text:
                "https://www.region-orlickehory.cz/aktivni-vyziti/bezkarske-stezky/hrebenove-trate/",
              url:
                "https://www.region-orlickehory.cz/aktivni-vyziti/bezkarske-stezky/hrebenove-trate/"
            },
            {
              text: "https://www.vychodni-cechy.info/priroda/ ",
              url: "https://www.vychodni-cechy.info/priroda/ "
            },
            {
              text:
                "http://www.olesnice.net/volny-cas/sport/turisticke-stezky/",
              url: "http://www.olesnice.net/volny-cas/sport/turisticke-stezky/"
            }
          ]}
        </this.section>
      </div>
    );
  }

  commonText(data: { children: string }): b.IBobrilNode {
    return <div style={commonText}>{data.children}</div>;
  }

  headerText(data: { children: string }): b.IBobrilNode {
    return <div style={[commonText, headerText]}>{data.children}</div>;
  }

  section(data: {
    header: string;
    children: (string | { text: string; url: string })[];
  }): b.IBobrilNode {
    let children: b.IBobrilNode[] = [
      <div style={[commonText, subHeaderText]}>{data.header}</div>
    ];
    children = children.concat(
      data.children.map(child =>
        typeof child !== "object" ? (
          <div>{`• ${child}`}</div>
        ) : (
          <div>
            {" "}
            <a href={child.url} target="blank" style={linkStyle}>{`• ${
              child.text
            }`}</a>
          </div>
        )
      )
    );

    return <div style={commonText}>{children}</div>;
  }
}

export const tipsPage = b.component(TipsPage);
