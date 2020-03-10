export interface IHeaderStore {
  readonly isMenuOpen: boolean;
  readonly isLanguageSelectionOpen: boolean;

  openMenu();
  closeMenu();
  openLanguageSection();
  closeLanguageSection();
}
