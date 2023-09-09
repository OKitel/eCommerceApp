import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { renderWithProviders } from './test-utils';

import { Search } from '../pages/Search/Search';

test('renders search results correctly', () => {
  renderWithProviders(
    <MemoryRouter initialEntries={['/search?q=yamaha']}>
      <Search />
    </MemoryRouter>,
  );

  expect(screen.getByText('Search results for "yamaha"')).toBeInTheDocument();
});
