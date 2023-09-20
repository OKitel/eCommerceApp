import { RenderResult, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';

import { store } from '../store/store';
import { mockCart } from '../__mocks__/cart';

import { CartLineItem } from '../components/CartLineItem/CartLineItem';

describe('CartLineItem', () => {
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
          <CartLineItem item={mockCart.lineItems[0]} isLast={false} />
        </Provider>
      </MemoryRouter>,
    );
  };

  it('renders the component without errors', () => {
    const { container } = renderComponent();
    expect(container).toBeInTheDocument();
  });

  it('displays the product name', () => {
    const { getByText } = renderComponent();
    expect(getByText('Schecter BANSHEE-6 EXTREME Electric Guitar')).toBeInTheDocument();
  });
});
