export enum ReservationState {
  All = -1,
  New = 0,
  WaitForApproval = 1,
  WaitForPayment = 2,
  Ready = 3,
  Denied = 4,
  NoCapacity = 5,
  Concluded = 10
}

const translations = ["Vše", "Nová rezervace", "Čeká na schválení", "Čeká na zálohu", "Aktivní", "Odmítnutá", "Není kapacita", "Dokončená"];

export function reservationStateToString(state: ReservationState): string {
  let cState = state + 1; 
  return cState >= 0 && cState < translations.length
    ? translations[cState]
    : "unknown";
}
