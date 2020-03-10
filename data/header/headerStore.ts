import { observable } from "bobx";
import { IHeaderStore } from "./types";

class HeaderStore implements IHeaderStore {
    @observable
    protected languageSelectionOpen: boolean = false;
    @observable
    protected menuOpen: boolean = false;
  
    get isMenuOpen(): boolean {
      return this.menuOpen;
    }
  
    get isLanguageSelectionOpen(): boolean {
      return this.languageSelectionOpen;
    }
  
    openMenu() {
      this.menuOpen = true;
      this.languageSelectionOpen = false;
    }
  
    closeMenu() {
      this.menuOpen = false;
    }
  
    openLanguageSection() {
      this.languageSelectionOpen = true;
      this.menuOpen = false;
    }
  
    closeLanguageSection() {
      this.languageSelectionOpen = false;
    }
  }

  export function headerStoreFactory(): IHeaderStore 
  {
    return new HeaderStore();
  }