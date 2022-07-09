import * as b from "bobril";
import { IAjaxConnector, AjaxConnector, fetchToBlob } from "../ajaxUtils";
import { IGalleryContentResponse, IGalleryStore } from "./types";
import { observable } from "bobx";
import { resourceVersion } from "../../constants";
import { ILoaderData } from "../../components/loader/loader";

class GalleryStore implements IGalleryStore {
  protected _contentConnector: IAjaxConnector | undefined;

  @observable.ref
  protected _contentFiles: string[] = [];

  @observable
  currentIndex: number = 0;

  @observable
  _isLoading: boolean = false;

  get galleryFiles(): string[] {
    return this._contentFiles;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  loadContent() {
    this._isLoading = true;
    this._contentConnector?.sendRequest(undefined);
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
    this._isLoading = false;
  }

  getContentUrl(): string {
    // return location.pathname.indexOf("/test") >= 0
    //   ? "/test/api/gallery/getContent"
    return "api/gallery/getContent";
  }
}

export function galleryStoreFactory(): IGalleryStore {
  var store = new GalleryStore();

  store.attachContentConnector(
    new AjaxConnector<any, IGalleryContentResponse>(
      "GET",
      store.getContentUrl,
      resp => resp && store.completeContentLoading(resp)
    )
  );

  return store;
}
