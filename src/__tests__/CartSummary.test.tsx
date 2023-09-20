import { render, RenderResult } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import { store } from '../store/store';
import { cheapCart } from '../__mocks__/cheapCart';
import { mockCart } from '../__mocks__/cart';

import { CartSummary } from '../components/CartSummary/CartSummary';

describe('CartSummary', () => {
  const mockStore = configureMockStore();
  const state = {
    ...store.getState(),
    cart: {
      activeCart: mockCart,
      progress: { modifyingCart: false },
    },
  };
  const mockedStore = mockStore(() => state);

  const renderComponent = (): RenderResult => {
    return render(
      <MemoryRouter initialEntries={['/cart']}>
        <Provider store={mockedStore}>
          <CartSummary cart={mockCart} />
        </Provider>
      </MemoryRouter>,
    );
  };

  const user = userEvent.setup();

  it('renders the component without errors', () => {
    const { container } = renderComponent();

    expect(container).toBeInTheDocument();
  });

  it('displays the total cart price', () => {
    const { getByText } = renderComponent();

    const totalCartPriceElement = getByText('€715.60');
    expect(totalCartPriceElement).toBeInTheDocument();
  });

  it('displays an error message when discount terms are not fulfilled', () => {
    const stateWithDiscount = {
      ...store.getState(),
      cart: {
        activeCart: cheapCart,
        progress: { modifyingCart: false },
      },
    };
    const mockedStoreWithDiscountCode = mockStore(() => stateWithDiscount);

    const { getByText } = render(
      <MemoryRouter initialEntries={['/cart']}>
        <Provider store={mockedStoreWithDiscountCode}>
          <CartSummary cart={cheapCart} />
        </Provider>
      </MemoryRouter>,
    );

    const errorMessage = getByText(
      'You need to fulfill the terms of the applied promo code to get the discounted price',
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it('handles clearing the shopping cart', async () => {
    const { getByText } = renderComponent();

    const clearCartButton = getByText('Clear Shopping Cart');
    await user.click(clearCartButton);
    expect(getByText('Clear Cart?')).toBeInTheDocument();
  });
});
