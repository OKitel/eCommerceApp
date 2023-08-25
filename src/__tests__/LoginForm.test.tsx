import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from './test-utils';
import { LoginForm } from '../components/LoginForm/LoginForm';
import { debug } from 'jest-preview';
import { LINKS } from '../components/consts';

describe('Login form validation', () => {
  const user = userEvent.setup();
  const renderComponent = (): void => {
    renderWithProviders(
      <MemoryRouter initialEntries={[LINKS.login]}>
        <LoginForm />
      </MemoryRouter>,
    );
  };
  test('Login form required validation', async () => {
    renderComponent();
    await user.click(screen.getByTestId('submit-btn'));
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Password is required')).toBeInTheDocument();
  });

  test('Login form invalid email validation', async () => {
    renderComponent();
    const emailInput = screen.getByTestId('email').querySelector('input');
    if (emailInput) await user.type(emailInput, 'invalid-email');
    await user.click(screen.getByTestId('submit-btn'));
    expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
  });

  test('Login form valid email validation', async () => {
    renderComponent();
    const emailInput = screen.getByTestId('email').querySelector('input');
    if (emailInput) await user.type(emailInput, 'test@gmail.com');
    await user.click(screen.getByTestId('submit-btn'));
    expect(screen.queryByText('Please enter a valid email address')).not.toBeInTheDocument();
  });

  test('Login form invalid password validation', async () => {
    renderComponent();
    debug();
    const passwordInput = screen.getByTestId('password').querySelector('input');
    if (passwordInput) await user.type(passwordInput, 'invalidpassword');
    await user.click(screen.getByTestId('submit-btn'));
    expect(
      screen.getByText(
        'Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character',
      ),
    ).toBeInTheDocument();
  });
  test('Login form valid password validation', async () => {
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
