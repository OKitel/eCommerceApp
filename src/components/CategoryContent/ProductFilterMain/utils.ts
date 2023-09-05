import { AttributeDefinition } from '@commercetools/platform-sdk';
import { TFilterAttributes } from '../types';
import {
  ATTRIBUTE_NAME_LOWER_PRICE_BOUND,
  ATTRIBUTE_NAME_UPPER_PRICE_BOUND,
  IGNORED_PRICE_FILTER_VALUE,
} from './FilterAttributes/consts';

export function getDefaultFilterAttributes(attributes: AttributeDefinition[]): TFilterAttributes {
  const filterAttributes: TFilterAttributes = {};

  attributes.forEach((attribute) => {
    filterAttributes[attribute.name] = undefined;
  });

  return filterAttributes;
}

export function getFilterSearchQueryArg(attributes: TFilterAttributes, categoryId?: string): string[] {
  const filterSearchQueryArg: string[] = [];
  let priceFrom = IGNORED_PRICE_FILTER_VALUE;
  let priceTo = IGNORED_PRICE_FILTER_VALUE;

  Object.keys(attributes).forEach((key) => {
    if (typeof attributes[key] === 'boolean') {
      filterSearchQueryArg.push(`variants.attributes.${key}:${String(attributes[key])}`);
    }

    if (typeof attributes[key] === 'string') {
      filterSearchQueryArg.push(`variants.attributes.${key}.key:"${attributes[key]}"`);
    }

    if (typeof attributes[key] === 'number') {
      if (key === ATTRIBUTE_NAME_LOWER_PRICE_BOUND) {
        const price = attributes[key];
        const centsAmount = Number(price) * 100;
        priceFrom = String(centsAmount);
      }

      if (key === ATTRIBUTE_NAME_UPPER_PRICE_BOUND) {
        const price = attributes[key];
        const centsAmount = Number(price) * 100;
        priceTo = String(centsAmount);
      }
    }
  });

  if (priceFrom !== IGNORED_PRICE_FILTER_VALUE || priceTo !== IGNORED_PRICE_FILTER_VALUE) {
    filterSearchQueryArg.push(`variants.scopedPrice.value.centAmount:range (${priceFrom} to ${priceTo})`);
  }

  if (categoryId) {
    filterSearchQueryArg.push(`categories.id:"${categoryId}"`);
  }

  return filterSearchQueryArg;
}
