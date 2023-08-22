import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Cart } from '../pages/Cart/Cart';
import { renderWithProviders } from './test-utils';

test('Render Cart page correctly', () => {
  renderWithProviders(
    <MemoryRouter initialEntries={['/cart']}>
      <Cart />
    </MemoryRouter>,
  );
  expect(screen.getByText('Cart Page')).toBeInTheDocument();
});
