/**
 * @jest-environment node
 */
import serviceApi from '../api/Service';
import anonymousApi from '../api/Anonymous';
import spaApi from '../api/Spa';

const CREATED_TEST_CUSTOMER_EMAIL = process.env.VITE_CTP_CREATED_TEST_CUSTOMER_EMAIL || '';
const CREATED_TEST_CUSTOMER_PASSWORD = process.env.VITE_CTP_CREATED_TEST_CUSTOMER_PASSWORD || '';
const CREATED_TEST_API_CUSTOMER_EMAIL = process.env.VITE_CTP_CREATED_TEST_API_CUSTOMER_EMAIL || '';
const CREATED_TEST_API_CUSTOMER_PASSWORD = process.env.VITE_CTP_CREATED_TEST_API_CUSTOMER_PASSWORD || '';
const TEMP_CUSTOMER_EMAIL = 'temp@example.com';
const TEMP_CUSTOMER_PASSWORD = 'temp1234';

describe('service api', () => {
  it('creates and deletes a customer', async () => {
    const responseCreateCustomer = await serviceApi.createCustomer({
      email: TEMP_CUSTOMER_EMAIL,
      password: TEMP_CUSTOMER_PASSWORD,
    });
    const {
      body: {
        customer: { id, version },
      },
    } = responseCreateCustomer;

    expect(id).toBeDefined();
    expect(version).toBeDefined();

    const responseDeleteCustomer = await serviceApi.deleteCustomer(id, version);

    expect(responseDeleteCustomer.body.id).toEqual(id);
  });
});

describe('anonymous api', () => {
  it('logs a customer in', async () => {
    const responseLoginCustomer = await anonymousApi.login(
      CREATED_TEST_API_CUSTOMER_EMAIL,
      CREATED_TEST_API_CUSTOMER_PASSWORD,
    );

    expect(responseLoginCustomer.body.customer.email).toEqual(CREATED_TEST_API_CUSTOMER_EMAIL);
  });
});

describe('SPA api', () => {
  it('log a customer in', async () => {
    const responseLoginCustomer = await spaApi.loginCustomer(
      CREATED_TEST_CUSTOMER_EMAIL,
      CREATED_TEST_CUSTOMER_PASSWORD,
    );

    expect(responseLoginCustomer?.body.customer.email).toEqual(CREATED_TEST_CUSTOMER_EMAIL);
  });

  it('gets categories', async () => {
    const responseCategories = await spaApi.getCategories();

    expect(responseCategories?.body.results).toEqual(expect.any(Array));
  });

  it('gets products', async () => {
    const responseProducts = await spaApi.searchProductProjections();

    expect(responseProducts?.body.results).toEqual(expect.any(Array));
  });
});
