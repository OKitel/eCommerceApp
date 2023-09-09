import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AttributeLocalizedEnumType } from '@commercetools/platform-sdk';

import { renderWithProviders } from './test-utils';
import { AttributeDefinitionWithType } from '../components/ProductList/ProductFilterMain/types';

import { LenumFilterAttributes } from '../components/ProductList/ProductFilterMain/FilterAttributes/LenumFilterAttributes';

describe('test LenumFilterAttributes', () => {
  const mockAttributes: AttributeDefinitionWithType<AttributeLocalizedEnumType>[] = [
    {
      name: 'attribute1',
      label: {
        en: 'Attribute 1',
      },
      type: {
        name: 'lenum',
        values: [
          {
            key: 'value1',
            label: {
              en: 'Value 1',
            },
          },
          {
            key: 'value2',
            label: {
              en: 'Value 2',
            },
          },
        ],
      },
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

  const user = userEvent.setup();
  test('renders LenumFilterAttributes correctly', async () => {
    const filterAttributes = {};
    const onChange = jest.fn();
    const resetFilterAttribute = jest.fn();

    renderWithProviders(
      <LenumFilterAttributes
        attributes={mockAttributes}
        filterAttributes={filterAttributes}
        onChange={onChange}
        resetFilterAttribute={resetFilterAttribute}
      />,
    );

    const selectInputs = screen.getAllByLabelText(/Attribute \d+/);
    expect(selectInputs.length).toBe(2);
  });

  test('select values from LenumFilterAttributes correctly and call onChange', async () => {
    const filterAttributes = {};
    const onChange = jest.fn();
    const resetFilterAttribute = jest.fn();

    renderWithProviders(
      <LenumFilterAttributes
        attributes={mockAttributes}
        filterAttributes={filterAttributes}
        onChange={onChange}
        resetFilterAttribute={resetFilterAttribute}
      />,
    );

    const selectInputs = screen.getAllByLabelText(/Attribute \d+/);

    await user.click(selectInputs[0]);
    const value1 = screen.getByText('Value 1');
    await user.click(value1);

    await user.click(selectInputs[1]);
    const value3 = screen.getByText('Value 3');
    await user.click(value3);

    expect(onChange).toHaveBeenCalledTimes(2);
  });

  test('render reset buttons for lenum filters', async () => {
    const filterAttributes = { attribute1: 'value1', attribute2: 'value3' };
    const onChange = jest.fn();
    const resetFilterAttribute = jest.fn();

    renderWithProviders(
      <LenumFilterAttributes
        attributes={mockAttributes}
        filterAttributes={filterAttributes}
        onChange={onChange}
        resetFilterAttribute={resetFilterAttribute}
      />,
    );

    const resetButtons = screen.getAllByRole('button', { name: /reset-button/i });
    expect(resetButtons.length).toBe(2);
  });

  test('check reset buttons reset lenum filters', async () => {
    const filterAttributes = { attribute1: 'value1', attribute2: 'value3' };
    const onChange = jest.fn();
    const resetFilterAttribute = jest.fn();

    renderWithProviders(
      <LenumFilterAttributes
        attributes={mockAttributes}
        filterAttributes={filterAttributes}
        onChange={onChange}
        resetFilterAttribute={resetFilterAttribute}
      />,
    );

    const resetButtons = screen.getAllByRole('button', { name: /reset-button/i });

    await user.click(resetButtons[0]);
    await user.click(resetButtons[1]);

    expect(resetFilterAttribute).toHaveBeenCalledWith('attribute1');
    expect(resetFilterAttribute).toHaveBeenCalledWith('attribute2');
  });
});
