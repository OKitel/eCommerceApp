import {
  Cart,
  MyCartAddLineItemAction,
  MyCartChangeLineItemQuantityAction,
  MyCartRemoveLineItemAction,
} from '@commercetools/platform-sdk';
import { ServerError } from '../../api/types';

type TCartSliceProgress = {
  getActiveCart: boolean;
  addingLineItem: string | null;
  modifyingCart: boolean;
  getDiscountCode: boolean;
  setDiscountCode: boolean;
  changeCartCurrency: boolean;
};

export type TCartSliceState = {
  activeCart: Cart | null;
  discountCode: string | null;
  errorMessage: string | null;
  progress: TCartSliceProgress;
};

export type TAddLineItemRequest = Required<Pick<MyCartAddLineItemAction, 'productId' | 'variantId' | 'quantity'>> & {
  onSuccess: () => void;
  onError: (error: ServerError) => void;
};

export type TRemoveLineItemRequest = Required<Pick<MyCartRemoveLineItemAction, 'lineItemId'>> & {
  quantity?: number;
  onSuccess: () => void;
  onError: (error: ServerError) => void;
};

export type TChangeLineItemQuantity = Required<Pick<MyCartChangeLineItemQuantityAction, 'lineItemId' | 'quantity'>> & {
  onSuccess: () => void;
  onError: (error: ServerError) => void;
};

export type TCommonCartRequest = {
  onSuccess: () => void;
  onError: (error: ServerError) => void;
};

export type TAddDiscountCodeRequest = {
  code: string;
  onSuccess: () => void;
  onError: (error: ServerError) => void;
};
