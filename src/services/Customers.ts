import spaApi from '../api/Spa';
import { TokenStoreTypes } from '../lib/commercetools-sdk';
import { clearTokenStore } from '../utils/localStorage';
import { isErrorResponse } from './utils';

class CustomersService {
  public async loginCustomer(email: string, password: string): Promise<void> {
    try {
      spaApi.obtainCustomerToken(email, password);
      await spaApi.loginCustomer(email, password);
    } catch (error) {
      if (isErrorResponse(error) && error.statusCode === 401) {
        clearTokenStore(TokenStoreTypes.SpaApi);
        window.location.replace('/login');
      }
    }
  }
}

export default new CustomersService();
