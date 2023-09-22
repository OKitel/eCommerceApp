import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';

import { store } from '../store/store';
import { renderWithProviders } from './test-utils';
import { mockCart } from '../__mocks__/cart';
import { mockProduct } from '../__mocks__/products';

import { ProductDetails } from '../components/ProductDetails/ProductDetails';

describe('ProductDetails', () => {
  const productId = 'string';
  const productName = 'Test Product';
  const product = {
    name: { en: productName },
    masterVariant: {
      id: 1,
      attributes: [{ name: 'manufacturer', value: { label: { en: 'China' } } }],
    },
    variants: [],
    categories: [],
    slug: {},
    searchKeywords: {},
  };
  it('renders product name', () => {
    renderWithProviders(<ProductDetails productData={product} productId={productId} />);
    expect(screen.getByText(productName)).toBeInTheDocument();
  });

  it('renders "Add to cart" button', () => {
    renderWithProviders(<ProductDetails productData={product} productId={productId} />);
    expect(screen.getByText('Add to cart')).toBeInTheDocument();
  });

  it('renders manufacturer information if available', () => {
    renderWithProviders(<ProductDetails productData={product} productId={productId} />);

    expect(screen.getByText('Made in China')).toBeInTheDocument();
  });

  it('displays "Remove from cart" button if the product is in the cart', () => {
    const mockStore = configureMockStore();
    const state = {
      ...store.getState(),
      cart: {
        activeCart: mockCart,
        progress: { removingLineItem: false },
      },
      product: {
        product: mockProduct,
      },
    };
    const mockedStore = mockStore(() => state);

    render(
      <Provider store={mockedStore}>
        <ProductDetails productData={mockProduct.masterData.current} productId={mockProduct.id} />
      </Provider>,
    );

    expect(screen.getByText('Remove from cart')).toBeInTheDocument();
  });
});
