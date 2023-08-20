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
});
