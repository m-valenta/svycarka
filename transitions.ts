import * as b from "bobril";

export const reservationTransition = b.createRedirectPush("reservation");
export const tipsTransition = b.createRedirectPush("tips");
export const defaultTransition = b.createRedirectPush("home");

export const loginTransition = b.createRedirectReplace("login");

export const adminHomeTransition = b.createRedirectReplace("adminHome");
export const adminUsersTransition = b.createRedirectReplace("adminUsers");
export const adminRegistrationsTransition = b.createRedirectReplace(
  "adminReservations"
);

export const accommodationRulesTransition = b.createRedirectReplace(
  "accommodationRules"
);
export const gdprTransition = b.createRedirectReplace("gdpr");


export function openRouteInNewTab(routeName: "gdpr" | "accommodationRules" | "reservation" | "tips" | "home"): void {
  let routeUrl = b.getRoutes().find((route) => route.name == routeName)
    ?.url;
  if (routeUrl === undefined) return;
  window.open(`/#${routeUrl}`, "_blank")?.focus();
}
