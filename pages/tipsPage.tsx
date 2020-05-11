import * as b from "bobril";
import { appStore } from "../data/appStore";
import { Page, IPageStore } from "../data/pageStore/types";
import { contentSize, colors } from "../styleConstants";
import { t } from "bobril-g11n";
import { addLineBreaks } from "../utils/textUtils";

const styles = {
  contentStyle: b.styleDef({
    margin: "109px auto 0 auto",
  }),
  commonText: b.styleDef({
    textAlign: "center",
    fontSize: 16,
    marginBottom: 25,
  }),
  commonTextBoldPrefix: {
    fontWeight: "bold",
  },
  headerText: b.styleDefEx(this.commonText, {
    fontSize: 30,
    marginBottom: 15,
  }),
  subHeaderText: b.styleDefEx(this.commonText, {
    fontSize: 20,
    marginBottom: 5,
  }),
  listStyle: b.styleDef({
    margin: 0,
    padding: 0,
    fontSize: 16,
    display: "inline-block",
  }),
  linkStyle: b.styleDef(
    {
      textDecoration: "none",
      cursor: "pointer",
      color: "black",
    },
    {
      hover: { color: colors.calendarSilver },
    }
  ),
};

class TipsPage extends b.Component {
  readonly pageStore: IPageStore = appStore().pageStore;

  init() {
    this.pageStore.setPageInitialized(Page.Tips);
  }

