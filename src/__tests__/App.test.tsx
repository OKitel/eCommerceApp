import { App } from '../components/App';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from './test-utils';
import { waitFor } from '@testing-library/react';

jest.mock('swiper/react', () => ({
  Swiper: ({ children }: { children: React.ReactElement }): JSX.Element => <div>{children}</div>,
}));

jest.mock('swiper/modules', () => ({
  default: jest.fn(),
  Navigation: jest.fn(),
  Thumbs: jest.fn(),
  FreeMode: jest.fn(),
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
