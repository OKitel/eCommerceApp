import { serviceApiRoot } from '../lib/commercetools-sdk';
import { ClientResponse } from '@commercetools/platform-sdk/dist/declarations/src/generated/shared/utils/common-types';
import { CustomerSignInResult } from '@commercetools/platform-sdk/dist/declarations/src/generated/';
import { CustomerDraft } from '@commercetools/platform-sdk/dist/declarations/src/generated/';

class ServiceApi {
  public createCustomer(customerData: CustomerDraft): Promise<ClientResponse<CustomerSignInResult>> {
    return serviceApiRoot.customers().post({ body: customerData }).execute();
  }
}

export default new ServiceApi();