  render() {
    return (
      <div style={[contentSize, styles.contentStyle]}>
        <this.commonText>
          {t("The nearest food in Olešnice, 1.6 km from the cottage.")}
        </this.commonText>
        <this.commonText boldPrefix={t("Restaurants and pubs: ")}>
          {t(
            "Jurášek (350 m), U Anděla pub (1,7km), planned microbrewery (4km, direction Rzy), Deštné in O.h. - Restaurant Kozí chlívek (12km)"
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
              `Ski slopes in Orlické Záhoří - Ski Resort Bedřichovka, Orlické Záhoří Jadrná,@br@Orlické Záhoří Černá voda (Orlické Záhoří 26.3km)`
            ),
            t("Ski center Říčky v Orlických horách (31.9km)")
          ]}
        </this.section>
        <this.section header={t("Cross-country skiing ")}>
          {[
            t("Knížecí cesta - access to the track possible from Olešnice rozcestí (1.2 km from@br@the cottage) or from Číhalka (1.7 km from the cottage)"),
            {
              text: t("To the highest peak of the Orlické Mountains - from Deštná in O. h. Via Luisino Údolí - Velká Deštná (1,115 m above sea level) - Šerlišské sedlo - Masaryk's cottage - Šerlišský mlýn and back to Deštná in O. h., Route length 18 km (distance from the cottage 12,4 km)"),
              url: "https://mapy.cz/turisticka?planovani-trasy&x=16.3818075&y=50.3169199&z=12&rc=9l1bsxZITLl7YadBhoGkLVeFBxZOOpAFgs038Rg94dIyxZITL&rs=muni&rs=base&rs=base&rs=area&rs=base&rs=base&rs=muni&ri=2647&ri=1697644&ri=2026473&ri=21508&ri=2234749&ri=2214420&ri=2647&mrp=%7B%22c%22%3A141%7D&xc=%5B%22CZE%22%2C%22POL%22%5D"
            },
            {
              text: t("Orlické Záhoří - Illuminated cross-country ski circuit 5 km long (distance from the cottage 24.4 km)"),
              url: "http://www.orlickezahori.eu/"
            },
            {
              text: t("Along the ridges - start of the route from Číhalka (1.7 km away from the cottage) - Ostružník - Šerlich - Šerlišský mlýn - Sedloňovský vrch - Horní Olešnice crossroads (1.2 km from the cottage), length of the route 20 km (possibility to end the route in Masaryk cottage and go to Olešnice by bus"),
              url:"https://mapy.cz/turisticka?planovani-trasy&x=16.3369783&y=50.3611743&z=14&rc=9laGIxZdBjR3bm2j.5xZQnTe6JfVQdzSjDeaEJxZcn5&rs=coor&rs=base&rs=base&rs=area&rs=coor&rs=base&ri=&ri=2009553&ri=2025042&ri=21697&ri=&ri=1987591&mrp=%7B%22c%22%3A141%7D&xc=%5B%22CZE%22%2C%22POL%22%5D"
            },
            {
              text: t("Current state of cross-country trails"),
              url: "http://skimapa.cz/oblast/orlicke-hory"
            }
          ]}
        </this.section>
        <this.section header={t("Cycling")}>
          {[
            t("Relaxation route - from Masaryk's cottage to Sedloňovský vrch or Ruské údolí to Olešnice in O. h. (Cycle bus on the route Olešnice in Orlické hory - Sedloňov - Deštné - Masaryk's cottage), approx. 12 km"),
            {
              text: t("Trasa po československém opevnění – Olešnice v O. h. – Dělostřelecká tvrz Skutina ve Sněžném – Stenka – Ruské údolí – Olešnice v Oh, délka trasy 12 km"),
              url: "https://mapy.cz/zakladni?planovani-trasy&x=16.2991847&y=50.3621727&z=14&rc=9lYBhxZdqfa3n19cjN654B5lggSmfWcjeH&rs=addr&rs=base&rs=base&rs=base&rs=addr&ri=10999760&ri=1721023&ri=2022885&ri=2096741&ri=10999760&mrp=%7B%22c%22%3A121%7D&xc=%5B%5D"
            },
            {
              text: t("Sightseeing route - from the cottage around Číhalka - Knížecí cesta (red cycle route 4071) - Rozc. Knížecí and Polomské - Pod Sedloňovským vrchem - Údolí Bělé - Polomský kopec - Spring Bělé - Vrchmezí - Ostružník - Nad Olešnicí, viewpoint, route length 19 km"),
              url: "https://mapy.cz/turisticka?planovani-trasy&x=16.3216831&y=50.3741150&z=14&rc=9lYCCxZdr4j0XZ6hgngvzbsKxZW8EhESepe5pteGSgOEiFRggVhgXesfhkzcrPlCU&rs=firm&rs=addr&rs=coor&rs=coor&rs=coor&rs=coor&rs=base&rs=base&rs=base&rs=firm&ri=13193293&ri=10999661&ri=&ri=&ri=&ri=&ri=1993259&ri=2026323&ri=2009553&ri=13193293&mrp=%7B%22c%22%3A121%7D&xc=%5B%22CZE%22%2C%22POL%22%5D"
            },
            {
              text: t("Route to Pekla - Olešnice in O. h. Via Borová - Pekelské údolí - Sendráž Lookout Tower - Frymburk Castle Ruins - Rokole - route length 35 km"),
              url: "https://mapy.cz/zakladni?planovani-trasy&x=16.2380515&y=50.3902527&z=15&rc=9lYB.xZdqo9lB8VhexiX-3gektUb-8gUVdIZkF9iwO9lYCBlHd&rs=addr&rs=stre&rs=base&rs=base&rs=area&rs=ward&rs=addr&ri=10999760&ri=106132&ri=1893530&ri=1701530&ri=12047&ri=7542&ri=10999760&mrp=%7B%22c%22%3A121%7D&xc=%5B%5D"
            },
            {
              text: t("Long circuit - from the cottage around Číhalka - Zieleniec - Lasówka - Mostowice - Orlické Záhoří - Masaryk cottage - Šerlišský mlýn - Sedloňovský vrch - Horní Olešnice crossroads, route length 47 km"),
              url: "https://mapy.cz/turisticka?planovani-trasy&x=16.4066327&y=50.3283040&z=12&rc=9lYCCxZdr4j0QYekgYxZTlP9lpRPxZJELkMOxZ0OAeeNhf79lezdxZPGp38Rg943bCiYI15JxZcn5&rs=firm&rs=firm&rs=osm&rs=osm&rs=osm&rs=muni&rs=base&rs=base&rs=base&rs=base&ri=13193293&ri=13096073&ri=145228427&ri=721129&ri=443443&ri=2672&ri=2234749&ri=2214420&ri=2022927&ri=1987591&mrp=%7B%22c%22%3A121%7D&xc=%5B%22CZE%22%2C%22POL%22%5D"
            },
            {
              text: t("Route for able athletes - Olešnice in O. h. Through Číhalka - Masaryk cottage - Velká Deštná (1115 m asl) - Kunštát chapel - Anenský vrch - Hanička fortress - back through Deštná - Sedloňov - Polom - Olešnice in O. h., Length route 73 km"),
              url: "https://mapy.cz/zakladni?planovani-trasy&x=16.3351042&y=50.3204968&z=12&rc=9lYB.xZdqoj25YXhc3gxGjQ5xZPGh52cxZ4H59lolTxYtCS9lyzWxYiFcfcN1kI9l1bsxZITLaeQxZTf1fFwj7qi7xxZdqU&rs=addr&rs=base&rs=coor&rs=firm&rs=base&rs=base&rs=base&rs=base&rs=muni&rs=muni&rs=ward&rs=addr&ri=10999760&ri=1987592&ri=&ri=12970010&ri=2026473&ri=1890735&ri=2026474&ri=2062211&ri=2647&ri=2682&ri=9750&ri=10999760&mrp=%7B%22c%22%3A121%7D&xc=%5B%5D"
            }
          ]}
        </this.section>
        <this.section header={t("Hiking ")}>
          {[
            t("Panský kopec, 2.4 km from the cottage"),
            t("Lookout tower Feistův kopec, 2.8 km from the cottage"),
            t("Jirásek's path - follow the red tourist sign (it comes to Olešnice from Náchod via Peklo and Nový Hrádek, from Olešnice it rises via Ostružník to Vrchmezí, Šerlich and Velká Deštná and then winds over the entire length of the Orlické ridge to Jablonné nad Orlicí) the total length is 100 km"),
            t("Masarykova chata (17 km away) - trip to Šerlišský mlýn or Velká Deštná (possibility to use the bus)"),            
            t("Kudowa-Zdrój Spa, 14 km away"),
            t("Dobrošov - Jirásek's cottage and Hanička artillery fortress, distance 14 km"),
            t("Nové Město nad Metují Castle, distance 17 km"),
            t("Pstrążna, Kudowa-Zdrój - Łowisko Pstrąga (PL), distance 19 km"),            
            t("Japanese Garden (Ogród Japoński - PL), distance 19 km"),
            t("Water reservoir Rozkoš, distance 20 km"),
            t("Hejšovina Rock City (Szczeliniec Wielki-PL), 28 km away"),
            t("Broumov Highlands - Ostas - 35 km away"),
          ]}
        </this.section>
        <this.section header={t("More: ")}>
          {[
            {
              text: t("Village website"),
              url: "http://www.olesnice.net/volny-cas/sport/turisticke-stezky/",
            }
          ]}
        </this.section>
      </div>
    );
  }

  postInitDom() {
    this.pageStore.setPageRendered(Page.Tips);
  }

  commonText(data: { children: string; boldPrefix?: string }): b.IBobrilNode {
    return (
      <div style={styles.commonText}>
        {data.boldPrefix !== undefined ? (
          <span style={styles.commonTextBoldPrefix}>{data.boldPrefix}</span>
        ) : (
          <></>
        )}
        {data.children}
      </div>
    );
  }

  headerText(data: { children: string }): b.IBobrilNode {
    return (
      <div style={[styles.commonText, styles.headerText]}>{data.children}</div>
    );
  }

  section(data: {
    header: string;
    children: (string | { text: string; url: string })[];
  }): b.IBobrilNode {
    let children: b.IBobrilNode[] = [
      <div style={[styles.commonText, styles.subHeaderText]}>
        {data.header}
      </div>,
    ];
    children = children.concat(
      data.children.map((child) =>
        typeof child !== "object" ? (
          <div>• {addLineBreaks(child)}</div>
        ) : (
          <div>
            {" "}
            <a
              href={child.url}
              target="blank"
              style={styles.linkStyle}
            >• {addLineBreaks(child.text)}</a>
          </div>
        )
      )
    );

    return <div style={styles.commonText}>{children}</div>;
  }
}

export const tipsPage = b.component(TipsPage);
