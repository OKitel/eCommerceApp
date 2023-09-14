import { screen } from '@testing-library/react';

import { renderWithProviders } from './test-utils';

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
});
