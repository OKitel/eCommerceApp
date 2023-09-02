import { Draft, PayloadAction } from '@reduxjs/toolkit';
import { TProductSliceState } from './types';
import { Product } from '@commercetools/platform-sdk';

export function reducerGetProductPending(state: Draft<TProductSliceState>): void {
  state.progress = true;
}
export function reducerGetProductFulfilled(
  state: Draft<TProductSliceState>,
  action: PayloadAction<Product | undefined>,
): void {
  state.progress = false;
  state.errorMessage = null;

  if (action.payload) {
    state.product = action.payload;
  }
}
export function reducerGetProductRejected(state: Draft<TProductSliceState>, action: PayloadAction<unknown>): void {
  const { payload } = action;

  state.progress = false;
  if (payload && typeof payload === 'string') {
    state.errorMessage = payload;
  }
}
