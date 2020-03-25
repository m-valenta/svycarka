import { appStore } from "../../data/appStore";
import { menuHeight } from "../../styleConstants";

export declare type scrollSection = "tips" | "header" | "contact" | "at_us" | "how_much" |"location" | "admin_edit";
export const menuGap = menuHeight + 30;

export function scrollToWrapper(id: scrollSection): void {
	appStore().resetPageState();
	
    const wrapperY = appStore().pageStore.getScrollItemPosition(id);
    if(wrapperY === undefined) {
        return;
    }

	const step = (wrapperY - window.scrollY) / 6;
    doScroll(step, 30, 6);
}

export function debounce(func: () => void, wait: number, immediate: boolean): () => void {
	let timeout: number;
	return function() {
		let context = this, args = arguments;
		let later: () => void = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		let callNow: boolean = immediate && !timeout;
		window.clearTimeout(timeout);
		timeout = window.setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

function doScroll(step: number, timeout: number, repNum: number) {
    window.scroll(window.screenX, window.scrollY + step);
    if(repNum > 1) {
        window.setTimeout(() => doScroll(step, timeout, repNum - 1), timeout);
    }
}