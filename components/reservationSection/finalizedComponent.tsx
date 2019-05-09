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
            "For the successful completion of the reservation, it is necessary to pay a deposit (ie half the rental price), transfer to our account:"
          )}
          <span style={{ color: colors.buttonRed }}>123 456 789/0000</span>
        </p>
        <p>
          {t(
            "O průběhu vaší rezervace a dalších důležitých informací vás budeme informovat e-mailem."
          )}
        </p>
      </div>
    );
  }
}
