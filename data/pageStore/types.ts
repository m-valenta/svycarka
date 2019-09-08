import { scrollSection } from "../../components/scrollToWrapper/utils";

export enum Page {
  Home,
  Reservation,
  Tips
}

export interface IScrollItem {
  id: string;
  y: number;
}

export interface IPageStore {
  readonly currentPage: Page;
  forceShowTree: boolean;  
  goToPage(page: Page, scrollTo?: scrollSection): void;
  setPageInitialized(page: Page): void;
  setPageRendered(page: Page);  
  setScroolItemPosition(id: string, yPosition: number);
  getScrollItemPosition(id: string): number | undefined;
}
