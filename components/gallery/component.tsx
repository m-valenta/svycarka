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
          <div> {this._dataStore.galleryFiles.join(";")} </div>
          <this.gallery />
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

  // TODO separate component
  protected gallery(): b.IBobrilNode {
    return (
      <div
        style={[
          styles.galleryWrapper,
          {
            fontSize: 30,
            color: colors.calendarSilver,
            position: "relative"
          }
        ]}
      >
        <div
          style={{
            position: "absolute",
            width: "100%",
            top: "50%",
            marginTop: -15,
            textAlign: "center"
          }}
        >
          Under construction
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
    return <div style={[styles.gallerySlider, {height: this.data.height}]}>
        <svg style={[styles.svgStyle, {height: this.data.height}]}>
          <GallerySliderItem height={this.data.height} itemIdx={0} />
        </svg>
      </div>
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


  render():b.IBobrilNode {
    const diameter = this._isActivated ? extendedSize : defaultSize;
    return <circle          
        r={diameter}
        cx="8"
        cy={this.data.height / 2 - diameter}
        fill={this._isActivated ? "black" : colors.inputSilver}
        style={{cursor: "pointer"}}
      />;
  }

  onMouseEnter() {
    this._isActivated = true;
  }

  onMouseLeave() {
    this._isActivated = false;
  }
}