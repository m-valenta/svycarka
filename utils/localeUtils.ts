import { locales } from "../constants";

export function getBackendLocaleId(locale: string): number {
    switch (locale) {
        case locales.default:
          return 0;
        default:
          return 1;
      }
}

export function getlocaleName(locale: string): string {
    switch (locale) {
      case locales.default:
        return "EN";
      default:
        return "CS";
    }
  }