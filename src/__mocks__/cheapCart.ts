import { Cart } from '@commercetools/platform-sdk';

export const cheapCart: Cart = {
  id: '61b9309e-061a-4722-8f47-4260e1d2bf19',
  version: 48,
  createdAt: '2023-09-20T17:23:37.758Z',
  lastModifiedAt: '2023-09-20T18:11:26.282Z',
  lastModifiedBy: {
    clientId: 'aGk58xJ6KFku8C3Rf_vnCIAq',
    anonymousId: '82466af8-1821-41a8-9609-e482cd2854c8',
  },
  createdBy: {
    clientId: 'aGk58xJ6KFku8C3Rf_vnCIAq',
    anonymousId: '82466af8-1821-41a8-9609-e482cd2854c8',
  },
  anonymousId: '82466af8-1821-41a8-9609-e482cd2854c8',
  lineItems: [
    {
      id: '16c9b62d-3b57-4e57-b32c-9b05249a9347',
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
      quantity: 2,
      discountedPricePerQuantity: [],
      perMethodTaxRate: [],
      addedAt: '2023-09-20T17:23:37.922Z',
      lastModifiedAt: '2023-09-20T18:11:26.258Z',
      state: [
        {
          quantity: 2,
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
        centAmount: 88400,
        fractionDigits: 2,
      },
      taxedPricePortions: [],
    },
  ],
  cartState: 'Active',
  totalPrice: {
    type: 'centPrecision',
    currencyCode: 'EUR',
    centAmount: 88400,
    fractionDigits: 2,
  },
  shippingMode: 'Single',
  shipping: [],
  customLineItems: [],
  discountCodes: [
    {
      discountCode: {
        typeId: 'discount-code',
        id: 'aa16e076-b053-48b0-bb7d-a7569bf0ebc6',
      },
      state: 'DoesNotMatchCart',
    },
  ],
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
