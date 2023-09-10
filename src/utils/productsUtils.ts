import { AttributeLocalizedEnumValue, DiscountedPrice, Price, ProductVariant } from '@commercetools/platform-sdk';

import { Currencies, Localizations } from '../types';

export function formatPriceCents(value: number, localization: Localizations, currency: Currencies): string {
  return (value / 100).toLocaleString(localization, { style: 'currency', currency: currency });
}

export function getVariantAttributeLocalizedEnumValue(
  variant: ProductVariant,
  attributeName: string,
  localization: Localizations,
): AttributeLocalizedEnumValue {
  const attributeLocalizedEnumValuePlug: AttributeLocalizedEnumValue = {
    key: `key-${variant.id}`,
    label: {
      [localization]: `${localization}-${attributeName}-${variant.id}`,
    },
  };
  const { attributes } = variant;

  if (attributes) {
    const attributeFound = attributes.find((attribute) => attribute.name === attributeName);

    return attributeFound?.value || attributeLocalizedEnumValuePlug;
  } else {
    return attributeLocalizedEnumValuePlug;
  }
}

export function findPriceWithCurrencyCode(prices: Price[] | undefined, currency: Currencies): Price | undefined {
  if (prices && prices.length) {
    return prices.find((price) => price.value.currencyCode === currency);
  }
}

export function findDiscountPriceWithCurrencyCode(
  prices: Price[] | undefined,
  currency: Currencies,
): DiscountedPrice | undefined {
  if (prices && prices.length) {
    return prices.find((price) => price.discounted?.value.currencyCode === currency)?.discounted;
  }
}
