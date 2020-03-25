import { IReservation } from "./types";

const phoneNumberRegex =  /^(?:\+\d{1,3}|0\d{1,3}|00\d{1,2})?(?:\s?\(\d+\))?(?:[-\/\s.]|\d)+$/
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

export function validateReservation(
  reservation: IReservation | undefined
): boolean {
  return reservation !== undefined;
}

export function validateName(name: string | undefined): boolean {
  return name !== undefined && name.length > 0;
}

export function validateAddress(address: string | undefined): boolean {
  return address !== undefined && address.length > 0;
}

export function validateEmail(email: string | undefined): boolean {
  return (
    email !== undefined && email.length > 0 && emailRegex.test(email)
  );
}

export function validatePhone(phone: string | undefined): boolean {
  return (
    phone !== undefined && phone.length > 0 && phoneNumberRegex.test(phone)
  );
}

export function validateAgreement(agreement: boolean | undefined): boolean {
  return agreement !== undefined && agreement;
}

export function validateGC(gcResponse: string): boolean {
  return gcResponse !== undefined && gcResponse !== "";
}
