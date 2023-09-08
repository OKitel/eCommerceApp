import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { Main } from '../pages/Main/Main';

test('Render main page correctly', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <Main />
    </MemoryRouter>,
  );
  expect(screen.getByText('Welcome to Maestro!')).toBeInTheDocument();
});
