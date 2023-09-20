import { waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { renderWithProviders } from './test-utils';

import { App } from '../components/App';

// mock swiper component to fix https://alobovskiy-1691010266635.atlassian.net/browse/ECA-150
jest.mock('swiper/react', () => ({
  Swiper: ({ children }: { children: React.ReactElement }): JSX.Element => <div>{children}</div>,
}));

test('Render app correctly', async () => {
  renderWithProviders(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );
  const title = await waitFor(() => document.getElementById('title'));
  expect(title).toBeDefined();
});
