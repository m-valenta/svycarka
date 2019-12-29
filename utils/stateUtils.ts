export enum ReservationState {
  New = 0,
  WaitForApproval = 1,
  WaitForPayment = 2,
  Ready = 3
}

const translations = ["Nová rezervace", "Čeká na schválení", "Čeká na zálohu", "Aktivní"];

export function reservationStateToString(state: ReservationState): string {
  return state >= 0 && state < translations.length
    ? translations[state]
    : "unknown";
}
