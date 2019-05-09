import * as b from "bobril";
import { FormItem } from "../../data/reservation/types";
import * as styles from "./styles";
import { observableProp } from "bobx";

export class Spinner extends b.Component<{
  text: string;
  item: FormItem<number>;
  explicitWidth?: number;
}> {
  render() {
    const item = this.data.item;

    const textWrapperStyle: b.IBobrilStyle[] = [styles.text];
    this.data.explicitWidth !== undefined &&
      textWrapperStyle.push({ width: this.data.explicitWidth });

    return (
      <div style={styles.wrapper}>
        <div style={textWrapperStyle}>{this.data.text}</div>
        <div style={styles.inputWrapper}>
          <input
            style={styles.input}
            type="number"
            min={0}
            value={item.value}
          />
        </div>
        <div style={{ clear: "both" }} />
      </div>
    );
  }

  onChange(value: number) {
    this.data.item.value = value;
  }
}
