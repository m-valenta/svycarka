import { appStore } from "../../data/appStore";

export declare type scrollSection = "tips" | "header";

export function scrollToWrapper(id: scrollSection): void {
    const wrapperY = appStore().pageStore.getScrollItemPosition(id);
    if(wrapperY === undefined) {
        return;
    }

    window.scrollTo(window.scrollX, wrapperY);
}