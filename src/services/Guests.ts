import ServiceApi from '../api/Service';
import { RegistrationRequest } from './types';

class GuestsService {
  public async registerCustomer(request: RegistrationRequest): Promise<void> {
    try {
      await ServiceApi.createCustomer(request);
    } catch (error) {
      // TODO show error message in UI ECA-64 https://alobovskiy-1691010266635.atlassian.net/browse/ECA-64
    }
  }
}

export default new GuestsService();
