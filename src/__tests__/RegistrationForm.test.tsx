import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from './test-utils';
import { RegistrationForm } from '../components/RegistrationForm/RegistrationForm';
import { debug } from 'jest-preview';

// eslint-disable-next-line max-lines-per-function
describe('Registration form validation', () => {
  test('Registration form required validation', async () => {
    console.log('test 1');
    const user = userEvent.setup();
    renderWithProviders(
      <MemoryRouter initialEntries={['/registration']}>
        <RegistrationForm />
      </MemoryRouter>,
    );
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
    console.log('test 2');
    const user = userEvent.setup();
    renderWithProviders(
      <MemoryRouter initialEntries={['/registration']}>
        <RegistrationForm />
      </MemoryRouter>,
    );

    const emailInput = screen.getByTestId('email').querySelector('input');
    if (emailInput) await user.type(emailInput, 'invalid-email');
    await user.click(screen.getByTestId('submit-btn'));
    debug();
    expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
  });
});
