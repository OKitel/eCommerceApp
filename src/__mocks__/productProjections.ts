import { ProductProjection } from '@commercetools/platform-sdk';

export const product1: ProductProjection = {
  id: '4493b2a7-e275-4112-ad3b-d32c0cf29d27',
  version: 1,
  productType: {
    typeId: 'product-type',
    id: '9bb35f70-0a8d-4994-8558-63266cbaa1dd',
  },
  name: {
    en: 'Greenland HW39 Acoustic Guitar',
  },
  description: {
    en: 'Acoustic guitar, top deck - linden, body - linden, neck - mahogany.',
  },
  categories: [
    {
      typeId: 'category',
      id: 'b04699c7-0581-4d62-b694-b494ebdc0f71',
    },
  ],
  categoryOrderHints: {},
  slug: {
    en: 'greenland-hw39',
  },
  variants: [
    {
      attributes: [
        {
          name: 'brand',
          value: {
            key: 'greenland',
            label: {
              en: 'Greenland',
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
            key: 'blueSunburst',
            label: {
              en: 'Blue sunburst',
            },
          },
        },
        {
          name: 'isOnStock',
          value: true,
        },
      ],
      assets: [],
      images: [
        {
          url: 'https://ltm-music.ru/upload/images/greenland_hw39_bl_.png',
          dimensions: {
            w: 0,
            h: 0,
          },
        },
      ],
      prices: [
        {
          id: '92e6504e-0aa9-43b5-ad42-832769c93980',
          value: {
            type: 'centPrecision',
            currencyCode: 'EUR',
            centAmount: 4900,
            fractionDigits: 2,
          },
        },
        {
          id: 'ca098855-03e0-43a9-8873-f727f989f9c5',
          value: {
            type: 'centPrecision',
            currencyCode: 'USD',
            centAmount: 4500,
            fractionDigits: 2,
          },
        },
      ],
      key: '510452BlueSunburst',
      sku: '510452BlueSunburst',
      id: 2,
    },
    {
      attributes: [
        {
          name: 'brand',
          value: {
            key: 'greenland',
            label: {
              en: 'Greenland',
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
            key: 'naturalSatin',
            label: {
              en: 'Natural satin',
            },
          },
        },
      ],
      assets: [],
      images: [
        {
          url: 'https://ltm-music.ru/upload/images/greenland_hw39_nat_.png',
          dimensions: {
            w: 0,
            h: 0,
          },
        },
      ],
      prices: [
        {
          id: 'b318a428-436c-4870-a446-7749a73f60d2',
          value: {
            type: 'centPrecision',
            currencyCode: 'EUR',
            centAmount: 5900,
            fractionDigits: 2,
          },
        },
        {
          id: '656f922a-5ba8-4c27-b54a-538f748691cb',
          value: {
            type: 'centPrecision',
            currencyCode: 'USD',
            centAmount: 5500,
            fractionDigits: 2,
          },
        },
      ],
      key: '510451NaturalSatin',
      sku: '510451NaturalSatin',
      id: 3,
    },
  ],
  masterVariant: {
    attributes: [
      {
        name: 'brand',
        value: {
          key: 'greenland',
          label: {
            en: 'Greenland',
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
          key: 'black',
          label: {
            en: 'Black',
          },
        },
      },
      {
        name: 'isOnStock',
        value: true,
      },
    ],
    assets: [],
    images: [
      {
        url: 'https://ltm-music.ru/upload/images/greenland_hw39_bk.png',
        dimensions: {
          w: 0,
          h: 0,
        },
      },
    ],
    prices: [
      {
        id: '645d9295-fe0d-426e-90a6-92d3f42cf7c0',
        value: {
          type: 'centPrecision',
          currencyCode: 'EUR',
          centAmount: 6900,
          fractionDigits: 2,
        },
      },
      {
        id: '0d0754cc-c63d-4a35-99f7-601beaf89aaf',
        value: {
          type: 'centPrecision',
          currencyCode: 'USD',
          centAmount: 6500,
          fractionDigits: 2,
        },
      },
    ],
    key: '510453Black',
    sku: '510453Black',
    id: 1,
  },
  searchKeywords: {},
  hasStagedChanges: false,
  published: true,
  taxCategory: {
    typeId: 'tax-category',
    id: 'acfd36b8-89e4-4a4e-abc5-22e796a5cfde',
  },
  createdAt: '2023-08-26T00:38:12.526Z',
  lastModifiedAt: '2023-08-26T00:38:12.526Z',
};
export const product2: ProductProjection = {
  id: 'e09fc3a3-17c7-4e84-8bb4-b2d15cc2b269',
  version: 1,
  productType: {
    typeId: 'product-type',
    id: '9e1fc8c0-e73d-426f-b008-c9e49798036a',
  },
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
  hasStagedChanges: false,
  published: true,
  key: '30',
  taxCategory: {
    typeId: 'tax-category',
    id: 'acfd36b8-89e4-4a4e-abc5-22e796a5cfde',
  },
  createdAt: '2023-08-29T00:04:13.604Z',
  lastModifiedAt: '2023-08-29T00:04:13.604Z',
};
export const product3: ProductProjection = {
  id: '4493b2a7-e275-4112-ad3b-d32c0cf29d27',
  version: 1,
  productType: {
    typeId: 'product-type',
    id: '9bb35f70-0a8d-4994-8558-63266cbaa1dd',
  },
  name: {
    en: 'Greenland HW39 Acoustic Guitar Greenland HW39 Acoustic Guitar',
  },
  description: {
    en: 'Acoustic guitar, top deck - linden, body - linden, neck - mahogany.',
  },
  categories: [
    {
      typeId: 'category',
      id: 'b04699c7-0581-4d62-b694-b494ebdc0f71',
    },
  ],
  categoryOrderHints: {},
  slug: {
    en: 'greenland-hw39',
  },
  variants: [
    {
      attributes: [
        {
          name: 'brand',
          value: {
            key: 'greenland',
            label: {
              en: 'Greenland',
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
            key: 'blueSunburst',
            label: {
              en: 'Blue sunburst',
            },
          },
        },
        {
          name: 'isOnStock',
          value: true,
        },
      ],
      assets: [],
      images: [
        {
          url: 'https://ltm-music.ru/upload/images/greenland_hw39_bl_.png',
          dimensions: {
            w: 0,
            h: 0,
          },
        },
      ],
      prices: [
        {
          id: '92e6504e-0aa9-43b5-ad42-832769c93980',
          value: {
            type: 'centPrecision',
            currencyCode: 'EUR',
            centAmount: 5900,
            fractionDigits: 2,
          },
        },
        {
          id: 'ca098855-03e0-43a9-8873-f727f989f9c5',
          value: {
            type: 'centPrecision',
            currencyCode: 'USD',
            centAmount: 5500,
            fractionDigits: 2,
          },
        },
      ],
      key: '510452BlueSunburst',
      sku: '510452BlueSunburst',
      id: 2,
    },
    {
      attributes: [
        {
          name: 'brand',
          value: {
            key: 'greenland',
            label: {
              en: 'Greenland',
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
            key: 'naturalSatin',
            label: {
              en: 'Natural satin',
            },
          },
        },
      ],
      assets: [],
      images: [
        {
          url: 'https://ltm-music.ru/upload/images/greenland_hw39_nat_.png',
          dimensions: {
            w: 0,
            h: 0,
          },
        },
      ],
      prices: [
        {
          id: 'b318a428-436c-4870-a446-7749a73f60d2',
          value: {
            type: 'centPrecision',
            currencyCode: 'EUR',
            centAmount: 5900,
            fractionDigits: 2,
          },
        },
      ],
      key: '510451NaturalSatin',
      sku: '510451NaturalSatin',
      id: 3,
    },
  ],
  masterVariant: {
    attributes: [
      {
        name: 'brand',
        value: {
          key: 'greenland',
          label: {
            en: 'Greenland',
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
          key: 'black',
          label: {
            en: 'Black',
          },
        },
      },
      {
        name: 'isOnStock',
        value: true,
      },
    ],
    assets: [],
    images: [
      {
        url: 'https://ltm-music.ru/upload/images/greenland_hw39_bk.png',
        dimensions: {
          w: 0,
          h: 0,
        },
      },
    ],
    prices: [
      {
        id: '645d9295-fe0d-426e-90a6-92d3f42cf7c0',
        value: {
          type: 'centPrecision',
          currencyCode: 'EUR',
          centAmount: 5900,
          fractionDigits: 2,
        },
      },
      {
        id: '0d0754cc-c63d-4a35-99f7-601beaf89aaf',
        value: {
          type: 'centPrecision',
          currencyCode: 'USD',
          centAmount: 5500,
          fractionDigits: 2,
        },
      },
    ],
    key: '510453Black',
    sku: '510453Black',
    id: 1,
  },
  searchKeywords: {},
  hasStagedChanges: false,
  published: true,
  taxCategory: {
    typeId: 'tax-category',
    id: 'acfd36b8-89e4-4a4e-abc5-22e796a5cfde',
  },
  createdAt: '2023-08-26T00:38:12.526Z',
  lastModifiedAt: '2023-08-26T00:38:12.526Z',
};
