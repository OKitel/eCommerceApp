import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { renderWithProviders } from './test-utils';

import { LINKS } from '../components/consts';
import { Registration } from '../pages/Registration/Registration';

test('Render registration page correctly', () => {
  renderWithProviders(
    <MemoryRouter initialEntries={[LINKS.registration]}>
      <Registration />
    </MemoryRouter>,
  );
  expect(screen.getByText('Registration Form')).toBeInTheDocument();
});
