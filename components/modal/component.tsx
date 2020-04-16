import * as b from "bobril";
import * as styles from "./style";

export interface IData {
  children: b.IBobrilChild;
  horizontalCentered?: boolean;
  close: () => void;
}

export class Modal extends b.Component<IData> {
  init() {
    document.body.style["overflow-y"] = "hidden";
  }

  render() {
    const children: b.IBobrilChild[] = [
      <CloseButton
        horizontalCentered={this.data.horizontalCentered ?? false}
        onClose={() => this.data.close()}
      />,
      this.data.children,
    ];

    return (
      <div style={styles.wrapper}>
        <div style={styles.wrapperContent}>{children}</div>
      </div>
    );
  }

  postUpdateDom(me: b.IBobrilCacheNode) {
    (b.getDomNode(me) as Element).scrollTo(0, 0);
  }

  destroy() {
    document.body.style["overflow-y"] = "auto";
  }
}

class CloseButton extends b.Component<{
  horizontalCentered: boolean;
  onClose: () => void;
}> {
  render() {
    return (
      <div
        style={
          this.data.horizontalCentered
            ? styles.closeContentCentered
            : styles.closeContent
        }
      />
    );
  }
  onClick() {
    this.data.onClose();
    return true;
  }
}
