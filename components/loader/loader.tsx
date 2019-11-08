import * as b from "bobril";
import * as styles from "./loaderStyle";

export interface ILoaderData {
  children: b.IBobrilChild;
  storeWithLoading: { isLoading: boolean };
}

export class Loader extends b.Component<ILoaderData> {
  render(): b.IBobrilNode {
    if (!this.data.storeWithLoading.isLoading) return <>{this.data.children}</>;

    return (
      <div style={styles.loaderWrapper}>
        {[this.data.children, <div style={styles.loaderContent}></div>]}
      </div>
    );
  }
}
