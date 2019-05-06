export enum Page {
  Home,
  Reservation,
  Tips
}

export interface IPageStore {
  readonly currentPage: Page;
  goToPage(page: Page): void;
  setPageInitialized(page: Page): void;
}
