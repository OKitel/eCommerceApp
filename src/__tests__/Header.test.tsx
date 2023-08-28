import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Header } from '../components/Header/Header';
import { renderWithProviders } from './test-utils';

describe('Header is displayed correctly', () => {
  const user = userEvent.setup();

  const renderComponent = (): void => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <Header />
      </MemoryRouter>,
    );
  };

  const selectCurrency = async (selectorButton: Element | null, currency: string): Promise<void> => {
    if (selectorButton) {
      await user.click(selectorButton);
      const currencyCode = document.querySelector(`[role="option"][data-value="${currency}"]`);
      if (currencyCode) {
        await user.click(currencyCode);
      }
    }
  };

  test('Render Header correctly', () => {
    renderComponent();

    expect(screen.getByText('Maestro')).toBeInTheDocument();
  });

  test('Currency selector switches currecy values', async () => {
    renderComponent();

    const selectorButton = screen.getByTestId('currency-select').querySelector('[role="button"]');

    // select USD in currency select
    await selectCurrency(selectorButton, 'USD');
    expect(selectorButton).toHaveTextContent('USD');

    // // select EUR in currency select
    await selectCurrency(selectorButton, 'EUR');
    expect(selectorButton).toHaveTextContent('EUR');
  });

  test('Captures user input in search bar', async () => {
    renderComponent();
    const searchInput = screen.getByPlaceholderText('Search...');
    if (searchInput && searchInput instanceof HTMLInputElement) {
      await user.type(searchInput, 'Piano Casio');
      await user.click(screen.getByTestId('search-btn'));
      expect(searchInput.value).toBe('Piano Casio');
    }
  });
});
