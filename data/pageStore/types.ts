import { scrollSection } from "../../components/scrollToWrapper/utils";

export enum Page {
  Home,
  Reservation,
  Tips,
  Error
}

export interface IScrollItem {
  id: string;
  y: number;
}

export interface IPageStore {
  readonly currentPage: Page;
  forceShowTree: boolean;  
  showContactInformation: boolean;
  mapOverlayActive: boolean;
  goToPage(page: Page, scrollTo?: scrollSection): void;
  setPageInitialized(page: Page): void;
  setPageRendered(page: Page);  
  setScrollItemPosition(id: string, yPosition: number);
  getScrollItemPosition(id: string): number | undefined;
}
