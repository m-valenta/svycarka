import * as b from "bobril";
import { IAjaxConnector, AjaxConnector, fetchToBlob } from "../ajaxUtils";
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
  async completeContentLoading(
    contentResponse: IGalleryContentResponse
  ): Promise<void> {
    const files = contentResponse.fileNames.map(
      // TODO
      fileName => {
        const url = `${
          location.pathname.indexOf("/test") >= 0 ? "/test" : ""
        }/api/gallery/getImage/${fileName}?rw=${resourceVersion}`;

        return fetchToBlob(url);
      }
    );

    const oldContent = this._contentFiles;
    this._contentFiles = await Promise.all(files);

    oldContent.forEach(blobUrl => URL.revokeObjectURL(blobUrl));
  }

  getContentUrl(): string {
    return location.pathname.indexOf("/test") >= 0
      ? "/test/api/gallery/getContent"
      : "/api/gallery/getContent";
  }
}

export function galletyStoreFactory(): IGalleryStore {
  var store = new GalleryStore();

  store.attachContentConnector(
    new AjaxConnector<undefined, IGalleryContentResponse>(
      "GET",
      store.getContentUrl,
      store.completeContentLoading
    )
  );

  return store;
}
