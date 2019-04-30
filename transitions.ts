import * as b from "bobril";

export const reservationTransition = b.createRedirectPush("reservation");
export const tipsTransition = b.createRedirectPush("tips");
export const defaultTransition = b.createRedirectPush("");
