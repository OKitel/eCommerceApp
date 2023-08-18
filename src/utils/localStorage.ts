import { TokenStore } from '@commercetools/sdk-client-v2';
import { TokenStoreTypes } from '../lib/commercetools-sdk';

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
