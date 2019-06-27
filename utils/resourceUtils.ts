import { resourceVersion } from "../constants";

export function getResourceCssUrl(asset: string): string {
    return `url('${resourceKey(asset)}')`;
}

export function getLinkHref(asset: string) {
    return resourceKey(asset);
}

function resourceKey(asset: string) {
    return `${asset}?rw=${resourceVersion}`;
}