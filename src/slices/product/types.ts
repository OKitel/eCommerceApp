import { Product } from '@commercetools/platform-sdk';

export type TProductSliceState = {
  product: Product | null;
  progress: boolean;
  errorMessage: string | null;
};
