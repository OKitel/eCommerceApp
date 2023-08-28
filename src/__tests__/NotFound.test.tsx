import { render, screen } from '@testing-library/react';
import { NotFound } from '../pages/NotFound/NotFound';
import { MemoryRouter } from 'react-router-dom';

test('Render app correctly', () => {
  render(
    <MemoryRouter initialEntries={['/abra-kadabra']}>
      <NotFound />
    </MemoryRouter>,
  );
  expect(screen.getByText('Page not found')).toBeInTheDocument();
});
