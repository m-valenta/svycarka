import * as b from "bobril";
import * as styles from "./styles";
import { colors } from "../../styleConstants";

export interface IData {
  text: string;
  colorScheme: string;
  onClick: () => void;
}

export class Button extends b.Component<IData> {
  render() {
    return (
      <div
        style={[styles.buttonStyle, { backgroundColor: this.data.colorScheme }]}
      >
        {this.data.text}
      </div>
    );
  }

  onClick(): boolean {
    this.data.onClick();
    return true;
  }
}

export const button = b.component(Button);
