import * as b from "bobril";
import { t } from "bobril-g11n";
import * as styles from "./styles";
import { colors } from "../../styleConstants";
import { observable } from "bobx";
import { IGalleryStore } from "../../data/gallery/types";
import { appStore } from "../../data/appStore";

export class Gallery extends b.Component {
  protected _dataStore: IGalleryStore;
  init() {
    this._dataStore = appStore().galleryStore;
    this._dataStore.loadContent();
  }
  render() {
    return (
      <div style={styles.wrapper}>
        <div style={styles.header}>{t("Take a look at us")}</div>
        <GalleryContent store={this._dataStore} />
        <GallerySlider height={20} itemsCnt={1} />
        <div style={styles.descrition}>
          {[
            <div>{t("See photos to see if you like us.")}</div>,
            <div>
              {t(
                "If you missed some of the hilarious corners in our album, we will be happy"
              )}
            </div>,
            <div>
              {[
                t("if you add it to facebook or instagram under hastagem"),
                <span style={styles.hashtag}>#svycarka.com</span>
              ]}
            </div>
          ]}
        </div>
      </div>
    );
  }
}

class GalleryContent extends b.Component<{ store: IGalleryStore }> {
  @observable
  innerLeft: number = 0;
  @observable
  outerLeft: number = 0;

  onClick(): boolean {
    this.innerLeft = 0;
    this.outerLeft = 0;
    return true;
  }

  render(): b.IBobrilNode {
    if (this.data.store.galleryFiles.length == 0) {
      return (
        <div
          style={[
            styles.galleryWrapper,
            {
              fontSize: 30,
              position: "relative",
              overflow: "hidden"
            }
          ]}
        />
      );
    }
    return (
      <div
        style={[
          styles.galleryWrapper,
          {
            fontSize: 30,
            position: "relative",
            overflow: "hidden"
          }
        ]}
      >
        <div
          style={{
            // backgroundColor: "yellow",
            width: "50%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: `${-28 - this.outerLeft}%`
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              overflow: "hidden",
              position: "relative"
            }}
          >
            <div
              style={{
                width: "105%",
                height: "100%",
                position: "absolute",
                left: `${this.innerLeft}%`,
                backgroundSize: "cover",
                backgroundImage: `url('${this.data.store.galleryFiles[0]}')`
              }}
            />
          </div>
        </div>
        <div
          style={{
            // backgroundColor: "red",
            width: "50%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: `${25 - this.outerLeft}%`
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              overflow: "hidden",
              position: "relative"
            }}
          >
            <div
              style={{
                width: "105%",
                height: "100%",
                position: "absolute",
                left: `${this.innerLeft}%`,
                backgroundSize: "cover",
                backgroundImage: `url('${this.data.store.galleryFiles[1]}')`
              }}
            />
          </div>
        </div>
        <div
          style={{
            // backgroundColor: "blue",
            width: "50%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: `${78 - this.outerLeft}%`
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              overflow: "hidden",
              position: "relative"
            }}
          >
            <div
              style={{
                width: "105%",
                height: "100%",
                position: "absolute",
                left: `${this.innerLeft}%`,
                backgroundSize: "cover",
                backgroundImage: `url('${this.data.store.galleryFiles[2]}')`
              }}
            />
          </div>
        </div>
        <div
          style={{
            // backgroundColor: "blue",
            width: "50%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: `${131 - this.outerLeft}%`
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              overflow: "hidden",
              position: "relative"
            }}
          >
            <div
              style={{
                width: "105%",
                height: "100%",
                position: "absolute",
                left: `${this.innerLeft}%`,
                backgroundSize: "cover",
                backgroundImage: `url('${this.data.store.galleryFiles[3]}')`
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  postUpdateDom() {
    this.innerLeft > -5 &&
      setTimeout(() => {
        let inCh = window["in"] || 0.055;
        let outCh = window["out"] || 0.105;
        this.innerLeft = this.innerLeft - inCh;
        this.outerLeft = this.outerLeft + outCh;
      }, 30);
     this.innerLeft <= -5 && this.outerLeft < 53 &&
      setTimeout(() => {
        let outCh = window["out"] || 5;
        this.outerLeft = this.outerLeft + outCh;
      }, 30);
  }
}

interface ISliderData {
  height: number;
  itemsCnt: number;
}

class GallerySlider extends b.Component<ISliderData> {
  render(): b.IBobrilNode {
    return (
      <div style={[styles.gallerySlider, { height: this.data.height }]}>
        <svg style={[styles.svgStyle, { height: this.data.height }]}>
          <GallerySliderItem height={this.data.height} itemIdx={0} />
        </svg>
      </div>
    );
  }
}

interface ISliderItemData {
  height: number;
  itemIdx: number;
}

const defaultSize = 2;
const extendedSize = 4;

class GallerySliderItem extends b.Component<ISliderItemData> {
  @observable
  private _isActivated = false;

  render(): b.IBobrilNode {
    const diameter = this._isActivated ? extendedSize : defaultSize;
    return (
      <circle
        r={diameter}
        cx="8"
        cy={this.data.height / 2 - diameter}
        fill={this._isActivated ? "black" : colors.inputSilver}
        style={{ cursor: "pointer" }}
      />
    );
  }

  onMouseEnter() {
    this._isActivated = true;
  }

  onMouseLeave() {
    this._isActivated = false;
  }
}
