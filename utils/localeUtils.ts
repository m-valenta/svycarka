import { locales } from "../constants";

export function getBackendLocaleId(locale: string): number {
  switch (locale) {
    case locales.default:
      return 0;
    default:
      return 1;
  }
}

export function getLocaleCode(locale: number): string {
  switch (locale) {
    case 0:
      return "EN";
    default:
      return "CS";
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

export function formateToCzechDate(date: Date): string {
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
}
