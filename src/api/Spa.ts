import { getSpaApiRoot } from '../lib/commercetools-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { ClientResponse } from '@commercetools/platform-sdk/dist/declarations/src/generated/shared/utils/common-types';
import { CustomerSignInResult } from '@commercetools/platform-sdk/dist/declarations/src/generated/';

class SpaApi {
  private customerApiRoot: ByProjectKeyRequestBuilder | null = null;

  public obtainCustomerToken(username: string, password: string): void {
    this.customerApiRoot = getSpaApiRoot(username, password);
  }

  public loginCustomer(email: string, password: string): Promise<ClientResponse<CustomerSignInResult>> | undefined {
    if (this.customerApiRoot) {
      const res = this.customerApiRoot.me().login().post({ body: { email, password } }).execute();

      return res;
    }
  }

  // public logout(token) {} // TODO via revoking token
}

export default new SpaApi();
