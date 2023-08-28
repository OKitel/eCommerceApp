import { TokenStore } from '@commercetools/sdk-client-v2';
import { TokenStoreTypes } from '../lib/commercetools-sdk';

const LS_KEY_LOGGED_IN_CUSTOMER_ID = 'loggedInCustomerId';

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

export function saveLoggedInCustomerId(id: string): void {
  localStorage.setItem(LS_KEY_LOGGED_IN_CUSTOMER_ID, id);
}

export function getLoggedInCustomerId(): string | null {
  return localStorage.getItem(LS_KEY_LOGGED_IN_CUSTOMER_ID);
}

export function clearLoggedInCustomerId(): void {
  localStorage.removeItem(LS_KEY_LOGGED_IN_CUSTOMER_ID);
}
