import { serviceApiRoot } from '../lib/commercetools-sdk';
import { ClientResponse } from '@commercetools/platform-sdk/dist/declarations/src/generated/shared/utils/common-types';
import { CustomerSignInResult, Customer } from '@commercetools/platform-sdk/dist/declarations/src/generated/';
import { CustomerDraft } from '@commercetools/platform-sdk/dist/declarations/src/generated/';
import { TIntrospectResponse } from './types';

class ServiceApi {
  public async introspectToken(token: string): Promise<TIntrospectResponse> {
    const authHost = process.env.VITE_CTP_AUTH_HOST || '';
    const clientId = process.env.VITE_CTP_SERVICE_CLIENT_ID || '';
    const clientSecret = process.env.VITE_CTP_SERVICE_CLIENT_SECRET || '';
    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + btoa(`${clientId}:${clientSecret}`));

    const res = await fetch(`${authHost}/oauth/introspect?token=${token}`, {
      method: 'POST',
      headers,
    }).then((response) => response.json() as Promise<TIntrospectResponse>);

    return res;
  }

  public async getCustomerById(id: string): Promise<ClientResponse<Customer>> {
    const res = await serviceApiRoot.customers().withId({ ID: id }).get().execute();

    return res;
  }

  public async createCustomer(customerData: CustomerDraft): Promise<ClientResponse<CustomerSignInResult>> {
    const res = await serviceApiRoot.customers().post({ body: customerData }).execute();

    return res;
  }

  public async deleteCustomer(ID: string, version: number): Promise<ClientResponse<Customer>> {
    const res = serviceApiRoot.customers().withId({ ID }).delete({ queryArgs: { version } }).execute();

    return res;
  }
}

export default new ServiceApi();
