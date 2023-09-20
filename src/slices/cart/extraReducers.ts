import { Draft, PayloadAction } from '@reduxjs/toolkit';
import { Cart, DiscountCode } from '@commercetools/platform-sdk';

import {
  TAddDiscountCodeRequest,
  TAddLineItemRequest,
  TCartSliceState,
  TChangeLineItemQuantity,
  TCommonCartRequest,
  TRemoveLineItemRequest,
} from './types';
import { FulfilledAction, PendingAction, RejectedAction } from '../types';

export function reducerGetActiveCartPending(state: Draft<TCartSliceState>): void {
  state.progress.getActiveCart = true;
}
export function reducerGetActiveCartFulfilled(
  state: Draft<TCartSliceState>,
  action: PayloadAction<Cart | undefined>,
): void {
  state.progress.getActiveCart = false;
  state.errorMessage = null;

  if (action.payload) {
    state.activeCart = action.payload;
  }
}
export function reducerGetActiveCartRejected(state: Draft<TCartSliceState>, action: PayloadAction<unknown>): void {
  const { payload } = action;

  state.progress.getActiveCart = false;
  if (payload && typeof payload === 'string') {
    state.errorMessage = payload;
  }
}

export function reducerAddLineItemToCartPending(
  state: Draft<TCartSliceState>,
  action: PendingAction<TAddLineItemRequest>,
): void {
  state.progress.addingLineItem = action.meta.arg.productId;
}
export function reducerAddLineItemToCartFulfilled(
  state: Draft<TCartSliceState>,
  action: FulfilledAction<TAddLineItemRequest, Cart | undefined>,
): void {
  state.progress.addingLineItem = null;
  state.errorMessage = null;

  if (action.payload) {
    state.activeCart = action.payload;
  }
}
export function reducerAddLineItemToCartRejected(
  state: Draft<TCartSliceState>,
  action: RejectedAction<TAddLineItemRequest>,
): void {
  const { payload } = action;

  state.progress.addingLineItem = null;
  if (payload && typeof payload === 'string') {
    state.errorMessage = payload;
  }
}

export function reducerRemoveLineItemFromCartPending(state: Draft<TCartSliceState>): void {
  state.progress.modifyingCart = true;
}

export function reducerRemoveLineItemFromCartFulfilled(
  state: Draft<TCartSliceState>,
  action: FulfilledAction<TRemoveLineItemRequest | TCommonCartRequest, Cart | undefined>,
): void {
  state.progress.modifyingCart = false;
  state.errorMessage = null;

  if (action.payload) {
    state.activeCart = action.payload;
  }
}

export function reducerRemoveLineItemFromCartRejected(
  state: Draft<TCartSliceState>,
  action: RejectedAction<TRemoveLineItemRequest | TCommonCartRequest>,
): void {
  const { payload } = action;

  state.progress.modifyingCart = false;
  if (payload && typeof payload === 'string') {
    state.errorMessage = payload;
  }
}

export function reducerChangeLineItemQuantityPending(state: Draft<TCartSliceState>): void {
  state.progress.modifyingCart = true;
}

export function reducerChangeLineItemQuantityFulfilled(
  state: Draft<TCartSliceState>,
  action: FulfilledAction<TChangeLineItemQuantity, Cart | undefined>,
): void {
  state.progress.modifyingCart = false;
  state.errorMessage = null;

  if (action.payload) {
    state.activeCart = action.payload;
  }
}

export function reducerChangeLineItemQuantityRejected(
  state: Draft<TCartSliceState>,
  action: RejectedAction<TChangeLineItemQuantity>,
): void {
  const { payload } = action;

  state.progress.modifyingCart = false;
  if (payload && typeof payload === 'string') {
    state.errorMessage = payload;
  }
}

export function reducerChangeCartCurrencyPending(state: Draft<TCartSliceState>): void {
  state.progress.changeCartCurrency = true;
}
export function reducerChangeCartCurrencyFulfilled(
  state: Draft<TCartSliceState>,
  action: PayloadAction<Cart | undefined>,
): void {
  state.discountCode = null;
  state.progress.changeCartCurrency = false;
  state.errorMessage = null;

  if (action.payload) {
    state.activeCart = action.payload;
  }
}
export function reducerChangeCartCurrencyRejected(state: Draft<TCartSliceState>, action: PayloadAction<unknown>): void {
  const { payload } = action;

  state.progress.changeCartCurrency = false;
  if (payload && typeof payload === 'string') {
    state.errorMessage = payload;
  }
}

export function reducerAddDiscountCodePending(state: Draft<TCartSliceState>): void {
  state.progress.setDiscountCode = true;
}
export function reducerAddDiscountCodeFulfilled(
  state: Draft<TCartSliceState>,
  action: FulfilledAction<TAddDiscountCodeRequest, Cart | undefined>,
): void {
  state.discountCode = action.meta.arg.code;
  state.progress.setDiscountCode = false;
  state.errorMessage = null;

  if (action.payload) {
    state.activeCart = action.payload;
  }
}
export function reducerAddDiscountCodeRejected(state: Draft<TCartSliceState>, action: PayloadAction<unknown>): void {
  const { payload } = action;

  state.progress.setDiscountCode = false;
  if (payload && typeof payload === 'string') {
    state.errorMessage = payload;
  }
}

export function reducerRemoveDiscountCodePending(state: Draft<TCartSliceState>): void {
  state.progress.setDiscountCode = true;
}
export function reducerRemoveDiscountCodeFulfilled(
  state: Draft<TCartSliceState>,
  action: PayloadAction<Cart | undefined>,
): void {
  state.discountCode = null;
  state.progress.setDiscountCode = false;
  state.errorMessage = null;

  if (action.payload) {
    state.activeCart = action.payload;
  }
}
export function reducerRemoveDiscountCodeRejected(state: Draft<TCartSliceState>, action: PayloadAction<unknown>): void {
  const { payload } = action;

  state.progress.setDiscountCode = false;
  if (payload && typeof payload === 'string') {
    state.errorMessage = payload;
  }
}

export function reducerGetAppliedDiscountCodePending(state: Draft<TCartSliceState>): void {
  state.progress.getDiscountCode = true;
}
export function reducerGetAppliedDiscountCodeFulfilled(
  state: Draft<TCartSliceState>,
  action: PayloadAction<DiscountCode | undefined>,
): void {
  state.progress.getDiscountCode = false;
  state.errorMessage = null;

  if (action.payload) {
    state.discountCode = action.payload.code;
  }
}
export function reducerGetAppliedDiscountCodeRejected(
  state: Draft<TCartSliceState>,
  action: PayloadAction<unknown>,
): void {
  const { payload } = action;

  state.progress.getDiscountCode = false;
  if (payload && typeof payload === 'string') {
    state.errorMessage = payload;
  }
}
