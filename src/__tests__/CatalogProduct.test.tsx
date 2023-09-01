import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from './test-utils';
import { CatalogProduct } from '../components/CatalogProduct/CatalogProduct';
import { product1 } from '../__mocks__/productProjections';

describe('Catalog product is displayed correctly', () => {
  const user = userEvent.setup();

  const renderComponent = (): void => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/catalog']}>
        <CatalogProduct productProjection={product1} />
      </MemoryRouter>,
    );
  };

  const selectColor = async (selectorButton: Element | null, color: string): Promise<void> => {
    if (selectorButton) {
      await user.click(selectorButton);
      const colorLabel = document.querySelector(`[role="option"][data-value="${color}"]`);
      if (colorLabel) {
        await user.click(colorLabel);
      }
    }
  };

  test('Render Catalog product correctly', () => {
    renderComponent();

    expect(screen.getByText(product1.name.en)).toBeInTheDocument();
  });

  test('Color selector switches color variants', async () => {
    renderComponent();

    const selectorButton = screen.getByTestId('catalog-product-color-select').querySelector('[role="button"]');

    // select 'Blue sunburst' in color select
    await selectColor(selectorButton, 'blueSunburst');
    expect(selectorButton).toHaveTextContent('Blue sunburst');

    // select 'Natural satin' in color select
    await selectColor(selectorButton, 'naturalSatin');
    expect(selectorButton).toHaveTextContent('Natural satin');
  });
});
