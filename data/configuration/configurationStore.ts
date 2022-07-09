import * as b from "bobril";
import {
  IAdminConfigurationStore,
  IConfigurationCollection,
  IConfigurationItem,
} from "./types";
import { computed, observable } from "bobx";
import { AjaxConnector, IAjaxConnector } from "../ajaxUtils";

class ConfigurationItem implements IConfigurationItem {
  constructor(key: string, name: string, value: string, groupName: string) {
    this.key = key;
    this.name = name;
    this.groupName = groupName;
    this.value = value;
  }

  readonly key: string;
  readonly name: string;
  readonly groupName: string;

  @observable
  value: string;
}

export class ConfigurationStore implements IAdminConfigurationStore {
  protected _configurationLoadConnector: IAjaxConnector | undefined;
  protected _configurationEditConnector: IAjaxConnector | undefined;

  @observable.ref
  private _configuration: IConfigurationItem[] = [];

  @observable
  private _isReadonly: boolean = false;

  @b.bind
  getConfigurationUrl(): string {
    return `api/configuration/getAll`;
  }

  @b.bind
  setConfigurationUrl(): string {
    return `api/configuration/set`;
  }

  attachLoadConnector(connector: IAjaxConnector): void {
    this._configurationLoadConnector = connector;
  }

  attachEditConnector(connector: IAjaxConnector): void {
    this._configurationEditConnector = connector;
  }

  @b.bind
  completeConfigurationLoading(
    configuration: IConfigurationCollection | undefined
  ) {
    this._configuration =
      configuration?.items.map(
        (item) =>
          new ConfigurationItem(item.key, item.name, item.value, item.groupName)
      ) ?? [];
    this._isReadonly = false;
  }

  loadConfiguration(): void {
    this._configurationLoadConnector?.sendRequest({});
  }

  setValue(key: string, value: string): void {
    let item = this.getItem(key);
    if (item === undefined) {
      console.warn(`Configuration with key: ${key} doesn't exist.`);
      return;
    }

    this._isReadonly = true;
    let storingItem = Object.assign({}, item) as IConfigurationItem;
    storingItem.value = value;

    this._configurationEditConnector?.sendRequest(storingItem);
  }

  @computed
  getValue(key: string): string | undefined {
    return this.getItem(key)?.value;
  }

  @computed
  getGroups(): string[] {
    return [...new Set(this._configuration.map((item) => item.groupName))];
  }

  @computed
  getGroupItems(groupName: string): IConfigurationItem[] {
    return this._configuration.filter((item) => item.groupName == groupName);
  }

  get isReadonly(): boolean {
    return this._isReadonly;
  }

  set isReadonly(value: boolean) {
    this._isReadonly = value;
  }

  protected getItem(key: string): IConfigurationItem | undefined {
    return this._configuration.find((item) => item.key == key);
  }
}

export function configurationStoreFactory(): IAdminConfigurationStore {
  var store = new ConfigurationStore();

  store.attachLoadConnector(
    new AjaxConnector<{}, IConfigurationCollection>(
      "GET",
      store.getConfigurationUrl,
      store.completeConfigurationLoading
    )
  );

  store.attachEditConnector(
    new AjaxConnector(
      "POST",
      store.setConfigurationUrl,
      (response: any) => {
        if (response === undefined) {
          store.isReadonly = false;
          return;
        }

        store.loadConfiguration();
      },
      true
    )
  );

  return store;
}
