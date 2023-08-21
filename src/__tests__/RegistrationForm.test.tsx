import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from './test-utils';
import { RegistrationForm } from '../components/RegistrationForm/RegistrationForm';

// eslint-disable-next-line max-lines-per-function
describe('Registration form validation', () => {
  const user = userEvent.setup();

  const renderComponent = (): void => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/registration']}>
        <RegistrationForm />
      </MemoryRouter>,
    );
  };

  const selectCountry = async (inputId: string, country: string): Promise<void> => {
    const countryInput = screen.getByTestId(inputId).querySelector('[role="button"]');
    if (countryInput) {
      await user.click(countryInput);
      const usa = screen.getByText(country);
      await user.click(usa);
    }
  };

  test('Registration form required validation', async () => {
    renderComponent();
    await user.click(screen.getByTestId('submit-btn'));
    expect(screen.getAllByText('Name is required')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Last name is required')[0]).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Password is required')).toBeInTheDocument();
    expect(screen.getByText('Date of Birth is required')).toBeInTheDocument();
    expect(screen.getAllByText('Street is required')[0]).toBeInTheDocument();
    expect(screen.getAllByText('City is required')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Country is required')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Postcode is required')[0]).toBeInTheDocument();
  });

  test('Registration form invalid email validation', async () => {
    renderComponent();
    const emailInput = screen.getByTestId('email').querySelector('input');
    if (emailInput) await user.type(emailInput, 'invalid-email');
    await user.click(screen.getByTestId('submit-btn'));
    expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
  });

  test('Registration form valid email validation', async () => {
    renderComponent();
    const emailInput = screen.getByTestId('email').querySelector('input');
    if (emailInput) await user.type(emailInput, 'test@gmail.com');
    await user.click(screen.getByTestId('submit-btn'));
    expect(screen.queryByText('Please enter a valid email address')).not.toBeInTheDocument();
  });

  test('Registration form invalid first name validation', async () => {
    renderComponent();
    const firstNameInput = screen.getByTestId('name').querySelector('input');
    if (firstNameInput) await user.type(firstNameInput, '123');
    await user.click(screen.getByTestId('submit-btn'));
    expect(screen.getByText('Only letters allowed')).toBeInTheDocument();
  });

  test('Registration form valid first name validation', async () => {
    renderComponent();
    const firstNameInput = screen.getByTestId('name').querySelector('input');
    if (firstNameInput) await user.type(firstNameInput, 'John');
    await user.click(screen.getByTestId('submit-btn'));
    expect(screen.queryByText('Only letters allowed')).not.toBeInTheDocument();
  });
  test('Registration form invalid last name validation', async () => {
    renderComponent();
    const firstNameInput = screen.getByTestId('surname').querySelector('input');
    if (firstNameInput) await user.type(firstNameInput, '!fjkO23');
    await user.click(screen.getByTestId('submit-btn'));
    expect(screen.getByText('Only letters allowed')).toBeInTheDocument();
  });

  test('Registration form valid first name validation', async () => {
    renderComponent();
    const firstNameInput = screen.getByTestId('surname').querySelector('input');
    if (firstNameInput) await user.type(firstNameInput, 'Doe');
    await user.click(screen.getByTestId('submit-btn'));
    expect(screen.queryByText('Only letters allowed')).not.toBeInTheDocument();
  });

  test('Registration form invalid password validation', async () => {
    renderComponent();
    const passwordInput = screen.getByTestId('password').querySelector('input');
    if (passwordInput) await user.type(passwordInput, 'invalidpassword');
    await user.click(screen.getByTestId('submit-btn'));
    expect(
      screen.getByText(
        'Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character',
      ),
    ).toBeInTheDocument();
  });

  test('Registration form valid password validation', async () => {
    renderComponent();
    const passwordInput = screen.getByTestId('password').querySelector('input');
    if (passwordInput) await user.type(passwordInput, 'ValidPass123!');
    await user.click(screen.getByTestId('submit-btn'));
    expect(
      screen.queryByText(
        'Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character',
      ),
    ).not.toBeInTheDocument();
  });

  test('Registration form invalid date of birth validation (age < 13)', async () => {
    renderComponent();
    const dobInput = screen.getByPlaceholderText('MM/DD/YYYY');
    if (dobInput) await user.type(dobInput, '01012011');
    await user.click(screen.getByTestId('submit-btn'));
    expect(screen.getByText('You must be at least 13 years old')).toBeInTheDocument();
  });

  test('Registration form valid date of birth validation', async () => {
    renderComponent();
    const dobInput = screen.getByPlaceholderText('MM/DD/YYYY');
    if (dobInput) await user.type(dobInput, '01011990');
    await user.click(screen.getByTestId('submit-btn'));
    expect(screen.queryByText('You must be at least 13 years old')).not.toBeInTheDocument();
  });

  test('Registration form valid street validation', async () => {
    renderComponent();
    const shippingStreet = screen.getByTestId('street').querySelector('input');
    if (shippingStreet) await user.type(shippingStreet, '123 Main St');
    const billingStreet = screen.getByTestId('billingStreet').querySelector('input');
    if (billingStreet) await user.type(billingStreet, '123 Main St');
    await user.click(screen.getByTestId('submit-btn'));
    expect(screen.queryByText('Street is required')).not.toBeInTheDocument();
  });

  test('Registration form invalid city validation', async () => {
    renderComponent();
    const cityInput = screen.getByTestId('city').querySelector('input');
    if (cityInput) await user.type(cityInput, '123');
    await user.click(screen.getByTestId('submit-btn'));
    expect(screen.getByText('Only letters allowed')).toBeInTheDocument();
  });

  test('Registration form valid city validation', async () => {
    renderComponent();
    const cityInput = screen.getByTestId('city').querySelector('input');
    if (cityInput) await user.type(cityInput, 'New York');
    await user.click(screen.getByTestId('submit-btn'));
    expect(screen.queryByText('Only letters allowed')).not.toBeInTheDocument();
  });

  test('Registration form valid country validation', async () => {
    renderComponent();

    // select USA in shipping country dropdown
    await selectCountry('country', 'USA');

    // select Austria in billing country dropdown
    await selectCountry('billingCountry', 'Austria');

    // click REGISTER
    await user.click(screen.getByTestId('submit-btn'));

    expect(screen.queryByText('Country is required')).not.toBeInTheDocument();
  });

  test('Registration form invalid postcode validation', async () => {
    renderComponent();

    // select USA in shipping country dropdown
    await selectCountry('country', 'USA');

    // enter postcode
    const postcodeInput = screen.getByTestId('postcode').querySelector('input');
    if (postcodeInput) await user.type(postcodeInput, '123');

    // click REGISTER
    await user.click(screen.getByTestId('submit-btn'));

    expect(screen.getByText('Invalid postcode for provided country')).toBeInTheDocument();
  });

  test('Registration form valid postcode validation', async () => {
    renderComponent();

    // select USA in shipping country dropdown
    await selectCountry('country', 'USA');

    // enter postcode
    const postcodeInput = screen.getByTestId('postcode').querySelector('input');
    if (postcodeInput) await user.type(postcodeInput, '12345');

    // click REGISTER
    await user.click(screen.getByTestId('submit-btn'));

    expect(screen.queryByText('Invalid postcode for provided country')).not.toBeInTheDocument();
  });
});
