import * as b from "bobril";
import { t } from "bobril-g11n";
import { colors } from "../../styleConstants";
import * as styles from "./styles";

export class FinalizedReservation extends b.Component {
  render() {
    return (
      <div style={styles.formWrapper}>
        <p>
          {t(
            "O průběhu vaší rezervace a dalších důležitých informací vás budeme informovat e-mailem."
          )}
        </p>
      </div>
    );
  }
}
