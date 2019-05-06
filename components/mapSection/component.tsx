import * as b from "bobril";
import { t } from "bobril-g11n";
import * as styles from "./styles";
import { contentWrapper } from "../../styleConstants";

export class MapSection extends b.Component {
  render() {
    const mapHeight = b.getMedia().width * 0.37;
    return (
      <div style={styles.wrapper}>
        <div style={[contentWrapper, styles.header]}>
          {t("Where to find us")}
        </div>
        <iframe
          src="https://api.mapy.cz/frame?params=%7B%22x%22%3A16.331438064575195%2C%22y%22%3A50.374595642089844%2C%22base%22%3A%222%22%2C%22layers%22%3A%5B7%5D%2C%22zoom%22%3A16%2C%22url%22%3A%22https%3A%2F%2Fmapy.cz%2Fs%2F3rzd6%22%2C%22mark%22%3A%7B%22x%22%3A%2216.331438064575195%22%2C%22y%22%3A%2250.374595642089844%22%2C%22title%22%3A%22Chalupa%20%C5%A0V%C3%9DCARKA%22%7D%2C%22overview%22%3Atrue%7D&amp;width=100&amp;height=280&amp;lang=cs"
          frameBorder="0"
          style={[
            styles.mapIframeStyle,
            {
              height: mapHeight
            }
          ]}
        />
        <div style={styles.footer}>
          Olešnice v Orlických horách 82, 517 83 Olešnice v Orlických horách.
        </div>
      </div>
    );
  }
}
