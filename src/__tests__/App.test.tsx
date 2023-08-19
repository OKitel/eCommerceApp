import { App } from '../components/App';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from './test-utils';

test('Render app correctly', () => {
  renderWithProviders(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );
  const title = document.getElementById('title');
  expect(title).toBeDefined();
});
