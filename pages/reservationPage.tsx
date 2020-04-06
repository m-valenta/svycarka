import * as b from "bobril";
import { appStore } from "../data/appStore";
import { Page, IPageStore } from "../data/pageStore/types";
import { contentSize, colors } from "../styleConstants";
import { TextSection } from "../components/textSection/component";
import { t } from "bobril-g11n";
import { DateInput } from "../components/dateInput/component";
import { Button } from "../components/button/buton";
import {
  PriceInfo,
  ReservationIconSet,
} from "../components/reservationSection/component";
import {
  ReservationFormState,
  IReservationStore,
} from "../data/reservation/types";
import { Modal } from "../components/modal/component";
import { ReservationForm } from "../components/reservationSection/formComponent";
import { FinalizedReservation } from "../components/reservationSection/finalizedComponent";

const styles = {
  contentStyle: b.styleDef({
    margin: "109px auto 0 auto",
    textAlign: "center",
  }),
  dateInputWrapper: b.styleDef({
    marginTop: 50,
    marginBottom: 50,
  }),
  buttonWrapper: b.styleDef({
    marginBottom: 114,
  }),
  iconSetWrapper: b.styleDef({
    marginBottom: 50,
  }),
  textBlockInternal: b.styleDef({
    fontSize: 16,
    marginBottom: 57,
  }),
  textBlockLowerInternal: b.styleDef({
    fontSize: 16,
    marginBottom: 20,
  }),
};

class ReservationPage extends b.Component {
  readonly pageStore: IPageStore = appStore().pageStore;
  readonly reservationStore: IReservationStore = appStore().reservationStore;
  init() {
    this.pageStore.setPageInitialized(Page.Reservation);
  }
  render() {
    return (
      <div style={[contentSize, styles.contentStyle]}>
        <TextSection>
          {{
            header: t("Reservation"),
            content: [
              t(
                "Cottage Švýcarka can be rented only as a whole object, just fill in the date of arrival and departure, and we will take care of everything else."
              ),
            ],
          }}
        </TextSection>
        <div style={styles.dateInputWrapper}>
          <DateInput store={this.reservationStore} />
        </div>
        <div style={styles.buttonWrapper}>
          <Button
            text={t("Reserve date")}
            onClick={() =>
              (this.reservationStore.reservationFormState =
                ReservationFormState.visible)
            }
            colorScheme={colors.buttonYellow}
          />
        </div>
        <TextSection>
          {{
            header: t("You need to know"),
            content: [
              t(
                "The price for renting a Swiss cottage varies according to the length of stay and the current season. The shortest stay is 2 nights. When renting a cottage for the whole week you have a discounted price."
              ),
            ],
          }}
        </TextSection>
        <PriceInfo fontSize={16} />
        <div style={styles.textBlockInternal}>
          {t(
            "Upon arrival you will be charged a resort fee of 10 CZK / person per day and a refundable deposit of 4 000 CZK, which will be refunded on your departure day."
          )}
        </div>
        <div style={styles.iconSetWrapper}>
          <ReservationIconSet />
        </div>
        <div style={styles.textBlockLowerInternal}>
          {t(
            "The price includes water, bedding, parking, WIFI and TV. The price does not include electricity consumption (will be charged on the day of departure according to the price list), firewood (you will be charged on the day of departure), the basic kitchen detergents, bathroom and toilet paper."
          )}
        </div>
        <div style={styles.textBlockLowerInternal}>
          {t(
            "Arrival at the cottage for a week's stay is always on Saturdays between 2 pm and 4 pm End of stay on the following Saturday, with the evacuation of the cottage till 10 am. In case of a shorter stay, departure and arrival are by appointment."
          )}
        </div>
        <div style={styles.textBlockLowerInternal}>
          {t(
            "When handing over the cottage, we ask you to clean it. Everything needs to be put into the condition in which the cottage was on your arrival. If not, you will be charged a cleaning fee of CZK 700."
          )}
        </div>
        <div
          style={[
            styles.textBlockLowerInternal,
            {
              marginBottom: 109,
            },
          ]}
        >
          {t(
            "Smoking is strictly forbidden throughout the cottage and please leave your four-legged furry friends at home. Thank you in advance for your understanding."
          )}
        </div>
        {this.reservationStore.reservationFormState ===
        ReservationFormState.visible ? (
          <Modal
            close={() => {
              this.reservationStore.reservationFormState =
                ReservationFormState.hidden;
            }}
          >
            {<ReservationForm store={this.reservationStore} />}
          </Modal>
        ) : this.reservationStore.reservationFormState ===
          ReservationFormState.finalized ? (
          <Modal
            close={() => {
              this.reservationStore.clear();
              this.reservationStore.reservationFormState =
                ReservationFormState.hidden;
            }}
          >
            <FinalizedReservation />
          </Modal>
        ) : (
          <></>
        )}
      </div>
    );
  }

  postInitDom() {
    this.pageStore.setPageRendered(Page.Reservation);
  }
}

export const reservationPage = b.component(ReservationPage);
