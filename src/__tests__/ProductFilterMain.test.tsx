import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import { store } from '../store/store';
import { mockProductType } from '../__mocks__/productType';

import { ProductFilterMain } from '../components/ProductList/ProductFilterMain/ProductFilterMain';

const mockProductTypeWithoutAttributes = { ...mockProductType, attributes: null };
describe('test ProductFilterMain component', () => {
  test('renders ProductFilterMain correctly with attributes', () => {
    const applyFilters = jest.fn();
    const mockStore = configureMockStore();
    const state = {
      ...store.getState(),
      productTypes: {
        types: {
          main: mockProductType,
        },
        progress: false,
      },
    };
    const mockedStore = mockStore(() => state);

    render(
      <Provider store={mockedStore}>
        <ProductFilterMain applyFilters={applyFilters} />
      </Provider>,
    );

    expect(screen.getByText('Filters')).toBeInTheDocument();
  });

  test('renders ProductFilterMain with no product', () => {
    const applyFilters = jest.fn();
    const mockStore = configureMockStore();
    const state = {
      ...store.getState(),
      productTypes: {
        types: {
          main: null,
        },
        progress: false,
      },
    };
    const mockedStore = mockStore(() => state);

    render(
      <Provider store={mockedStore}>
        <ProductFilterMain applyFilters={applyFilters} />
      </Provider>,
    );

    expect(screen.getByText('No filters available for the current product type')).toBeInTheDocument();
  });

  test('renders ProductFilterMain with no attributes', () => {
    const applyFilters = jest.fn();
    const mockStore = configureMockStore();
    const state = {
      ...store.getState(),
      productTypes: {
        types: {
          main: mockProductTypeWithoutAttributes,
        },
        progress: false,
      },
    };
    const mockedStore = mockStore(() => state);

    render(
      <Provider store={mockedStore}>
        <ProductFilterMain applyFilters={applyFilters} />
      </Provider>,
    );

    expect(screen.getByText('No filters attributes available')).toBeInTheDocument();
  });
});
