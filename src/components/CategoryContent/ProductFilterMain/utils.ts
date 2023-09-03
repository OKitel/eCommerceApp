import { AttributeDefinition } from '@commercetools/platform-sdk';
import { TFilterAttributes } from './types';

export function getDefaultFilterAttributes(attributes: AttributeDefinition[]): TFilterAttributes {
  const filterAttributes: TFilterAttributes = {};

  attributes.forEach((attribute) => {
    filterAttributes[attribute.name] = undefined;
  });

  return filterAttributes;
}

export function getFilterSearchQueryArg(attributes: TFilterAttributes): string[] {
  const filterSearchQueryArg: string[] = [];
  let priceFrom = '*';
  let priceTo = '*';

  Object.keys(attributes).forEach((key) => {
    if (typeof attributes[key] === 'boolean') {
      filterSearchQueryArg.push(`variants.attributes.${key}:${String(attributes[key])}`);
    }

    if (typeof attributes[key] === 'string') {
      filterSearchQueryArg.push(`variants.attributes.${key}.key:"${attributes[key]}"`);
    }

    if (typeof attributes[key] === 'number') {
      if (key === 'priceFrom') {
        const price = attributes[key];
        const centsAmount = Number(price) * 100;
        priceFrom = String(centsAmount);
      }

      if (key === 'priceTo') {
        const price = attributes[key];
        const centsAmount = Number(price) * 100;
        priceTo = String(centsAmount);
      }
    }
  });

  if (priceFrom !== '*' || priceTo !== '*') {
    filterSearchQueryArg.push(`variants.scopedPrice.value.centAmount:range (${priceFrom} to ${priceTo})`);
  }

  return filterSearchQueryArg;
}
