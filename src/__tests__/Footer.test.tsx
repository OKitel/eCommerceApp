import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Footer } from '../components/Footer/Footer';
import { renderWithProviders } from './test-utils';

test('Render Header correctly', () => {
  renderWithProviders(
    <MemoryRouter initialEntries={['/']}>
      <Footer />
    </MemoryRouter>,
  );
  expect(screen.getByText('2023')).toBeInTheDocument();
});
