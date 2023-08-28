import { App } from '../components/App';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from './test-utils';
import { waitFor } from '@testing-library/react';

test('Render app correctly', async () => {
  renderWithProviders(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );
  const title = await waitFor(() => document.getElementById('title'));
  expect(title).toBeDefined();
});
