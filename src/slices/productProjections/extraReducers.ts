import { Draft, PayloadAction } from '@reduxjs/toolkit';
import { ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';
import { TProductProjectionsSliceState } from './types';

export function reducerGetProductProjectionsPending(state: Draft<TProductProjectionsSliceState>): void {
  state.productProjections = null;
  state.pageInfo = null;
  state.progress = true;
}
export function reducerGetProductProjectionsFulfilled(
  state: Draft<TProductProjectionsSliceState>,
  action: PayloadAction<ProductProjectionPagedQueryResponse>,
): void {
  state.progress = false;
  state.errorMessage = null;

  if (action.payload) {
    const { count, limit, offset, total, results } = action.payload;

    state.productProjections = results;
    state.pageInfo = { count, limit, offset, total };
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
