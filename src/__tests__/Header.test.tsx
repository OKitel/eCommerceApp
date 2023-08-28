import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Header } from '../components/Header/Header';
import { renderWithProviders } from './test-utils';
import userEvent from '@testing-library/user-event';

describe('Test Header components', () => {
  const renderHeader = (): void => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <Header />
      </MemoryRouter>,
    );
  };

  const user = userEvent.setup();

  test('Render entire header correctly', () => {
    renderHeader();
    expect(screen.getByText('Maestro')).toBeInTheDocument();
  });

  test('Captures user input in search bar', async () => {
    renderHeader();
    const searchInput = screen.getByPlaceholderText('Search...');
    if (searchInput && searchInput instanceof HTMLInputElement) {
      await user.type(searchInput, 'Piano Casio');
      await user.click(screen.getByTestId('search-btn'));
      expect(searchInput.value).toBe('Piano Casio');
    }
  });
});
