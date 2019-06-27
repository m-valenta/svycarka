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
  goToPage(page: Page): void;
  setPageInitialized(page: Page): void;  
  setScroolItemPosition(id: string, yPosition: number);
  getScrollItemPosition(id: string): number | undefined;
}
