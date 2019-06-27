import * as b from "bobril";
import { Banner } from "../components/banner/component";
import { TipsSection } from "../components/tipsSection/component";
import { ReservationSection } from "../components/reservationSection/component";
import { MapSection } from "../components/mapSection/component";
import { appStore } from "../data/appStore";
import { Page } from "../data/pageStore/types";
import { Gallery } from "../components/gallery/component";
import { ScrollToWrapper } from "../components/scrollToWrapper/component";

class HomePage extends b.Component {
  init() {
    appStore().pageStore.setPageInitialized(Page.Home);
  }
  render() {
    return (
      <div>
        <Banner />
        <ScrollToWrapper id="tips"><TipsSection /></ScrollToWrapper>
        <Gallery />
        <ReservationSection />
        <MapSection />
      </div>
    );
  }
}

export const homePage = b.component(HomePage);
