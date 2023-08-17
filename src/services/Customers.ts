import spaApi from '../api/Spa';

class CustomersService {
  public loginCustomer(email: string, password: string): void {
    spaApi.obtainCustomerToken(email, password);
    spaApi.loginCustomer(email, password);
  }
}

export default new CustomersService();
