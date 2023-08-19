import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Header } from '../components/Header/Header';
import { renderWithProviders } from './test-utils';

test('Render Header correctly', () => {
  renderWithProviders(
    <MemoryRouter initialEntries={['/']}>
      <Header />
    </MemoryRouter>,
  );
  expect(screen.getByText('Maestro')).toBeInTheDocument();
});
