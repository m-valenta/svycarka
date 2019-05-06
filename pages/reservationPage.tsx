import * as b from "bobril";
import { appStore } from "../data/appStore";
import { Page } from "../data/pageStore/types";
import { contentSize, colors } from "../styleConstants";
import { TextSection } from "../components/textSection/component";
import { t } from "bobril-g11n";
import { DateInput } from "../components/dateInput/component";
import { Button } from "../components/button/buton";
import {
  PriceInfo,
  ReservationIconSet
} from "../components/reservationSection/component";

const contentStyle = b.styleDef({
  margin: "109px auto 0 auto",
  textAlign: "center"
});

const dateInputWrapper = b.styleDef({
  marginTop: 50,
  marginBottom: 50
});

const buttonWrapper = b.styleDef({
  marginBottom: 114
});

const iconSetWrapper = b.styleDef({
  marginBottom: 50
});

const textBlockInternal = b.styleDef({
  fontSize: 16,
  marginBottom: 57
});

const textBlockLowerInternal = b.styleDef({
  fontSize: 16,
  marginBottom: 20
});

class ReservationPage extends b.Component {
  init() {
    appStore.pageStore.setPageInitialized(Page.Reservation);
  }
  render() {
    return (
      <div style={[contentSize, contentStyle]}>
        <TextSection>
          {{
            header: t("Reservation"),
            content: [
              t(
                "Cottage Švýcarka can be rented only as a whole object, just fill in the date of arrival and departure, and we will take care of everything else."
              )
            ]
          }}
        </TextSection>
        <div style={dateInputWrapper}>
          <DateInput store={appStore.reservationStore} />
        </div>
        <div style={buttonWrapper}>
          <Button
            text={t("Reserve date")}
            onClick={() => alert("Reserve")}
            colorScheme={colors.buttonYellow}
          />
        </div>
        <TextSection>
          {{
            header: t("You need to know"),
            content: [
              t(
                "The price for renting a Swiss cottage varies according to the length of stay and the current season. The shortest stay is 2 nights. When renting a cottage for the whole week you have a discounted price."
              )
            ]
          }}
        </TextSection>
        <PriceInfo fontSize={16} />
        <div style={textBlockInternal}>
          {t(
            "Upon arrival you will be charged a resort fee of 10 CZK / person per day and a refundable deposit of 4 000 CZK, which will be refunded on your departure day."
          )}
        </div>
        <div style={iconSetWrapper}>
          <ReservationIconSet />
        </div>
        <div style={textBlockLowerInternal}>
          {t(
            "The price includes water, bedding, parking, WIFI and TV. The price does not include electricity consumption (will be charged on the day of departure according to the price list), firewood (you will be charged on the day of departure), the basic kitchen detergents, bathroom and toilet paper."
          )}
        </div>
        <div style={textBlockLowerInternal}>
          {t(
            "Arrival at the cottage for a week's stay is always on Saturdays between 2 pm and 4 pm End of stay on the following Saturday, with the evacuation of the cottage till 10 am. In case of a shorter stay, departure and arrival are by appointment."
          )}
        </div>
        <div style={textBlockLowerInternal}>
          {t(
            "When handing over the cottage, we ask you to clean it. Everything needs to be put into the condition in which the cottage was on your arrival. If not, you will be charged a cleaning fee of CZK 700."
          )}
        </div>
        <div style={textBlockLowerInternal}>
          {t(
            "Smoking is strictly forbidden throughout the cottage and please leave your four-legged furry friends at home. Thank you in advance for your understanding."
          )}
        </div>
      </div>
    );
  }
}

export const reservationPage = b.component(ReservationPage);
