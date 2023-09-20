import { Product } from '@commercetools/platform-sdk';

export const mockProduct: Product = {
  id: 'e09fc3a3-17c7-4e84-8bb4-b2d15cc2b269',
  version: 1,
  createdAt: '2023-08-29T00:04:13.604Z',
  lastModifiedAt: '2023-08-29T00:04:13.604Z',
  lastModifiedBy: {
    clientId: 'fUka-5yXBNrW9ubS-1oFY5dj',
  },
  createdBy: {
    clientId: 'fUka-5yXBNrW9ubS-1oFY5dj',
  },
  productType: {
    typeId: 'product-type',
    id: '9e1fc8c0-e73d-426f-b008-c9e49798036a',
  },
  masterData: {
    current: {
      name: {
        en: 'Sam Martin UP123 White Acoustic Piano',
      },
      description: {
        en: 'Acoustic piano, 7 1/3 octaves, 88 keys, black, silver hardware, weight 220 kg',
      },
      categories: [
        {
          typeId: 'category',
          id: '3219a4bd-84b7-4b77-9a21-6a9ee03c4b93',
        },
      ],
      categoryOrderHints: {},
      slug: {
        en: 'sam-martin-up123-white-with-branch',
      },
      masterVariant: {
        id: 1,
        sku: '510450White',
        key: '510450White',
        prices: [
          {
            id: '580d81c4-5555-418f-8fa8-0814c8958ab7',
            value: {
              type: 'centPrecision',
              currencyCode: 'EUR',
              centAmount: 343300,
              fractionDigits: 2,
            },
          },
          {
            id: '9e5ed862-8bc2-4fb3-aad5-a05fccd66fb6',
            value: {
              type: 'centPrecision',
              currencyCode: 'USD',
              centAmount: 315000,
              fractionDigits: 2,
            },
          },
        ],
        images: [
          {
            url: 'https://ltm-music.ru/upload/images/sam_martin_up123_white_with-branch.jpg',
            dimensions: {
              w: 0,
              h: 0,
            },
          },
        ],
        attributes: [
          {
            name: 'brand',
            value: {
              key: 'samMartin',
              label: {
                en: 'Sam Martin',
              },
            },
          },
          {
            name: 'manufacturer',
            value: {
              key: 'china',
              label: {
                en: 'China',
              },
            },
          },
          {
            name: 'color',
            value: {
              key: 'white',
              label: {
                en: 'White',
              },
            },
          },
        ],
        assets: [],
      },
      variants: [],
      searchKeywords: {},
    },
    staged: {
      name: {
        en: 'Sam Martin UP123 White Acoustic Piano',
      },
      description: {
        en: 'Acoustic piano, 7 1/3 octaves, 88 keys, black, silver hardware, weight 220 kg',
      },
      categories: [
        {
          typeId: 'category',
          id: '3219a4bd-84b7-4b77-9a21-6a9ee03c4b93',
        },
      ],
      categoryOrderHints: {},
      slug: {
        en: 'sam-martin-up123-white-with-branch',
      },
      masterVariant: {
        id: 1,
        sku: '510450White',
        key: '510450White',
        prices: [
          {
            id: '580d81c4-5555-418f-8fa8-0814c8958ab7',
            value: {
              type: 'centPrecision',
              currencyCode: 'EUR',
              centAmount: 343300,
              fractionDigits: 2,
            },
          },
          {
            id: '9e5ed862-8bc2-4fb3-aad5-a05fccd66fb6',
            value: {
              type: 'centPrecision',
              currencyCode: 'USD',
              centAmount: 315000,
              fractionDigits: 2,
            },
          },
        ],
        images: [
          {
            url: 'https://ltm-music.ru/upload/images/sam_martin_up123_white_with-branch.jpg',
            dimensions: {
              w: 0,
              h: 0,
            },
          },
        ],
        attributes: [
          {
            name: 'brand',
            value: {
              key: 'samMartin',
              label: {
                en: 'Sam Martin',
              },
            },
          },
          {
            name: 'manufacturer',
            value: {
              key: 'china',
              label: {
                en: 'China',
              },
            },
          },
          {
            name: 'color',
            value: {
              key: 'white',
              label: {
                en: 'White',
              },
            },
          },
        ],
        assets: [],
      },
      variants: [],
      searchKeywords: {},
    },
    published: true,
    hasStagedChanges: false,
  },
  key: '30',
  taxCategory: {
    typeId: 'tax-category',
    id: 'acfd36b8-89e4-4a4e-abc5-22e796a5cfde',
  },
};
