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
  changeCartCurrency: boolean;
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

export type TRemoveLineItemRequest = Required<Pick<MyCartRemoveLineItemAction, 'lineItemId'>> & {
  quantity?: number;
  onSuccess: () => void;
  onError: (error: ServerError) => void;
};

export type TChangeLineItemQuantity = Required<Pick<MyCartChangeLineItemQuantityAction, 'lineItemId' | 'quantity'>> & {
  onSuccess: () => void;
  onError: (error: ServerError) => void;
};

export type TClearCartRequest = {
  onSuccess: () => void;
  onError: (error: ServerError) => void;
};
