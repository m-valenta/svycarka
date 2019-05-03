import * as b from "bobril";
import * as styles from "./styles";
import { contentWrapper } from "../../styleConstants";

export interface IData {
  children: {
    header: string;
    content: b.IBobrilChildren;
  };
}

export class TextSection extends b.Component<IData> {
  render() {
    return (
      <div style={[contentWrapper, styles.wrapper]}>
        <div style={styles.header}>
          <span>{this.data.children.header}</span>
        </div>
        <div style={styles.content}>{this.data.children.content}</div>
      </div>
    );
  }
}
