import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PersonalInfoSection } from '../components/PersonalInfoSection/PersonalInfoSection';
import { renderWithProviders } from './test-utils';

describe('PersonalInfoSection', () => {
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

  it('renders personal information and edit button', () => {
    renderWithProviders(<PersonalInfoSection customer={mockCustomer} />);

    expect(screen.getByText('Personal Information')).toBeInTheDocument();
    expect(screen.getByTestId('edit-person-btn')).toBeInTheDocument();
  });

  it('clicking edit button enables edit mode', async () => {
    renderWithProviders(<PersonalInfoSection customer={mockCustomer} />);

    const editButton = screen.getByTestId('edit-person-btn');
    await user.click(editButton);

    expect(screen.getByLabelText('First Name')).toBeEnabled();
    expect(screen.getByLabelText('Last Name')).toBeEnabled();
    expect(screen.getByLabelText('Email')).toBeEnabled();
    expect(screen.getByTestId('cancel-person-btn')).toBeInTheDocument();
    expect(screen.getByTestId('submit-btn')).toBeInTheDocument();
  });
});
