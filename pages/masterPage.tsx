import * as b from "bobril";
import { HeaderComponent } from "../components/header/headerComponent";
import { initAppStore, appStore, IAppStore } from "../data/appStore";
import { Page } from "../data/pageStore/types";
import { Contact } from "../components/contact/component";
import { CopyRight } from "../components/copyright/component";
import { ScrollToWrapper } from "../components/scrollToWrapper/component";

export interface IDataWithActiveRouteHandler {
  activeRouteHandler: () => b.IBobrilNode;
}

class MastePage extends b.Component<IDataWithActiveRouteHandler> {
  private readonly store: IAppStore = appStore();

  render() {
    const children: b.IBobrilNode[] = [
      <HeaderComponent
        showTree={this.showTree}
        showReservation={this.showReservation}
      />,
      this.data.activeRouteHandler(),
      <ScrollToWrapper id="contact" key="contactScrollWrapper">
        {this.store.pageStore.showContactInformation ? (
          <Contact key="contact" />
        ) : (
          b.withKey(<div></div>, "contactEmpty")
        )}
      </ScrollToWrapper>,
      <CopyRight key="copyRight" />,
    ];

    return <div>{children}</div>;
  }

  onClick(): boolean {
    this.store.headerStore.closeMenu();
    return false;
  }

  protected get showTree(): boolean {
    return (
      this.store.pageStore.forceShowTree ||
      this.store.pageStore.currentPage !== Page.Home
    );
  }

  protected get showReservation(): boolean {
    return this.store.pageStore.currentPage !== Page.Reservation;
  }
}

export const masterPage = b.component(MastePage);
