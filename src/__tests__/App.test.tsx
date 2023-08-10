import { render } from '@testing-library/react';
import { App } from '../components/App';
import { MemoryRouter } from 'react-router-dom';

test('Render app correctly', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );
  const title = document.getElementById('title');
  expect(title).toBeDefined();
});
