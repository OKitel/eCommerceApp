import { ProductType } from '@commercetools/platform-sdk';

export enum Localizations {
  En = 'en',
}

export enum Currencies {
  EUR = 'EUR',
  USD = 'USD',
}

export type TSettings = {
  localization?: Localizations;
  currency?: Currencies;
};

export type TPageParams = {
  name: string;
  slug: string;
};

export type TProductTypes = {
  main: ProductType | null;
};
