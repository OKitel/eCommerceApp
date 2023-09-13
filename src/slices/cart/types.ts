import { Cart, MyCartAddLineItemAction } from '@commercetools/platform-sdk';
import { ServerError } from '../../api/types';

type TCartSliceProgress = {
  getActiveCart: boolean;
  addingLineItem: string | null;
};

export type TCartSliceState = {
  activeCart: Cart | null;
  errorMessage: string | null;
  progress: TCartSliceProgress;
};

export type TAddLineItemRequest = Required<Pick<MyCartAddLineItemAction, 'productId' | 'variantId' | 'quantity'>> & {
  onSuccess: () => void;
  onError: (error: ServerError) => void;
};
