import * as b from "bobril";
import { appStore } from "../../data/appStore";
import { scrollSection, menuGap } from "./utils";

export class ScrollToWrapper extends b.Component<{
  id: scrollSection;
  children: b.IBobrilNode;
  useMenuGap?: boolean;
}> {
  render() {
    return this.data.children;
  }

  postUpdateDom(me: b.IBobrilCacheNode): void {
    this.markScrollPosition(me);
  }

  postInitDom(me: b.IBobrilCacheNode): void {
    this.markScrollPosition(me);
  }

  private markScrollPosition(me: b.IBobrilCacheNode): void {
    if (this.data.useMenuGap)
      appStore().pageStore.setScroolItemPosition(
        this.data.id,
        b.nodePagePos(me)[1] - menuGap
      );
    else
      appStore().pageStore.setScroolItemPosition(
        this.data.id,
        b.nodePagePos(me)[1]
      );
  }
}
