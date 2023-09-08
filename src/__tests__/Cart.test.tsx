import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { renderWithProviders } from './test-utils';

import { Cart } from '../pages/Cart/Cart';
import { LINKS } from '../components/consts';

test('Render Cart page correctly', () => {
  renderWithProviders(
    <MemoryRouter initialEntries={[LINKS.cart]}>
      <Cart />
    </MemoryRouter>,
  );
  expect(screen.getByText('Cart Page')).toBeInTheDocument();
});
