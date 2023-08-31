import { ErrorResponse } from '@commercetools/platform-sdk/dist/declarations/src/generated/';
import { QueryParam } from '@commercetools/sdk-client-v2';

export type TIntrospectResponse =
  | {
      active: true;
    }
  | {
      active: false;
      scope: string;
      exp: Date;
      client_id: string;
    };

export type ServerError = { message: string; validationMessages: { [key: string]: string } };

type SingleValidationError = {
  code: string;
  field: string;
  message: string;
};

export type ValidationErrorResponse = ErrorResponse & { body: { errors: SingleValidationError[] } };

export type ProductProjectionSearchQueryArgs = {
  fuzzy?: boolean;
  fuzzyLevel?: number;
  markMatchingVariants?: boolean;
  filter?: string | string[];
  'filter.facets'?: string | string[];
  'filter.query'?: string | string[];
  facet?: string | string[];
  sort?: string | string[];
  limit?: number;
  offset?: number;
  withTotal?: boolean;
  staged?: boolean;
  priceCurrency?: string;
  priceCountry?: string;
  priceCustomerGroup?: string;
  priceChannel?: string;
  localeProjection?: string | string[];
  storeProjection?: string;
  expand?: string | string[];
  [key: string]: QueryParam;
};
