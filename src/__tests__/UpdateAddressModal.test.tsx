import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from './test-utils';

import { UpdateAddressModal } from '../components/AddressModal/UpdateAddressModal';

describe('UpdateAddressModal', () => {
  const user = userEvent.setup();

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

  it('renders modal title and form', () => {
    renderWithProviders(
      <UpdateAddressModal open={true} setOpen={jest.fn()} customer={mockCustomer} address={mockAddress} />,
    );

    expect(screen.getByText('Update address')).toBeInTheDocument();
    expect(screen.getByTestId('submit-btn')).toBeInTheDocument();
  });

  it('closes modal when cancel button is clicked', async () => {
    const setOpenMock = jest.fn();
    renderWithProviders(
      <UpdateAddressModal open={true} setOpen={setOpenMock} customer={mockCustomer} address={mockAddress} />,
    );

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    await user.click(cancelButton);

    expect(setOpenMock).toHaveBeenCalledWith(false);
  });
});
