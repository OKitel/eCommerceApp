import { Draft, PayloadAction } from '@reduxjs/toolkit';
import { Cart } from '@commercetools/platform-sdk';

import { TAddLineItemRequest, TCartSliceState } from './types';
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
