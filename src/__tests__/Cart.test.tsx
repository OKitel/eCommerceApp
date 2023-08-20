import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Cart } from '../pages/Cart/Cart';

test('Render Cart page correctly', () => {
  render(
    <MemoryRouter initialEntries={['/cart']}>
      <Cart />
    </MemoryRouter>,
  );
  expect(screen.getByText('Cart Page')).toBeInTheDocument();
});
