import { getSpaApiRoot } from '../lib/commercetools-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { ClientResponse } from '@commercetools/platform-sdk/dist/declarations/src/generated/shared/utils/common-types';
import { CustomerSignInResult } from '@commercetools/platform-sdk/dist/declarations/src/generated/';

class SpaApi {
  private customerApiRoot: ByProjectKeyRequestBuilder | null = null;

  public async loginCustomer(email: string, password: string): Promise<ClientResponse<CustomerSignInResult>> {
    if (!this.customerApiRoot) {
      this.customerApiRoot = getSpaApiRoot(email, password);
    }
    const res = await this.customerApiRoot.me().login().post({ body: { email, password } }).execute();

    return res;
  }

  // public logout(token) {} // TODO via revoking token
}

export default new SpaApi();
