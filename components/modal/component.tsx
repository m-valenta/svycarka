import * as b from "bobril";
import * as styles from "./style";

export interface IData {
  children: b.IBobrilChild;
  close: () => void;
}

export class Modal extends b.Component<IData> {
  init() {
    document.body.style["overflow-y"] = "hidden";
  }

  render() {
    const children: b.IBobrilChild[] = [
      <CloseButton onClose={() => this.data.close()} />,
      this.data.children
    ];

    return (
      <div style={styles.wrapper}>
        <div style={styles.wrapperContent}>{children}</div>
      </div>
    );
  }

  destroy() {
    document.body.style["overflow-y"] = "auto";
  }
}

class CloseButton extends b.Component<{ onClose: () => void }> {
  render() {
    return <div style={styles.closeContent} />;
  }
  onClick() {
    this.data.onClose();
    return true;
  }
}
