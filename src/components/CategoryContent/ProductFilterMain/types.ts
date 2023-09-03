import { AttributeDefinition } from '@commercetools/platform-sdk';
import { ATTRIBUTE_NAME_LOWER_PRICE_BOUND, ATTRIBUTE_NAME_UPPER_PRICE_BOUND } from './consts';

export type TFilterAttributes = {
  [key: string]: string | boolean | number | undefined;
};

export type AttributeDefinitionWithType<T> = AttributeDefinition & {
  type: T;
};

export type TPriceAttribute = typeof ATTRIBUTE_NAME_LOWER_PRICE_BOUND | typeof ATTRIBUTE_NAME_UPPER_PRICE_BOUND;
