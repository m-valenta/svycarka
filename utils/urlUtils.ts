import { debug } from "../constants";

export function getUrl(path?: string) {
    let baseUrl = getHostWithProtocol();

    if(path !== undefined)
        baseUrl = `${baseUrl}/${path}`;

        return baseUrl;
}

function getHostWithProtocol() {
    const host = window.location.hostname;
    const port = window.location.port;
    let hostWithProtocol  = `${location.protocol}//${host}`;
    if(port !== undefined && port !== "")
        hostWithProtocol = `${hostWithProtocol}:${window.location.port}`;

    return debug && !host.match(/localhost|[0-9]{2,3}\.[0-9]{2,3}\.[0-9]{2,3}\.[0-9]{2,3}|::1|\.local|^$/gi) 
        ? `${hostWithProtocol}/test`
        : hostWithProtocol;
}