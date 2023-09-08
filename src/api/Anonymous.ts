import { ClientResponse } from '@commercetools/platform-sdk/dist/declarations/src/generated/shared/utils/common-types';
import { CustomerSignInResult } from '@commercetools/platform-sdk/dist/declarations/src/generated/';

import { retry } from './utils';

import { TokenStoreTypes, anonymousApiRoot } from '../lib/commercetools-sdk';

class AnonymousApi {
  public async login(email: string, password: string): Promise<ClientResponse<CustomerSignInResult>> {
    const res = await retry<ClientResponse<CustomerSignInResult>>(
      () => anonymousApiRoot.me().login().post({ body: { email, password } }).execute(),
      TokenStoreTypes.AnonymousApiTokenStore,
    );

    return res;
  }
}

export default new AnonymousApi();
