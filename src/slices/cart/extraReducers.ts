import { Draft, PayloadAction } from '@reduxjs/toolkit';
import { Cart } from '@commercetools/platform-sdk';

import { TCartSliceState } from './types';

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
    state.cart = action.payload;
  }
}
export function reducerGetActiveCartRejected(state: Draft<TCartSliceState>, action: PayloadAction<unknown>): void {
  const { payload } = action;

  state.progress.getActiveCart = false;
  if (payload && typeof payload === 'string') {
    state.errorMessage = payload;
  }
}
