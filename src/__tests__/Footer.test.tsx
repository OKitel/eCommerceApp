import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { renderWithProviders } from './test-utils';

import { Footer } from '../components/Footer/Footer';

test('Render Footer correctly', () => {
  renderWithProviders(
    <MemoryRouter initialEntries={['/']}>
      <Footer />
    </MemoryRouter>,
  );
  expect(screen.getByText('2023')).toBeInTheDocument();
});
