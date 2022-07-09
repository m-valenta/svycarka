export interface IConfigurationItem {
    key: string,
    name: string,
    value: string,
    groupName: string;
}

export interface IConfigurationCollection {
    items: IConfigurationItem[];
}

export interface IConfigurationStore {
    loadConfiguration(): void;
    getValue(key: string): string | undefined;
}

export interface IAdminConfigurationStore extends IConfigurationStore {
    setValue(key: string, value: string): void;
    getGroups(): string[];
    getGroupItems(groupName: string): IConfigurationItem[];
    readonly isReadonly: boolean
}