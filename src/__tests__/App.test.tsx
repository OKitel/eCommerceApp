import { render } from '@testing-library/react';
import { App } from '../components/App';

test('Render app correctly', () => {
  render(<App />);
  const title = document.getElementById('title');
  expect(title).toBeDefined();
});
