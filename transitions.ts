import * as b from "bobril";

export const reservationTransition = b.createRedirectPush("reservation");
export const tipsTransition = b.createRedirectPush("tips");
export const defaultTransition = b.createRedirectPush("home");

export const loginTransition = b.createRedirectReplace("login");

export const adminHomeTransition = b.createRedirectReplace("adminHome");
export const adminUsersTransition = b.createRedirectReplace("adminUsers");
export const adminRegistrationsTransition = b.createRedirectReplace("adminReservations");