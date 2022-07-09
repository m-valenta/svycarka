import { isArray } from "bobril";
import { locales } from "../constants";
import { appStore } from "../data/appStore";

export function getBackendLocaleId(locale: string): number {
  switch (locale) {
    case locales.english:
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
    case locales.english:
      return "EN";
    default:
      return "CS";
  }
}

export function formateToCzechDate(date: Date): string {
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
}

type configKeys =
  | "sezona_zima"
  | "sezona_leto"
  | "mimo_sezonu"
  | "vikend"
  | "vanoce"
  | "silvestr"
  | "jarni_prazdniny"
  | "velikonoce"
  | "rekreacni_poplatek"
  | "kauce";

export function getConfigValue(key: configKeys, defaultValue: string): object {
  return getConfigValues([{ key: key, defaultValue: defaultValue }]);
}

export function getConfigValues(
  config: { key: configKeys; defaultValue: string }[]
): object {
  let priceObj = {};
  let configStore = appStore().configurationStore;

  let idx = 0;
  for (let configItem of config) {
    (<any>priceObj)[`value_${idx}`] =
      configStore.getValue(configItem.key) ?? configItem.defaultValue;
    idx++;
  }

  return priceObj;
}
