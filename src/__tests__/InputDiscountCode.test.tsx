import { render, RenderResult } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';

import { store } from '../store/store';
import { mockCart } from '../__mocks__/cart';

import { InputDiscountCode } from '../components/CartSummary/InputDiscountCode';

describe('InputDiscountCode', () => {
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
          <InputDiscountCode />
        </Provider>
      </MemoryRouter>,
    );
  };

  it('renders the component without errors', () => {
    const { container } = renderComponent();
    expect(container).toBeInTheDocument();
  });

  it('displays an input field when no discount code is applied', () => {
    const { getByLabelText } = renderComponent();

    const inputElement = getByLabelText('Discount code');
    expect(inputElement).toBeInTheDocument();
  });

  it('displays a remove button when a discount code is applied', () => {
    const stateWithDiscount = {
      ...store.getState(),
      cart: {
        activeCart: {
          ...mockCart,
          discountCodes: [
            {
              discountCode: {
                typeId: 'discount-code',
                id: 'ec46283e-2c04-4934-b955-b917bede895c',
              },
              state: 'MatchesCart',
            },
          ],
        },
        progress: { modifyingCart: false },
      },
    };
    const mockedStoreWithDiscountCode = mockStore(() => stateWithDiscount);
    const { getByText } = render(
      <MemoryRouter initialEntries={['/cart']}>
        <Provider store={mockedStoreWithDiscountCode}>
          <InputDiscountCode />
        </Provider>
      </MemoryRouter>,
    );

    const removeButton = getByText('Remove');
    expect(removeButton).toBeInTheDocument();
  });
});
