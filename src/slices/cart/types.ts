import { Cart } from '@commercetools/platform-sdk';

export type TCartSliceState = {
  cart: Cart | null;
  progress: boolean;
  errorMessage: string | null;
};
