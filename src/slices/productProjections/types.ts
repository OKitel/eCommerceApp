import { ProductProjection } from '@commercetools/platform-sdk';
import { TListPageInfo } from '../../types';

export type TProductProjectionsSliceState = {
  productProjections: ProductProjection[] | null;
  pageInfo: TListPageInfo | null;
  progress: boolean;
  errorMessage: string | null;
};
