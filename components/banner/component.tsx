import * as b from "bobril";
import * as styles from "./styles";
import { t } from "bobril-g11n";
import { scrollToWrapper, debounce } from "../scrollToWrapper/utils";
import { appStore } from "../../data/appStore";

export class Banner extends b.Component {
  render() {
    return (
      <div style={styles.wrapper}>
        <Logo/>
        <div style={styles.textWrapper}>
          <div style={styles.textContent}>
            {t(
              "Chalupa Švýcarka is located in the border village of Olešnice in the Orlické Mountains. We recognized her as an impoverished old lady who charmed us mainly with the surrounding nature and a certain genius loci. We would like you to discover her magic. That is why we have gradually reconstructed it and in 2018 opened the door to the first visitors. We will be glad when you visit us and feel the magic of it."
            )}
          </div>
        </div>
        <div style={styles.arrow} onClick={this.scrollToTips}/>
      </div>
    );
  }

  @b.bind
  private scrollToTips(): boolean {
    scrollToWrapper("tips");
    return true;
  }
}

class Logo extends b.Component
{
  private endPosition: number = 0; 
  private debouncedWindowScroll: () => void;

  init() {
    this.endPosition = 0; 
    this.debouncedWindowScroll = debounce(this.onWindowScroll, 100, false);
    window.addEventListener('scroll', this.debouncedWindowScroll);
  }

  destroy() {
    window.removeEventListener("scroll", this.debouncedWindowScroll);
    appStore().pageStore.forceShowTree = false;
  }

  render() {
    return <div style={styles.logo} />
  }

  postUpdateDom(me: b.IBobrilCacheNode): void {
    this.getNodeEndPosition(me);
  }

  postInitDom(me: b.IBobrilCacheNode): void {
    this.getNodeEndPosition(me);
  }

  private getNodeEndPosition(me: b.IBobrilCacheNode) {
    this.endPosition = b.nodePagePos(me)[1];
    this.endPosition = this.endPosition + (b.getDomNode(me) as Element).getBoundingClientRect().height;
  }

  @b.bind
  private onWindowScroll() {
    appStore().pageStore.forceShowTree = window.scrollY > this.endPosition;
  }
}