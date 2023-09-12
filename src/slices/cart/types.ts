import { Cart } from '@commercetools/platform-sdk';

type TCartSliceProgress = {
  getActiveCart: boolean;
  addLineItem: boolean;
};

export type TCartSliceState = {
  cart: Cart | null;
  errorMessage: string | null;
  progress: TCartSliceProgress;
};
