import * as b from "bobril";
import * as styles from "./styles";
import { contentWrapper } from "../../styleConstants";
import { addLineBreaks } from "../../utils/textUtils";

export interface IData {
  children: {
    header: string;
    content: b.IBobrilChildren;
  };
}

export class TextSection extends b.Component<IData> {
  render() {

    let content = this.data.children.content;
    if(typeof content === "string")
      content = addLineBreaks(content);

    return (
      <div style={[contentWrapper, styles.wrapper]}>
        <div style={styles.header}>
          <span>{this.data.children.header}</span>
        </div>
        <div style={styles.content}>{content}</div>
      </div>
    );
  }
}
