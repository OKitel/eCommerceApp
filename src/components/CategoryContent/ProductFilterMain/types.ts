import { AttributeDefinition } from '@commercetools/platform-sdk';

export type TFilterAttributes = {
  [key: string]: string | boolean | number | undefined;
};

export type AttributeDefinitionWithType<T> = AttributeDefinition & {
  type: T;
};
