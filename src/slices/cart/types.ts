import { Cart } from '@commercetools/platform-sdk';

type TCartSliceProgress = {
  getActiveCart: boolean;
  addLineItem: boolean;
};

export type TCartSliceState = {
  activeCart: Cart | null;
  errorMessage: string | null;
  progress: TCartSliceProgress;
};
