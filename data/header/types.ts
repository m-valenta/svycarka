export interface IHeaderStore {
  readonly isMenuOpen: boolean;
  readonly isLanguageSelectionOpen: boolean;

  openMenu(): void;
  closeMenu(): void;
  openLanguageSection(): void;
  closeLanguageSection(): void;
}
