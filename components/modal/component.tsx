import * as b from "bobril";
import * as styles from "./style";

export interface IData {
  children: b.IBobrilChildren;
  close: () => void;
}

export class Modal extends b.Component<IData> {
  init() {
    document.body.style["overflow-y"] = "hidden";
  }

  render() {
    return (
      <div style={styles.wrapper}>
        <div style={styles.wrapperContent}>{this.data.children}</div>
        <CloseButton onClose={() => this.data.close()} />
      </div>
    );
  }

  destroy() {
    document.body.style["overflow-y"] = "auto";
  }
}

class CloseButton extends b.Component<{ onClose: () => void }> {
  render() {
    return <div style={styles.closeContent}>X</div>;
  }
  onClick() {
    this.data.onClose();
    return true;
  }
}
