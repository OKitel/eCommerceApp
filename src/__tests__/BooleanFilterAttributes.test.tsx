import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AttributeBooleanType } from '@commercetools/platform-sdk';

import { renderWithProviders } from './test-utils';
import { AttributeDefinitionWithType } from '../components/ProductList/ProductFilterMain/types';

import { BooleanFilterAttributes } from '../components/ProductList/ProductFilterMain/FilterAttributes/BooleanFilterAttributes';

describe('test BooleanFilterAttributes', () => {
  const mockAttributes: AttributeDefinitionWithType<AttributeBooleanType>[] = [
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
      type: { name: 'boolean' },
      isRequired: true,
      attributeConstraint: 'None',
      inputHint: 'SingleLine',
      isSearchable: true,
    },
  ];

  const user = userEvent.setup();

  const filterAttributes = { attribute2: true };
  const setFilterAttributes = jest.fn();

  test('renders BooleanFilterAttributes correctly', async () => {
    renderWithProviders(
      <BooleanFilterAttributes
        attributes={mockAttributes}
        filterAttributes={filterAttributes}
        setFilterAttributes={setFilterAttributes}
      />,
    );

    expect(screen.getByText('Attribute 1 only')).toBeInTheDocument();
    expect(screen.getByText('Attribute 2 only')).toBeInTheDocument();
  });

  test('click on BooleanFilterAttributes changes attributes', async () => {
    renderWithProviders(
      <BooleanFilterAttributes
        attributes={mockAttributes}
        filterAttributes={filterAttributes}
        setFilterAttributes={setFilterAttributes}
      />,
    );

    await user.click(screen.getByLabelText('Attribute 1 only'));
    await user.click(screen.getByLabelText('Attribute 2 only'));

    expect(setFilterAttributes).toHaveBeenNthCalledWith(1, {
      attribute1: true,
      attribute2: true,
    });

    expect(setFilterAttributes).toHaveBeenNthCalledWith(2, {
      attribute2: undefined,
    });
  });
});
