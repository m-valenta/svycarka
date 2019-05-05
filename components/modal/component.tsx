import * as b from "bobril";
import * as styles from "./style";

export interface IData {
  children: b.IBobrilChildren;
  close: () => void;
}

export class Modal extends b.Component<IData> {
  render() {
    return (
      <div style={styles.wrapper}>
        <div style={styles.wrapperContent} />
      </div>
    );
  }
}

export const modal = b.component(Modal);
