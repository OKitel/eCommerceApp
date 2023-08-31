import { screen } from '@testing-library/react';
import { AddressesAccordion } from '../components/AddressesAccordion/AddressAccordion';
import { renderWithProviders } from './test-utils';
describe('AddressesAccordion', () => {
  const mockAddress = {
    id: 'address123',
    streetName: '123 Main Street',
    city: 'Los Angeles',
    country: 'US',
  };

  const mockCustomer = {
    id: 'customer123',
    firstName: 'Customer',
    lastName: 'Test',
    password: '****nAs=',
    email: 'customer123@gmail.com',
    dateOfBirth: '1990-01-17',
    shippingAddressIds: ['address123'],
    billingAddressIds: [],
    defaultShippingAddressId: 'address123',
    defaultBillingAddressId: undefined,
    addresses: [mockAddress],
    version: 1,
    createdAt: '2023-08-31T00:00:00Z',
    lastModifiedAt: '2023-08-31T00:00:00Z',
    isEmailVerified: false,
    authenticationMode: 'Password',
  };

  it('renders shipping addresses', () => {
    renderWithProviders(<AddressesAccordion customer={mockCustomer} />);
    expect(screen.getByText('Shipping')).toBeInTheDocument();
    expect(screen.getByText(mockAddress.streetName)).toBeInTheDocument();
  });

  it('renders billing addresses', () => {
    renderWithProviders(
      <AddressesAccordion
        customer={{
          ...mockCustomer,
          addresses: [mockAddress],
          billingAddressIds: [mockAddress.id],
          shippingAddressIds: [],
        }}
      />,
    );
    expect(screen.getByText('Billing')).toBeInTheDocument();
    expect(screen.getByText(mockAddress.streetName)).toBeInTheDocument();
  });
});
