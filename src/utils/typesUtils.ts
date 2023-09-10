import { countries } from '../consts';
import { Currencies, Localizations } from '../types';

export function isLocalization(value: string): value is Localizations {
  if (typeof value === 'string' && Object.values(Localizations).includes(value as Localizations)) {
    return true;
  }

  return false;
}

export function isCurrency(value: string): value is Currencies {
  if (typeof value === 'string' && Object.values(Currencies).includes(value as Currencies)) {
    return true;
  }

  return false;
}

const isCountryCode = (code: string): code is keyof typeof countries => {
  return code in countries;
};

export const getCountryByCode = (code: string): string => {
  if (isCountryCode(code)) {
    return countries[code];
  }
  return code;
};
