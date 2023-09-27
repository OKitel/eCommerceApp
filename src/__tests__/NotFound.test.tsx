import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { NotFound } from '../pages/NotFound/NotFound';

test('Render app correctly', () => {
  render(
    <MemoryRouter initialEntries={['/abra-kadabra']}>
      <NotFound />
    </MemoryRouter>,
  );
  expect(screen.getByText('Page not found')).toBeInTheDocument();
});
