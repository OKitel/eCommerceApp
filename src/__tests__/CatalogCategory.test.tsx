import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Category } from '@commercetools/platform-sdk';

import { renderWithProviders } from './test-utils';
import { categories } from '../__mocks__/categories';

import { CatalogCategoryCard } from '../components/CatalogCategoryCard/CatalogCategoryCard';

describe('Catalog category is displayed correctly', () => {
  const renderComponent = (category: Category): void => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/catalog']}>
        <CatalogCategoryCard category={category} />
      </MemoryRouter>,
    );
  };

  test('Render Catalog category correctly', () => {
    const category = categories[0];
    renderComponent(category);

    expect(screen.getByText(category.name.en)).toBeInTheDocument();
  });
});
