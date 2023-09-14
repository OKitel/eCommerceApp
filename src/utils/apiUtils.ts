import spaApi from '../api/Spa';
import anonymousApi from '../api/Anonymous';
import { getTokenStore } from './localStorage';
import { TokenStoreTypes } from '../lib/commercetools-sdk';

export function chooseApiWithToken(): typeof spaApi | typeof anonymousApi | undefined {
  const spaApiTokenStore = getTokenStore(TokenStoreTypes.SpaApiTokenStore);

  if (spaApiTokenStore.token) {
    return spaApi;
  }

  return anonymousApi;
}
