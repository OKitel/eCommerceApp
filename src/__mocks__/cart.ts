import { Cart } from '@commercetools/platform-sdk';

export const mockCart: Cart = {
  id: '0fc400ec-244d-4200-b136-2eb4b0d6f943',
  version: 7,
  createdAt: '2023-09-10T16:44:29.902Z',
  lastModifiedAt: '2023-09-11T21:12:00.091Z',
  lastModifiedBy: {
    clientId: 'RDZ6FDxZNu4mGMC0w3jxo5e2',
    customer: {
      typeId: 'customer',
      id: '1cd65132-38ad-4c03-9ff9-4cf94dae09b6',
    },
  },
  createdBy: {
    clientId: 'RDZ6FDxZNu4mGMC0w3jxo5e2',
    customer: {
      typeId: 'customer',
      id: '1cd65132-38ad-4c03-9ff9-4cf94dae09b6',
    },
  },
  customerId: '1cd65132-38ad-4c03-9ff9-4cf94dae09b6',
  lineItems: [
    {
      id: 'da5ed618-335f-4965-861e-480fba3a88bd',
      productId: '9d2c241e-0fa9-4120-a83d-71828dd9813e',
      productKey: '133',
      name: {
        en: 'Schecter BANSHEE-6 EXTREME Electric Guitar',
      },
      productType: {
        typeId: 'product-type',
        id: '9e1fc8c0-e73d-426f-b008-c9e49798036a',
      },
      productSlug: {
        en: 'banshee-extreme-6-bchb-new',
      },
      variant: {
        id: 1,
        sku: '515322BlackCherryBurst',
        key: '515322BlackCherryBurst',
        prices: [
          {
            id: '03e426c2-81b7-49fe-a536-21d348448812',
            value: {
              type: 'centPrecision',
              currencyCode: 'EUR',
              centAmount: 44200,
              fractionDigits: 2,
            },
          },
          {
            id: 'e606d7c1-5a81-4872-b44b-d44a1ddb8ff1',
            value: {
              type: 'centPrecision',
              currencyCode: 'USD',
              centAmount: 40600,
              fractionDigits: 2,
            },
          },
        ],
        images: [
          {
            url: 'https://ltm-music.ru/upload/images/banshee_extreme_6_bchb_new.png',
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
              key: 'schecter',
              label: {
                en: 'Schecter',
              },
            },
          },
          {
            name: 'manufacturer',
            value: {
              key: 'indonesia',
              label: {
                en: 'Indonesia',
              },
            },
          },
          {
            name: 'color',
            value: {
              key: 'blackCherryBurst',
              label: {
                en: 'Black cherry burst',
              },
            },
          },
          {
            name: 'isOnStock',
            value: true,
          },
        ],
        assets: [],
      },
      price: {
        id: '03e426c2-81b7-49fe-a536-21d348448812',
        value: {
          type: 'centPrecision',
          currencyCode: 'EUR',
          centAmount: 44200,
          fractionDigits: 2,
        },
      },
      quantity: 1,
      discountedPricePerQuantity: [],
      perMethodTaxRate: [],
      addedAt: '2023-09-10T16:59:20.930Z',
      lastModifiedAt: '2023-09-10T16:59:20.930Z',
      state: [
        {
          quantity: 1,
          state: {
            typeId: 'state',
            id: '4bb608e4-6697-4e2f-ac82-df591b370396',
          },
        },
      ],
      priceMode: 'Platform',
      lineItemMode: 'Standard',
      totalPrice: {
        type: 'centPrecision',
        currencyCode: 'EUR',
        centAmount: 44200,
        fractionDigits: 2,
      },
      taxedPricePortions: [],
    },
    {
      id: '0e84c306-cea8-470a-83ae-0787fe454316',
      productId: '93ba0c62-5a13-445f-9d3e-4a88aaa4cf90',
      productKey: '4',
      name: {
        en: 'Artesia PE-88 Digital Piano',
      },
      productType: {
        typeId: 'product-type',
        id: '9e1fc8c0-e73d-426f-b008-c9e49798036a',
      },
      productSlug: {
        en: 'artesia-pe-88-bk',
      },
      variant: {
        id: 2,
        sku: '503750White',
        key: '503750White',
        prices: [
          {
            id: 'e532bfd3-56b4-4a4b-b953-caa9268992cd',
            value: {
              type: 'centPrecision',
              currencyCode: 'EUR',
              centAmount: 30400,
              fractionDigits: 2,
            },
            discounted: {
              value: {
                type: 'centPrecision',
                currencyCode: 'EUR',
                centAmount: 27360,
                fractionDigits: 2,
              },
              discount: {
                typeId: 'product-discount',
                id: '80e37988-109e-4a62-898a-296bd8a948c4',
              },
            },
          },
          {
            id: '47e3d250-cc58-4978-b04c-4144b90ef252',
            value: {
              type: 'centPrecision',
              currencyCode: 'USD',
              centAmount: 27900,
              fractionDigits: 2,
            },
            discounted: {
              value: {
                type: 'centPrecision',
                currencyCode: 'USD',
                centAmount: 25110,
                fractionDigits: 2,
              },
              discount: {
                typeId: 'product-discount',
                id: '80e37988-109e-4a62-898a-296bd8a948c4',
              },
            },
          },
        ],
        images: [
          {
            url: 'https://ltm-music.ru/upload/images/artesia_pe-88_bk.jpg',
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
              key: 'artesia',
              label: {
                en: 'Artesia',
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
      price: {
        id: 'e532bfd3-56b4-4a4b-b953-caa9268992cd',
        value: {
          type: 'centPrecision',
          currencyCode: 'EUR',
          centAmount: 30400,
          fractionDigits: 2,
        },
        discounted: {
          value: {
            type: 'centPrecision',
            currencyCode: 'EUR',
            centAmount: 27360,
            fractionDigits: 2,
          },
          discount: {
            typeId: 'product-discount',
            id: '80e37988-109e-4a62-898a-296bd8a948c4',
          },
        },
      },
      quantity: 1,
      discountedPricePerQuantity: [],
      perMethodTaxRate: [],
      addedAt: '2023-09-11T21:12:00.069Z',
      lastModifiedAt: '2023-09-11T21:12:00.069Z',
      state: [
        {
          quantity: 1,
          state: {
            typeId: 'state',
            id: '4bb608e4-6697-4e2f-ac82-df591b370396',
          },
        },
      ],
      priceMode: 'Platform',
      lineItemMode: 'Standard',
      totalPrice: {
        type: 'centPrecision',
        currencyCode: 'EUR',
        centAmount: 27360,
        fractionDigits: 2,
      },
      taxedPricePortions: [],
    },
  ],
  cartState: 'Active',
  totalPrice: {
    type: 'centPrecision',
    currencyCode: 'EUR',
    centAmount: 71560,
    fractionDigits: 2,
  },
  shippingMode: 'Single',
  shipping: [],
  customLineItems: [],
  discountCodes: [],
  directDiscounts: [],
  inventoryMode: 'None',
  taxMode: 'Platform',
  taxRoundingMode: 'HalfEven',
  taxCalculationMode: 'LineItemLevel',
  deleteDaysAfterLastModification: 90,
  refusedGifts: [],
  origin: 'Customer',
  itemShippingAddresses: [],
  totalLineItemQuantity: 2,
};
