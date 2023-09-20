import { Category } from '@commercetools/platform-sdk';

export type TCategoriesSliceState = {
  categories: Category[] | null;
  progress: boolean;
  errorMessage: string | null;
};
