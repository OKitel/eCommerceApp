import { screen } from '@testing-library/react';
import { AttributeDefinition } from '@commercetools/platform-sdk';
import { debug } from 'jest-preview';

import { renderWithProviders } from './test-utils';
import { FilterAttributes } from '../components/ProductList/ProductFilterMain/FilterAttributes/FilterAttributes';

const mockAttributes: AttributeDefinition[] = [
  {
    name: 'attribute1',
    label: {
      en: 'Attribute 1',
    },
    type: { name: 'boolean' },
    isRequired: true,
    attributeConstraint: 'None',
    inputHint: 'SingleLine',
    isSearchable: true,
  },
  {
    name: 'attribute2',
    label: {
      en: 'Attribute 2',
    },
    type: {
      name: 'lenum',
      values: [
        {
          key: 'value3',
          label: {
            en: 'Value 3',
          },
        },
      ],
    },
    isRequired: true,
    attributeConstraint: 'None',
    inputHint: 'SingleLine',
    isSearchable: true,
  },
];

test('renders FilterAttributes correctly', async () => {
  const applyFilters = jest.fn();

  renderWithProviders(<FilterAttributes attributes={mockAttributes} applyFilters={applyFilters} />);
  debug();
  expect(screen.getByText('Price')).toBeInTheDocument();

  const applyFiltersButton = screen.getByText('Apply filters');
  expect(applyFiltersButton).toBeInTheDocument();

  const resetFiltersButton = screen.getByText('Reset applied filters');
  expect(resetFiltersButton).toBeInTheDocument();
});
