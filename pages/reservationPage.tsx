import * as b from "bobril";
import { appStore } from "../data/appStore";
import { Page } from "../data/pageStore/types";

class ReservationPage extends b.Component {
  init() {
    appStore.pageStore.setPageInitialized(Page.Reservation);
  }
  render() {
    return <div />;
  }
}

export const reservationPage = b.component(ReservationPage);
