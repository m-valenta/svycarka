import * as b from "bobril";
import { HeaderComponent } from "../components/header/headerComponent";
import { initAppStore, appStore } from "../data/appStore";
import { Page } from "../data/pageStore/types";
import { Contact } from "../components/contact/component";
import { CopyRight } from "../components/copyright/component";

export interface IDataWithActiveRouteHandler {
  activeRouteHandler: () => b.IBobrilNode;
}

class MastePage extends b.Component<IDataWithActiveRouteHandler> {
  render() {
    const children: b.IBobrilNode[] = [
      <HeaderComponent
        showTree={this.showTree}
        showReservation={this.showReservation}
      />,
      this.data.activeRouteHandler(),
      <Contact />,
      <CopyRight />
    ];

    return <div>{children}</div>;
  }

  protected get showTree(): boolean {
    return appStore().pageStore.forceShowTree || appStore().pageStore.currentPage !== Page.Home;
  }

  protected get showReservation(): boolean {
    return appStore().pageStore.currentPage !== Page.Reservation;
  }
}

export const masterPage = b.component(MastePage);
