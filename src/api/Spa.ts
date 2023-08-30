import { TokenStoreTypes, getSpaApiRootWithPasswordFlow, spaApiRoot } from '../lib/commercetools-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { ClientResponse } from '@commercetools/platform-sdk/dist/declarations/src/generated/shared/utils/common-types';
import {
  CategoryPagedQueryResponse,
  CustomerSignInResult,
} from '@commercetools/platform-sdk/dist/declarations/src/generated/';
import { retry } from './utils';

class SpaApi {
  private spaApiRoot: ByProjectKeyRequestBuilder | null = null;

  public async loginCustomer(
    email: string,
    password: string,
  ): Promise<ClientResponse<CustomerSignInResult> | undefined> {
    if (!this.spaApiRoot) {
      this.spaApiRoot = getSpaApiRootWithPasswordFlow(email, password);
    }

    const apiRoot = this.spaApiRoot;

    const res = await retry<ClientResponse<CustomerSignInResult>>(
      () => apiRoot.me().login().post({ body: { email, password } }).execute(),
      TokenStoreTypes.SpaApiTokenStore,
    );

    return res;
  }

  public async getCategories(): Promise<ClientResponse<CategoryPagedQueryResponse>> {
    const res = await retry<ClientResponse<CategoryPagedQueryResponse>>(
      () =>
        spaApiRoot
          .categories()
          .get({ queryArgs: { limit: 40 } })
          .execute(),
      TokenStoreTypes.SpaApiTokenStore,
    );

    return res;
  }

  // public logout(token) {} // TODO via revoking token
}

export default new SpaApi();
