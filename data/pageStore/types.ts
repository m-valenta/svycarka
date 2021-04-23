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


export interface IResolution {
  readonly width: number;
  readonly height: number;
  readonly windowWidth: number;
  readonly windowHeight: number;
  readonly isMobile: boolean;
}

export interface IPageStore {
  readonly currentPage: Page;
  readonly currentResolution: IResolution;
  forceShowTree: boolean;  
  showContactInformation: boolean;
  mapOverlayActive: boolean;
  goToPage(page: Page, scrollTo?: scrollSection): void;
  setPageInitialized(page: Page): void;
  setPageRendered(page: Page): void;  
  setScrollItemPosition(id: string, yPosition: number): void;
  getScrollItemPosition(id: string): number | undefined;
}
