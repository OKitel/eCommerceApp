import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Header } from '../components/Header/Header';

test('Render Header correctly', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <Header />
    </MemoryRouter>,
  );
  expect(screen.getByText('Maestro')).toBeInTheDocument();
});
