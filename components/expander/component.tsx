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
  protected isExpanded: boolean = false;

  @observable
  protected step: number = 0;

  protected widthStepChange: number = 0;
  protected heightStepChange: number = 0;

  init() {
    this.step = 0;
    this.isExpanded = false;

    this.widthStepChange = this.data.expandedWidth / 100;
    this.heightStepChange = this.data.expandedHeight / 100;
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
              width: animationRun
                ? this.step * this.widthStepChange
                : this.step * this.widthStepChange, //auto",
              height: animationRun
                ? this.step * this.heightStepChange
                : this.step * this.heightStepChange //"auto"
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
        this.step = this.step + 20;
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
