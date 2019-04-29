import * as b from "bobril";
import { observable } from "bobx";
import * as styles from "./styles";

export interface IData {
  headerText: string;
  expandedWidth: number;
  expandedHeight: number;
  children: b.IBobrilChildren;
}

export class Expander extends b.Component<IData> {
  @observable
  protected isExpanded: boolean;

  @observable
  protected step: number;

  protected widthStepChange: number;
  protected heightStepChange: number;

  init() {
    this.step = 0;
    this.isExpanded = false;

    this.widthStepChange = Math.ceil(this.data.expandedWidth / 100);
    this.heightStepChange = Math.ceil(this.data.expandedHeight / 100);
  }

  render() {
    const animationRun = this.tryAnimate();
    const children = [
      <Header
        text={this.data.headerText}
        expansionChangeHandler={this.toggle}
      />
    ];

    if (this.isExpanded) {
      children.push(
        <div
          style={[
            styles.content,
            {
              width: animationRun ? this.step * this.widthStepChange : "auto",
              height: animationRun ? this.step * this.heightStepChange : "auto"
            }
          ]}
        >
          {animationRun ? undefined : this.data.children}
        </div>
      );
    }

    return <div style={styles.wrapper}>{[children]}</div>;
  }

  @b.bind
  protected toggle(): void {
    this.isExpanded = !this.isExpanded;
    if (this.isExpanded) {
      this.step = 0;
    }
  }

  protected tryAnimate(): boolean {
    if (this.step < 100) {
      setTimeout(() => {
        this.step = this.step + (100 - this.step / 2);
      }, 60);
      return true;
    }
    return false;
  }
}

class Header extends b.Component<{
  text: string;
  expansionChangeHandler: () => void;
}> {
  render() {
    return <div style={styles.header}>{this.data.text}</div>;
  }
  onClick() {
    this.data.expansionChangeHandler();
    return true;
  }
}

export const expander = b.component(Expander);
