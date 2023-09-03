import { AttributeDefinition } from '@commercetools/platform-sdk';
import { TFilterAttributes } from './types';

export function getDefaultFilterAttributes(attributes: AttributeDefinition[]): TFilterAttributes {
  const filterAttributes: TFilterAttributes = {};

  attributes.forEach((attribute) => {
    filterAttributes[attribute.name] = undefined;
  });

  return filterAttributes;
}
