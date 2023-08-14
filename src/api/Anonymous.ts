import { anonymousApiRoot } from '../lib/commercetools-sdk';
import { ClientResponse } from '@commercetools/platform-sdk/dist/declarations/src/generated/shared/utils/common-types';
import { CustomerSignInResult } from '@commercetools/platform-sdk/dist/declarations/src/generated/';

class AnonymousApi {
  public login(email: string, password: string): Promise<ClientResponse<CustomerSignInResult>> {
    return anonymousApiRoot.me().login().post({ body: { email, password } }).execute();
  }
}

export default new AnonymousApi();
