import * as b from "bobril";
import { IAjaxConnector, AjaxConnector } from "../ajaxUtils";
import { IGalleryContentResponse, IGalleryStore } from "./types";
import { observable } from "bobx";
import { resourceVersion } from "../../constants";

class GalleryStore implements IGalleryStore {
  protected _contentConnector: IAjaxConnector | undefined;

  @observable.ref
  protected _contentFiles: string[] = [];

  get galleryFiles(): string[] {
    return this._contentFiles;
  }

  loadContent() {
      this._contentConnector.sendRequest(undefined);
  }

  attachContentConnector(connector: IAjaxConnector): void {
    this._contentConnector = connector;
  }

  @b.bind
  completeContentLoading(contentResponse: IGalleryContentResponse) {
    this._contentFiles = contentResponse.fileNames.map(
      fileName => `/api/gallery/getImage/${fileName}?rw=${resourceVersion}`
    );
  }

  getContentUrl(): string {
      return "api/gallery/getContent";
  }

}

export function galletyStoreFactory(): IGalleryStore {
    var store = new GalleryStore();
  
    store.attachContentConnector(
      new AjaxConnector<undefined, IGalleryContentResponse>("GET", store.getContentUrl, store.completeContentLoading)
    );
  
    return store;
  }