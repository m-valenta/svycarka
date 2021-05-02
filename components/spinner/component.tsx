import * as b from "bobril";
import { IFormItem } from "../../data/reservation/types";
import { invalidItemStyle } from "../../styleConstants";
import * as styles from "./styles";

export class Spinner extends b.Component<{
  text: string;
  item: IFormItem<number>;
  explicitWidth?: number;
  max? : number;
}> {
  render() {
    const item = this.data.item;

    const textWrapperStyle: b.IBobrilStyle[] = [styles.text];
    this.data.explicitWidth !== undefined &&
      textWrapperStyle.push({ width: this.data.explicitWidth });


      let inputStyles = [styles.input];
      if (item.value !== undefined) {
        inputStyles.push(styles.inputWithValue);
      }
  
      if (!item.isValid) {
        inputStyles.push(invalidItemStyle);
      }

    return (
      <div style={styles.wrapper}>
        <div style={textWrapperStyle}>{this.data.text}</div>
        <div style={styles.inputWrapper}>
          <input
            style={inputStyles}
            type="number"
            min={0}
            max={this.data.max ?? Number.MAX_VALUE}
            value={item.value}
            onChange={value => (item.value = parseInt(value))}
          />
        </div>
        <div style={{ clear: "both" }} />
      </div>
    );
  }
}
