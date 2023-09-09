import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { ProductType } from '@commercetools/platform-sdk';

import { store } from '../store/store';

import { ProductFilterMain } from '../components/ProductList/ProductFilterMain/ProductFilterMain';

const mockProductType: ProductType = {
  id: '862048f7-f470-4ec3-b77e-f8c7008ce96c',
  name: 'Behringer UMX610 USB/MIDI Keyboard',
  description:
    'USB/MIDI keyboard features 61 high-quality full-size keys, real-time control and playability<br>\nUSB/Audio interface for recording and playback of any digital music files<br>\nWorks with PC or Mac computers and operating systems Mac OS X and Windows XP, Vista<br>\nIntuitive NI KorePlayer sound module with a 300MB ready-to-use sound library, including almost all categories/kinds of sounds, from synths, acoustic instruments, to drums<br>\n8 knobs and 10 assignable switches<br>\nFull range of 128 tones via octave shift function with multipurpose LED indicator<br>\nA separate midi output allows you to control external samplers, synthesizers and other equipment<br>\nRuns on batteries or power supply, as well as via USB',
  createdAt: '2023-08-29T00:04:13.724Z',
  lastModifiedAt: '2023-08-29T00:04:13.724Z',
  version: 1,
  attributes: [
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
  ],
};

const mockProductTypeWithoutAttributes = { ...mockProductType, attributes: null };
describe('test ProductFilterMain component', () => {
  test('renders ProductFilterMain correctly with attributes', () => {
    const applyFilters = jest.fn();
    const mockStore = configureMockStore();
    const state = {
      ...store.getState(),
      productTypes: {
        types: {
          main: mockProductType,
        },
        progress: false,
      },
    };
    const mockedStore = mockStore(() => state);

    render(
      <Provider store={mockedStore}>
        <ProductFilterMain applyFilters={applyFilters} />
      </Provider>,
    );

    expect(screen.getByText('Filters')).toBeInTheDocument();
  });

  test('renders ProductFilterMain with no product', () => {
    const applyFilters = jest.fn();
    const mockStore = configureMockStore();
    const state = {
      ...store.getState(),
      productTypes: {
        types: {
          main: null,
        },
        progress: false,
      },
    };
    const mockedStore = mockStore(() => state);

    render(
      <Provider store={mockedStore}>
        <ProductFilterMain applyFilters={applyFilters} />
      </Provider>,
    );

    expect(screen.getByText('No filters available for the current product type')).toBeInTheDocument();
  });

  test('renders ProductFilterMain with no attributes', () => {
    const applyFilters = jest.fn();
    const mockStore = configureMockStore();
    const state = {
      ...store.getState(),
      productTypes: {
        types: {
          main: mockProductTypeWithoutAttributes,
        },
        progress: false,
      },
    };
    const mockedStore = mockStore(() => state);

    render(
      <Provider store={mockedStore}>
        <ProductFilterMain applyFilters={applyFilters} />
      </Provider>,
    );

    expect(screen.getByText('No filters attributes available')).toBeInTheDocument();
  });
});
