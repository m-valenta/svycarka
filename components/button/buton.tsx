import * as b from "bobril";
import * as styles from "./styles";
import { colors } from "../../styleConstants";

export interface IData {
  text: string;
  colorScheme: string;
  onClick: () => void;
  explicitWidth?: number;
}

export class Button extends b.Component<IData> {
  render() {
    const style: b.IBobrilStyle[] = [
      styles.buttonStyle,
      { backgroundColor: this.data.colorScheme }
    ];
    this.data.explicitWidth !== undefined &&
      style.push({ width: this.data.explicitWidth });
    return <div style={style}>{this.data.text}</div>;
  }

  onClick(): boolean {
    this.data.onClick();
    return true;
  }
}

export const button = b.component(Button);
