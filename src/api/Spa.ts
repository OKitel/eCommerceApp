import { ClientResponse } from '@commercetools/platform-sdk/dist/declarations/src/generated/shared/utils/common-types';
import {
  Cart,
  CategoryPagedQueryResponse,
  CustomerSignInResult,
  MyCartUpdateAction,
  Product,
  ProductProjectionPagedQueryResponse,
  ProductType,
} from '@commercetools/platform-sdk/dist/declarations/src/generated/';

import { retry } from './utils';
import { TProductTypes } from '../types';
import { ProductProjectionSearchQueryArgs } from './types';
import {
  TokenStoreTypes,
  getSpaApiRootWithPasswordFlow,
  spaApiRoot,
  spaApiWithTokenRoot,
} from '../lib/commercetools-sdk';

class SpaApi {
  public async loginCustomer(
    email: string,
    password: string,
  ): Promise<ClientResponse<CustomerSignInResult> | undefined> {
    const apiRoot = getSpaApiRootWithPasswordFlow(email, password);

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

  public async getProductById(ID: string): Promise<ClientResponse<Product>> {
    const res = await retry<ClientResponse<Product>>(
      () => spaApiRoot.products().withId({ ID }).get().execute(),
      TokenStoreTypes.SpaApiTokenStore,
    );

    return res;
  }

  public async searchProductProjections(
    queryArgs?: ProductProjectionSearchQueryArgs,
  ): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> {
    const res = await retry<ClientResponse<ProductProjectionPagedQueryResponse>>(
      () => spaApiRoot.productProjections().search().get({ queryArgs }).execute(),
      TokenStoreTypes.SpaApiTokenStore,
    );

    return res;
  }

  public async getProductTypeByKey(key: keyof TProductTypes): Promise<ClientResponse<ProductType>> {
    const res = await retry<ClientResponse<ProductType>>(
      () => spaApiRoot.productTypes().withKey({ key }).get().execute(),
      TokenStoreTypes.SpaApiTokenStore,
    );

    return res;
  }

  public async getActiveCart(): Promise<ClientResponse<Cart>> {
    const res = spaApiWithTokenRoot.me().activeCart().get().execute();

    return res;
  }

  public async updateCart(
    cartId: string,
    cartVersion: number,
    updateActions: MyCartUpdateAction[],
  ): Promise<ClientResponse<Cart>> {
    const res = await spaApiWithTokenRoot
      .me()
      .carts()
      .withId({ ID: cartId })
      .post({ body: { version: cartVersion, actions: updateActions } })
      .execute();

    return res;
  }

  // public logout(token) {} // TODO via revoking token
}

export default new SpaApi();
