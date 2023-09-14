import { AttributeDefinition } from '@commercetools/platform-sdk';

export type AttributeDefinitionWithType<T> = AttributeDefinition & {
  type: T;
};
