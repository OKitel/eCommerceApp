/**
 * @jest-environment node
 */
import { serviceApiRoot, anonymousApiRoot, spaApiRoot } from '../lib/commercetools-sdk';

const CREATED_TEST_CUSTOMER_EMAIL = process.env.VITE_CTP_CREATED_TEST_CUSTOMER_EMAIL || '';
const CREATED_TEST_CUSTOMER_PASSWORD = process.env.VITE_CTP_CREATED_TEST_CUSTOMER_PASSWORD || '';

describe('service api builder', () => {
  it('gets customers', async () => {
    const responseGetCustomers = await serviceApiRoot.customers().get().execute();

    expect(responseGetCustomers.body.results).toEqual(expect.any(Array));
  });
});

describe('anonymous api builder', () => {
  it('gets products', async () => {
    const responseGetProducts = await anonymousApiRoot.products().get().execute();

    expect(responseGetProducts.body.results).toEqual(expect.any(Array));
  });

  it('logs customer in', async () => {
    const responseLoginCustomer = await anonymousApiRoot
      .me()
      .login()
      .post({ body: { email: CREATED_TEST_CUSTOMER_EMAIL, password: CREATED_TEST_CUSTOMER_PASSWORD } })
      .execute();

    expect(responseLoginCustomer.body.customer.email).toEqual(CREATED_TEST_CUSTOMER_EMAIL);
  });
});

describe('SPA api builder', () => {
  it('gets products', async () => {
    const responseGetProducts = await spaApiRoot.products().get().execute();

    expect(responseGetProducts.body.results).toEqual(expect.any(Array));
  });
});
