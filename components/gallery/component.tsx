import * as b from "bobril";
import { t } from "bobril-g11n";
import * as styles from "./styles";
import { colors } from "../../styleConstants";
import { observable } from "bobx";
import { IGalleryStore } from "../../data/gallery/types";
import { appStore } from "../../data/appStore";
import { AnimationHandler } from "./animationHandler";

export class Gallery extends b.Component {
  protected _dataStore: IGalleryStore;
  protected _animationHandler: AnimationHandler;
  init() {
    this._dataStore = appStore().galleryStore;
    this._dataStore.loadContent();

    this._animationHandler = new AnimationHandler();
    b.addDisposable(this, this._animationHandler);
  }
  render() {
    return (
      <div style={styles.wrapper}>
        <div style={styles.header}>{t("Take a look at us")}</div>
        <GalleryContent
          store={this._dataStore}
          animationHandlder={this._animationHandler}
        />
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

  postInitDom() {
    this._animationHandler.start();
  }
}

interface IGalleryContentStore {
  innerLeft: number;
  outerLeft: number;
  step: number;
  images: string[];
}

class GalleryContent
  extends b.Component<{
    store: IGalleryStore;
    animationHandlder: AnimationHandler;
  }>
  implements IGalleryContentStore {
  protected _innerMoveCompleted: boolean = false;

  @observable
  protected _innerLeft: number = 0;
  @observable
  protected _outerLeft: number = 0;
  @observable
  protected readonly _images: string[] = [];
  @observable
  protected _step: number = 0;
  
  get innerLeft(): number {
    return this._innerLeft;
  }
  get outerLeft(): number {
    return this._outerLeft;
  }
  get step(): number {
    return this._step;
  }
  get images(): string[] {
    return this._images;
  }
  init() {
    b.addDisposable(this, () => {
      this.data.animationHandlder.unregisterHandler(this.onAnimate);
    });
  }

  render(): b.IBobrilNode {
    var children: b.IBobrilChildren = [];
    if (this.data.store.galleryFiles.length > 0) {
      if (this.images.length === 0) {
        this.swapImages();
      }

      children.push(<GalleryContentImage store={this} idx={0} />);
      children.push(<GalleryContentImage store={this} idx={1} />);
      children.push(<GalleryContentImage store={this} idx={2} />);
      children.push(<GalleryContentImage store={this} idx={3} />);
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
        {children}
      </div>
    );
  }

  postInitDom() {
    this.data.animationHandlder.registerHandler(this.onAnimate);
  }

  protected swapImages() {
    const max = this.data.store.galleryFiles.length;

    let first = this._step - 1;
    this._images[0] = this.data.store.galleryFiles[
      first >= 0 ? first : max - 1
    ];
    this._images[1] = this.data.store.galleryFiles[this._step];
    this._images[2] = this.data.store.galleryFiles[
      (this._step + 1) % max
    ];
    this._images[3] = this.data.store.galleryFiles[
      (this._step + 2) % max
    ];

    this._step = (this._step + 1) % max;
  }

  @b.bind
  protected onAnimate(): void {
    if (this._innerLeft > -5) {
      const inner = this._innerLeft - 0.025;
      this._innerLeft = inner < -5 ? -5 : inner;
      this._outerLeft = this._outerLeft + 0.05;
    } else if ((this._innerLeft <= -5 || this._innerMoveCompleted) && this._outerLeft < 53) {
      if(!this._innerMoveCompleted) {
        this._innerMoveCompleted = true;
        this._innerLeft = 0;
      }
      const outer = this._outerLeft + 2.7;
      this._outerLeft = outer > 53 ? 53 : outer;
    } else {
      this.swapImages();
      this._outerLeft = 0;
      this._innerMoveCompleted = false;
    }
  }
}

const initialLefts = [-28, 25, 78, 131];
class GalleryContentImage extends b.Component<{
  idx: number;
  store: IGalleryContentStore;
}> {
  
  _initialLeft: number;
  _initialStep: number;
  _idx: number;
  init() {
    this._initialLeft = initialLefts[this.data.idx];
    this._initialStep = this.data.store.step;
    this._idx = this.data.idx;
  }

  render(): b.IBobrilNode {
    if(this.data.store.step !== this._initialStep) {
      this._initialStep = this.data.store.step;
      this._idx = this._idx - 1;
      this._idx = this._idx < 0 ? 3 : this._idx;
      this._initialLeft = initialLefts[this._idx];
    }
    return (
      <div
        style={{
          width: "50%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: `${this._initialLeft - this.data.store.outerLeft}%`
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
          <img
            src={this.data.store.images[this._idx]}
            style={{
              width: "105%",
              height: "100%",
              position: "absolute",
              left: `${this.data.store.innerLeft}%`,
            }}
          />
        </div>
      </div>
    );
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
