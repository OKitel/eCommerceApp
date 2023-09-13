import { ClientResponse } from '@commercetools/platform-sdk/dist/declarations/src/generated/shared/utils/common-types';
import {
  Cart,
  CustomerSignInResult,
  MyCartUpdateAction,
} from '@commercetools/platform-sdk/dist/declarations/src/generated/';

import { retry } from './utils';

import { TokenStoreTypes, anonymousApiRoot } from '../lib/commercetools-sdk';

class AnonymousApi {
  public async loginCustomer(email: string, password: string): Promise<ClientResponse<CustomerSignInResult>> {
    const res = await retry<ClientResponse<CustomerSignInResult>>(
      () => anonymousApiRoot.me().login().post({ body: { email, password } }).execute(),
      TokenStoreTypes.AnonymousApiTokenStore,
    );

    return res;
  }

  public async getActiveCart(): Promise<ClientResponse<Cart>> {
    const res = await anonymousApiRoot.me().activeCart().get().execute();

    return res;
  }

  public async updateCart(
    cartId: string,
    cartVersion: number,
    updateActions: MyCartUpdateAction[],
  ): Promise<ClientResponse<Cart>> {
    const res = await anonymousApiRoot
      .me()
      .carts()
      .withId({ ID: cartId })
      .post({ body: { version: cartVersion, actions: updateActions } })
      .execute();

    return res;
  }
}

export default new AnonymousApi();
