import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from './test-utils';

import { PriceFilterAttributes } from '../components/ProductList/ProductFilterMain/FilterAttributes/PriceFilterAttributes';

describe('test PriceFilterAttributes component', () => {
  const user = userEvent.setup();
  test('renders PriceFilterAttributes correctly', () => {
    const filterAttributes = {};
    const setFilterAttributes = jest.fn();
    const resetFilterAttribute = jest.fn();

    renderWithProviders(
      <PriceFilterAttributes
        filterAttributes={filterAttributes}
        setFilterAttributes={setFilterAttributes}
        resetFilterAttribute={resetFilterAttribute}
      />,
    );

    const startsFromInput = screen.getByLabelText('Starts from');
    expect(startsFromInput).toBeInTheDocument();

    const upToInput = screen.getByLabelText('Up to');
    expect(upToInput).toBeInTheDocument();
  });

  test('user types 1 in price starts from, then setFilterAttributes called with 1', async () => {
    const filterAttributes = {};
    const setFilterAttributes = jest.fn();
    const resetFilterAttribute = jest.fn();

    renderWithProviders(
      <PriceFilterAttributes
        filterAttributes={filterAttributes}
        setFilterAttributes={setFilterAttributes}
        resetFilterAttribute={resetFilterAttribute}
      />,
    );

    const startsFromInput = screen.getByLabelText('Starts from');

    await user.type(startsFromInput, '1');
    expect(setFilterAttributes).toHaveBeenCalledWith({
      priceFrom: 1,
    });
  });

  test('user types 0 in price starts from, then setFilterAttributes called with 10', async () => {
    const filterAttributes = { priceFrom: 1 };
    const setFilterAttributes = jest.fn();
    const resetFilterAttribute = jest.fn();

    renderWithProviders(
      <PriceFilterAttributes
        filterAttributes={filterAttributes}
        setFilterAttributes={setFilterAttributes}
        resetFilterAttribute={resetFilterAttribute}
      />,
    );

    const startsFromInput = screen.getByLabelText('Starts from');

    await user.type(startsFromInput, '0');
    expect(setFilterAttributes).toHaveBeenCalledWith({
      priceFrom: 10,
    });
  });

  test('user types second 0 in price starts from, then setFilterAttributes called with 100', async () => {
    const filterAttributes = { priceFrom: 10 };
    const setFilterAttributes = jest.fn();
    const resetFilterAttribute = jest.fn();

    renderWithProviders(
      <PriceFilterAttributes
        filterAttributes={filterAttributes}
        setFilterAttributes={setFilterAttributes}
        resetFilterAttribute={resetFilterAttribute}
      />,
    );

    const startsFromInput = screen.getByLabelText('Starts from');

    await user.type(startsFromInput, '0');
    expect(setFilterAttributes).toHaveBeenCalledWith({
      priceFrom: 100,
    });
  });

  test('user types 2 in price up to, then setFilterAttributes called with 2', async () => {
    const filterAttributes = {};
    const setFilterAttributes = jest.fn();
    const resetFilterAttribute = jest.fn();

    renderWithProviders(
      <PriceFilterAttributes
        filterAttributes={filterAttributes}
        setFilterAttributes={setFilterAttributes}
        resetFilterAttribute={resetFilterAttribute}
      />,
    );

    const upToInput = screen.getByLabelText('Up to');

    await user.type(upToInput, '2');
    expect(setFilterAttributes).toHaveBeenCalledWith({
      priceTo: 2,
    });
  });

  test('user types 0 in price up to, then setFilterAttributes called with 20', async () => {
    const filterAttributes = { priceTo: 2 };
    const setFilterAttributes = jest.fn();
    const resetFilterAttribute = jest.fn();

    renderWithProviders(
      <PriceFilterAttributes
        filterAttributes={filterAttributes}
        setFilterAttributes={setFilterAttributes}
        resetFilterAttribute={resetFilterAttribute}
      />,
    );

    const upToInput = screen.getByLabelText('Up to');

    await user.type(upToInput, '0');
    expect(setFilterAttributes).toHaveBeenCalledWith({
      priceTo: 20,
    });
  });

  test('user types second 0 in price up to, then setFilterAttributes called with 200', async () => {
    const filterAttributes = { priceTo: 20 };
    const setFilterAttributes = jest.fn();
    const resetFilterAttribute = jest.fn();

    renderWithProviders(
      <PriceFilterAttributes
        filterAttributes={filterAttributes}
        setFilterAttributes={setFilterAttributes}
        resetFilterAttribute={resetFilterAttribute}
      />,
    );

    const upToInput = screen.getByLabelText('Up to');

    await user.type(upToInput, '0');
    expect(setFilterAttributes).toHaveBeenCalledWith({
      priceTo: 200,
    });
  });

  test('renders reset buttons for price filters', async () => {
    const filterAttributes = { priceFrom: 100, priceTo: 200 };
    const setFilterAttributes = jest.fn();
    const resetFilterAttribute = jest.fn();

    renderWithProviders(
      <PriceFilterAttributes
        filterAttributes={filterAttributes}
        setFilterAttributes={setFilterAttributes}
        resetFilterAttribute={resetFilterAttribute}
      />,
    );

    const resetPriceFromButton = screen.getByTestId('reset-price-from-btn');
    expect(resetPriceFromButton).toBeInTheDocument();

    const resetPriceToButton = screen.getByTestId('reset-price-to-btn');
    expect(resetPriceToButton).toBeInTheDocument();
  });

  test('checks reset buttons reset price filters', async () => {
    const filterAttributes = { priceFrom: 100, priceTo: 200 };
    const setFilterAttributes = jest.fn();
    const resetFilterAttribute = jest.fn();

    renderWithProviders(
      <PriceFilterAttributes
        filterAttributes={filterAttributes}
        setFilterAttributes={setFilterAttributes}
        resetFilterAttribute={resetFilterAttribute}
      />,
    );

    const resetPriceFromButton = screen.getByTestId('reset-price-from-btn');

    const resetPriceToButton = screen.getByTestId('reset-price-to-btn');

    await user.click(resetPriceFromButton);
    await user.click(resetPriceToButton);

    expect(resetFilterAttribute).toHaveBeenCalledWith('priceFrom');
    expect(resetFilterAttribute).toHaveBeenCalledWith('priceTo');
  });
});
