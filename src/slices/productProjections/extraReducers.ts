import { Draft, PayloadAction } from '@reduxjs/toolkit';
import { TProductProjectionsSliceState } from './types';
import { ProductProjection } from '@commercetools/platform-sdk';

export function reducerGetProductProjectionsPending(state: Draft<TProductProjectionsSliceState>): void {
  state.progress = true;
}
export function reducerGetProductProjectionsFulfilled(
  state: Draft<TProductProjectionsSliceState>,
  action: PayloadAction<ProductProjection[] | undefined>,
): void {
  state.progress = false;
  state.errorMessage = null;

  if (action.payload) {
    state.productProjections = action.payload;
  }
}
export function reducerGetProductProjectionsRejected(
  state: Draft<TProductProjectionsSliceState>,
  action: PayloadAction<unknown>,
): void {
  const { payload } = action;

  state.progress = false;
  if (payload && typeof payload === 'string') {
    state.errorMessage = payload;
  }
}
