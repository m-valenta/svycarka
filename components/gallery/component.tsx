import * as b from "bobril";
import { t } from "bobril-g11n";
import * as styles from "./styles";
import { colors } from "../../styleConstants";
import { observable } from "bobx";
import { IGalleryStore } from "../../data/gallery/types";
import { appStore } from "../../data/appStore";
import { AnimationHandler } from "./animationHandler";
import { Loader } from "../loader/loader";

const sliderSize = {
  height: 20,
  diameter: 2,
  activeDiameter: 4,
  connectionWidth: 18
};

enum stage {
  slowMovement,
  fastMovement,
  skip,
  reset
}

class AnimationStageDispatcher {
  @observable
  private _stage: stage = stage.slowMovement;

  targetIndex: number;

  get stage(): stage {
    return this._stage;
  }

  set stage(stage: stage) {
    if (stage === this._stage) return;
    this._stage = stage;
  }
}

export class Gallery extends b.Component {
  protected _dataStore: IGalleryStore;
  protected _animationStageDispatcher: AnimationStageDispatcher;
  protected _animationHandler: AnimationHandler;
  init() {
    this._dataStore = appStore().galleryStore;
    this._dataStore.loadContent();

    this._animationHandler = new AnimationHandler();
    this._animationStageDispatcher = new AnimationStageDispatcher();
    b.addDisposable(this, this._animationHandler);
  }
  render() {
    return (
      <Loader storeWithLoading={this._dataStore}>
        <div style={styles.wrapper}>
          <div style={styles.header}>{t("Take a look at us")}</div>
          <GalleryContent
            store={this._dataStore}
            animationHandler={this._animationHandler}
            animationStageDispatcher={this._animationStageDispatcher}
          />
          <GallerySlider
            store={this._dataStore}
            animationHandler={this._animationHandler}
            animationStageDispatcher={this._animationStageDispatcher}
          />
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
                  t("if you add it to facebook or instagram under hashtag"),
                  <span style={styles.hashtag}>{t("#svycarka.com")}.</span>
                ]}
              </div>
            ]}
          </div>
        </div>
      </Loader>
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
    animationStageDispatcher: AnimationStageDispatcher;
    animationHandler: AnimationHandler;
  }>
  implements IGalleryContentStore {
  protected _innerMoveCompleted: boolean = false;

  @observable
  protected _innerLeft: number = 0;
  @observable
  protected _outerLeft: number = 0;
  @observable
  protected readonly _images: string[] = [];

  get innerLeft(): number {
    return this._innerLeft;
  }
  get outerLeft(): number {
    return this._outerLeft;
  }
  get step(): number {
    return this.data.store.currentIndex;
  }
  get images(): string[] {
    return this._images;
  }
  init() {
    b.addDisposable(this, () => {
      this.data.animationHandler.unregisterHandler(this.onAnimate);
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
    this.data.animationHandler.registerHandler(this.onAnimate);
  }

  protected swapImages() {
    const max = this.data.store.galleryFiles.length;

    let first = this.data.store.currentIndex - 1;
    this._images[0] = this.data.store.galleryFiles[
      first >= 0 ? first : max - 1
    ];
    this._images[1] = this.data.store.galleryFiles[
      this.data.store.currentIndex
    ];
    this._images[2] = this.data.store.galleryFiles[
      (this.data.store.currentIndex + 1) % max
    ];
    this._images[3] = this.data.store.galleryFiles[
      (this.data.store.currentIndex + 2) % max
    ];

    this.data.store.currentIndex = (this.data.store.currentIndex + 1) % max;
  }

  @b.bind
  protected onAnimate(): void {
    if (this.data.store.isLoading) return;

    if (this.data.animationStageDispatcher.stage === stage.skip) {
      this.skipAnimate();
      return;
    }

    if (this._innerLeft > -5 && !this._innerMoveCompleted) {
      this.data.animationStageDispatcher.stage = stage.slowMovement;
      const inner = this._innerLeft - 0.025;
      this._innerLeft = inner < -5 ? -5 : inner;
      this._outerLeft = this._outerLeft + 0.05;
    } else if (
      (this._innerLeft <= -5 || this._innerMoveCompleted) &&
      this._outerLeft < 53
    ) {
      if (!this._innerMoveCompleted) {
        this._innerMoveCompleted = true;
        this._innerLeft = 0;
      }
      const outer = this._outerLeft + 2.7;
      this._outerLeft = outer > 53 ? 53 : outer;
      this.data.animationStageDispatcher.stage = stage.fastMovement;
    } else {
      this.swapImages();
      this._outerLeft = 0;
      this._innerMoveCompleted = false;
    }
  }

  protected skipAnimate() {
    if (this._outerLeft < 53) {
      const outer = this._outerLeft + 2.7;
      this._outerLeft = outer > 53 ? 53 : outer;
      return;
    } else {
      this.swapImages();
      this._innerLeft = 0;
      this._outerLeft = 0;
      this._innerMoveCompleted = false;

      if (
        this.data.store.currentIndex ===
        this.data.animationStageDispatcher.targetIndex
      ) {
        this.data.animationStageDispatcher.stage = stage.reset;
      }
      return;
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
    if (this.data.store.step !== this._initialStep) {
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
              left: `${this.data.store.innerLeft}%`
            }}
          />
        </div>
      </div>
    );
  }
}

interface ISliderData {
  store: IGalleryStore;
  animationHandler: AnimationHandler;
  animationStageDispatcher: AnimationStageDispatcher;
}

interface ISliderLineState {
  startOffset: number;
  lineLength: number;
  selectItem(itemIdx: number): void;
}

class GallerySlider extends b.Component<ISliderData>
  implements ISliderLineState {
  @observable
  private _startOffset: number = sliderSize.activeDiameter;

  @observable
  private _lineLength: number = 0;

  private _step: number = 0;

  private readonly _lineLengthMax =
    sliderSize.connectionWidth +
    (sliderSize.activeDiameter - sliderSize.diameter);

  public get startOffset(): number {
    return this._startOffset;
  }

  public get lineLength(): number {
    return this._lineLength;
  }

  init() {
    b.addDisposable(this, () => {
      this.data.animationHandler.unregisterHandler(this.onAnimate);
    });
  }

  render(): b.IBobrilNode {
    const totalWidth =
      2 * sliderSize.activeDiameter +
      2 * sliderSize.diameter * this.data.store.galleryFiles.length +
      sliderSize.connectionWidth * (this.data.store.galleryFiles.length - 1);

    const svgContent = [];
    for (let i = 0; i < this.data.store.galleryFiles.length; i++) {
      svgContent.push(
        <GallerySliderItem
          itemIdx={i}
          store={this.data.store}
          animationHandler={this.data.animationHandler}
          canAnimateLine={i !== this.data.store.galleryFiles.length - 1}
          lineState={this}
          animationStageDispatcher={this.data.animationStageDispatcher}
        />
      );
    }

    return (
      <div
        style={[
          styles.gallerySlider,
          { height: sliderSize.height, width: totalWidth }
        ]}
      >
        <svg
          style={[
            styles.svgStyle,
            {
              height: sliderSize.height,
              width: totalWidth
            }
          ]}
        >
          {svgContent}
        </svg>
      </div>
    );
  }

  postInitDom() {
    this.data.animationHandler.registerHandler(this.onAnimate);
  }

  selectItem(itemIdx: number): void {
    this._step = 0;
    this._lineLength = 0;
    this._startOffset = sliderSize.activeDiameter;

    this.data.animationStageDispatcher.targetIndex = itemIdx;
    this.data.animationStageDispatcher.stage = stage.skip;
  }

  @b.bind
  private onAnimate(): void {
    switch (this.data.animationStageDispatcher.stage) {
      case stage.slowMovement:
        if (this.startOffset !== sliderSize.activeDiameter) {
          this._lineLength = 0;
          this._startOffset = sliderSize.activeDiameter;
        }

        this._step = (this._step + 1) % 9;
        if (this._step !== 1) return;

        if (this._lineLength < this._lineLengthMax) this._lineLength++;
        break;
      case stage.fastMovement:
        if (this.lineLength !== this._lineLengthMax) {
          this._step = 0;
          this._lineLength = this._lineLengthMax;
        }

        if (this._startOffset < this._lineLengthMax) this._startOffset++;
        break;
    }
  }
}

interface ISliderItemData {
  canAnimateLine: boolean;
  lineState: ISliderLineState;
  itemIdx: number;
  store: IGalleryStore;
  animationHandler: AnimationHandler;
  animationStageDispatcher: AnimationStageDispatcher;
}

class GallerySliderItem extends b.Component<ISliderItemData> {
  @observable
  private _isActivated = false;
  @observable
  private _shrinkingDiameter: number = 0;

  private _shrinkingStep: number = 0;

  private readonly _verticalCenter = sliderSize.height / 2;
  private readonly _startPosition =
    sliderSize.activeDiameter +
    (sliderSize.diameter * 2 + sliderSize.connectionWidth) * this.data.itemIdx;

  render(): b.IBobrilNode {
    const active = this.isSelected || this._isActivated;

    const diameter = active
      ? sliderSize.activeDiameter
      : Math.max(this._shrinkingDiameter, sliderSize.diameter);

    const content = [
      <rect
        x={this._startPosition - sliderSize.activeDiameter}
        y={0}
        width={2 * sliderSize.activeDiameter}
        height={sliderSize.height}
        fill="transparent"
        style={{ cursor: "pointer" }}
      />,
      <circle
        r={diameter}
        cx={this._startPosition}
        cy={this._verticalCenter - sliderSize.activeDiameter}
        fill={active ? `${colors.hover_menu}` : colors.inputSilver}
        style={{ cursor: "pointer" }}
      />,
      this.tryGetLine()
    ];

    return <g>{content}</g>;
  }

  onMouseEnter() {
    this._isActivated = true;
  }

  onMouseLeave() {
    this._isActivated = false;
    if (this.isSelected) {
      return;
    }

    this._shrinkingDiameter = sliderSize.activeDiameter;
    this._shrinkingStep = 0;
    this.data.animationHandler.registerHandler(this.shrinkActiveRadius);
  }

  onClick() {
    this.data.lineState.selectItem(this.data.itemIdx);
    return true;
  }

  private get isSelected(): boolean {
    return this.data.animationStageDispatcher.stage === stage.skip
      ? this.data.itemIdx === this.data.animationStageDispatcher.targetIndex
      : this.data.itemIdx === this.data.store.currentIndex;
  }

  private tryGetLine(): b.IBobrilNode {
    if (!this.isSelected || !this.data.canAnimateLine) return <></>;

    const lineTop = this._verticalCenter - sliderSize.activeDiameter;
    return (
      <SliderProgressLine
        key={`g_s_ln_${this.data.itemIdx}`}
        lineState={this.data.lineState}
        lineTop={lineTop}
        startPosition={this._startPosition}
      />
    );
  }

  @b.bind
  private shrinkActiveRadius(): void {
    this._shrinkingStep = (this._shrinkingStep + 1) % 5;

    if (this._shrinkingStep !== 0) {
      return;
    }

    if (this._shrinkingDiameter > sliderSize.diameter) {
      this._shrinkingDiameter--;
      return;
    }

    this.data.animationHandler.unregisterHandler(this.shrinkActiveRadius);
  }
}

function SliderProgressLine(data: {
  lineTop: number;
  startPosition: number;
  lineState: ISliderLineState;
}): b.IBobrilNode {
  return (
    <line
      x1={data.startPosition + data.lineState.startOffset}
      x2={data.startPosition + data.lineState.lineLength}
      y1={data.lineTop}
      y2={data.lineTop}
      style={{ stroke: `${colors.hover_menu}`, strokeWidth: 1 }}
    />
  );
}
