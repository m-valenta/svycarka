import { observable } from "bobx";

export function fetchToBlob(url: string): Promise<string> {
    let xhr = new XMLHttpRequest();    
    xhr.responseType = 'blob';
    
    return new Promise(function(resolve: (value: string) => void, reject: (error) => void) {

		// Setup our listener to process compeleted requests
		xhr.onreadystatechange = function () {

			// Only run if the request is complete
			if (xhr.readyState !== 4) return;

			// Process the response
			if (xhr.status >= 200 && xhr.status < 300) {
                // If successful
				resolve(window.URL.createObjectURL(xhr.response));
			} else {
				// If failed
				reject({
                    url,
                    method: "GET",
					status: xhr.status,
					statusText: xhr.statusText
				});
			}

		};

		// Setup our HTTP request
        xhr.open("GET", url, true);
        // Send the request
        xhr.send();
	});
} 

export interface IAjaxRequest {};
export interface IAjaxResponse {};

export interface IAjaxConnector {
    sendRequest(request: IAjaxRequest | undefined);
}

export class StaticConnector<TRequest extends IAjaxRequest, TResponse extends IAjaxResponse> implements IAjaxConnector {
    protected readonly _responseHandler: (response: TResponse | undefined) => void
    protected readonly _requstHandler: (request: TRequest) => TResponse | undefined;

    constructor(requstHandler: (request: TRequest) => TResponse, responseHandler: (response: TResponse | undefined) => void) {
        this._requstHandler = requstHandler;
        this._responseHandler = responseHandler;
    }

    sendRequest(request: TRequest) {
        this._responseHandler(this._requstHandler(request));
    }
}

export class AjaxConnector<TRequest extends IAjaxRequest, TResponse extends IAjaxResponse> implements IAjaxConnector {
    protected readonly _httpMethod: HttpMethod;
    protected readonly _urlGetter: (request: TRequest) => string | undefined;
    protected readonly _responseHandler: (response: TResponse | undefined) => void

    constructor(httpMethod: HttpMethod, urlGetter: (request: TRequest) => string | undefined, responseHandler: (response: TResponse | undefined) => void) {
        this._httpMethod = httpMethod;
        this._urlGetter = urlGetter;
        this._responseHandler = responseHandler;
    }

    sendRequest(request: TRequest): void {
        Send(request, this._urlGetter(request), this._httpMethod)
            .then(responseString => this._responseHandler(responseString === undefined || responseString.length === 0 ? {} : JSON.parse(responseString)))
            .catch(error => {
                this._responseHandler(undefined);
                console.error("Requst failed: ", error)
            });
    }
}


export interface IAjaxError {
    url: string;
    method: HttpMethod;
    status: number;
	statusText: string;
} 

export declare type HttpMethod = "POST" | "GET"; 

function Send<T>(data: T, url: string | undefined, method: HttpMethod = "POST"): Promise<string> {
    url = url !== undefined 
        ? url 
        : window.location.pathname;

    let xhr = new XMLHttpRequest();


    return new Promise(function(resolve: (value: string) => void, reject: (error) => void) {

		// Setup our listener to process compeleted requests
		xhr.onreadystatechange = function () {

			// Only run if the request is complete
			if (xhr.readyState !== 4) return;

			// Process the response
			if (xhr.status >= 200 && xhr.status < 300) {
				// If successful
				resolve(xhr.responseText);
			} else {
				// If failed
				reject({
                    url,
                    method,
					status: xhr.status,
					statusText: xhr.statusText
				});
			}

		};

		// Setup our HTTP request
        xhr.open(method, url, true);
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

        // Send the request
        xhr.send(data === undefined ? undefined : JSON.stringify(data));
	});
}