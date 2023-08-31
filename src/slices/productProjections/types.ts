import { ProductProjection } from '@commercetools/platform-sdk';

export type TProductProjectionsSliceState = {
  productProjections: ProductProjection[] | null;
  progress: boolean;
  errorMessage: string | null;
};
