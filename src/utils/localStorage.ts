import { TokenStore } from '@commercetools/sdk-client-v2';

import { TokenStoreTypes } from '../lib/commercetools-sdk';
import { TSettings } from '../types';
import { isCurrency, isLocalization } from './typesUtils';

const LS_KEY_LOGGED_IN_CUSTOMER_ID = 'loggedInCustomerId';
const LS_KEY_LOCALIZATION = 'localization';
const LS_KEY_CURRENCY = 'currency';
const LS_KEY_APPLIED_DISCOUNT_CODE = 'appliedDiscountCode';

function isTokenStore(object: unknown): object is TokenStore {
  if (
    typeof object === 'object' &&
    object !== null &&
    object.hasOwnProperty('token') &&
    object.hasOwnProperty('expirationTime')
  ) {
    return true;
  }

  return false;
}

export function saveTokenStore(tokenStoreType: TokenStoreTypes, tokenStore: TokenStore): void {
  localStorage.setItem(tokenStoreType, JSON.stringify(tokenStore));
}

export function getTokenStore(tokenStoreType: TokenStoreTypes): TokenStore {
  const tokenStoreStringified = localStorage.getItem(tokenStoreType);

  if (tokenStoreStringified) {
    const tokenStore = JSON.parse(tokenStoreStringified);

    if (isTokenStore(tokenStore)) {
      return tokenStore;
    }
  }

  return { expirationTime: -1, token: '' };
}

export function clearTokenStore(tokenStoreType: TokenStoreTypes): void {
  localStorage.removeItem(tokenStoreType);
}

export function getSettings(): TSettings {
  const settings: TSettings = { localization: undefined, currency: undefined };
  const localization = localStorage.getItem(LS_KEY_LOCALIZATION);
  const currency = localStorage.getItem(LS_KEY_CURRENCY);

  if (localization && isLocalization(localization)) {
    settings.localization = localization;
  }

  if (currency && isCurrency(currency)) {
    settings.currency = currency;
  }

  return settings;
}

export function saveSettings({ localization, currency }: TSettings): void {
  if (localization) {
    localStorage.setItem(LS_KEY_LOCALIZATION, localization);
  }

  if (currency) {
    localStorage.setItem(LS_KEY_CURRENCY, currency);
  }
}

export function saveLoggedInCustomerId(id: string): void {
  localStorage.setItem(LS_KEY_LOGGED_IN_CUSTOMER_ID, id);
}

export function getLoggedInCustomerId(): string | null {
  return localStorage.getItem(LS_KEY_LOGGED_IN_CUSTOMER_ID);
}

export function clearLoggedInCustomerId(): void {
  localStorage.removeItem(LS_KEY_LOGGED_IN_CUSTOMER_ID);
}

export function saveAppliedDiscountCode(id: string): void {
  localStorage.setItem(LS_KEY_APPLIED_DISCOUNT_CODE, id);
}

export function getAppliedDiscountCode(): string | null {
  return localStorage.getItem(LS_KEY_APPLIED_DISCOUNT_CODE);
}

export function clearAppliedDiscountCode(): void {
  localStorage.removeItem(LS_KEY_APPLIED_DISCOUNT_CODE);
}
