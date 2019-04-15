import { resourceVersion } from "../constants";

export function getResourceCssUrl(asset: string): string {
    return `url('${asset}?rw=${resourceVersion}')`;
}