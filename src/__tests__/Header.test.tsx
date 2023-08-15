import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Header } from '../components/Header/Header';

test('Render Header correctly', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <Header />
    </MemoryRouter>,
  );
  expect(screen.getByText('Maestro')).toBeInTheDocument();
});

test('click Login button to show Logout button', async () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <Header />
    </MemoryRouter>,
  );

  await userEvent.click(screen.getByText('Login'));
  expect(screen.getByText('Logout')).toBeInTheDocument();
});
