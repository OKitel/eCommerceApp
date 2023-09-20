import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { EmptyCart } from '../components/EmptyCart/EmptyCart';

describe('EmptyCart', () => {
  it('renders the component without errors', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/cart']}>
        <EmptyCart />
      </MemoryRouter>,
    );
    expect(container).toBeInTheDocument();
  });

  it('displays the "Your cart is empty" title', () => {
    const { getByText } = render(
      <MemoryRouter>
        <EmptyCart />
      </MemoryRouter>,
    );
    const titleElement = getByText('Your cart is empty');
    expect(titleElement).toBeInTheDocument();
  });

  it('displays the empty cart image', () => {
    const { getByAltText } = render(
      <MemoryRouter>
        <EmptyCart />
      </MemoryRouter>,
    );
    const imageElement = getByAltText('empty cart');
    expect(imageElement).toBeInTheDocument();
  });

  it('displays the "add some items" link', () => {
    const { getByText } = render(
      <MemoryRouter>
        <EmptyCart />
      </MemoryRouter>,
    );
    const linkElement = getByText('add some items');
    expect(linkElement).toBeInTheDocument();
  });

  it('displays the "Start Shopping" button', () => {
    const { getByText } = render(
      <MemoryRouter>
        <EmptyCart />
      </MemoryRouter>,
    );
    const buttonElement = getByText('Start Shopping');
    expect(buttonElement).toBeInTheDocument();
  });

  it('navigates to the catalog page when the link or button is clicked', () => {
    const { getByText } = render(
      <MemoryRouter>
        <EmptyCart />
      </MemoryRouter>,
    );
    const linkElement = getByText('add some items');
    const buttonElement = getByText('Start Shopping');

    expect(linkElement).toHaveAttribute('href', '/catalog');
    expect(buttonElement).toHaveAttribute('href', '/catalog');
  });
});
