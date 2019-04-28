import * as b from "bobril";
import * as styles from "./styles";
import { observable } from "bobx";

export interface IData {
  width: number;
  maxHeight: number;
  top: number;
  left: number;
  children: {
    mainContent: b.IBobrilChild;
    toolBar?: b.IBobrilChild;
  };
  closeDelegate?: () => void;
}

export class Buble extends b.Component<IData> {
  @observable
  step: number;

  heightStep: number;

  init() {
    this.step = 0;
    this.heightStep = Math.floor(this.data.maxHeight / 100);
  }
  render() {
    const animationRun = this.tryAnimate();
    return (
      <div
        style={[
          styles.arrowWrapper,
          {
            width: this.data.width,
            top: this.data.top + 10,
            left: this.data.left,
            height: animationRun ? this.step * this.heightStep : "auto"
          }
        ]}
      >
        {animationRun
          ? []
          : [
              <div>{this.data.children.mainContent}</div>,
              <div>{this.data.children.toolBar}</div>
            ]}
      </div>
    );
  }

  onClick(): boolean {
    this.data.closeDelegate !== undefined && this.data.closeDelegate();
    return true;
  }

  protected tryAnimate(): boolean {
    if (this.step < 100) {
      setTimeout(() => {
        this.step = this.step + (100 - this.step / 4);
      }, 60);
      return true;
    }

    return false;
  }
}
