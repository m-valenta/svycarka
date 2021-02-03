import * as b from "bobril";
import * as styles from "./styles";
import { colors } from "../../styleConstants";
import { appStore } from "../../data/appStore";

export interface IData {
  text: string;
  colorScheme: string;
  onClick: () => void;
  explicitWidth?: number;
  explicitMargin?: string;
  explicitPadding?: string;
}

export class Button extends b.Component<IData> {
  render() {
    const style: b.IBobrilStyle[] = [
      styles.buttonStyle,
      { backgroundColor: this.data.colorScheme }
    ];
    this.data.explicitWidth !== undefined &&
      style.push({ width: this.data.explicitWidth });
    return (
      <div
        style={[
          style,
          {
            margin:
              this.data.explicitMargin !== undefined
                ? this.data.explicitMargin
                : "",
            padding: 
              this.data.explicitPadding !== undefined
                ? this.data.explicitPadding
                : ""
          }
        ]}
      >
        {this.data.text}
      </div>
    );
  }

  onClick(): boolean {
    appStore().resetPageState();
    this.data.onClick();
    return true;
  }
}

export const button = b.component(Button);
