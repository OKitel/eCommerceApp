import { Draft, PayloadAction } from '@reduxjs/toolkit';
import { TProductTypesSliceState } from './types';
import { ProductType } from '@commercetools/platform-sdk';

export function reducerGetMainProductTypePending(state: Draft<TProductTypesSliceState>): void {
  state.progress = true;
}
export function reducerGetMainProductTypeFulfilled(
  state: Draft<TProductTypesSliceState>,
  action: PayloadAction<ProductType | undefined>,
): void {
  state.progress = false;
  state.errorMessage = null;

  if (action.payload) {
    state.types.main = action.payload;
  }
}
export function reducerGetMainProductTypeRejected(
  state: Draft<TProductTypesSliceState>,
  action: PayloadAction<unknown>,
): void {
  const { payload } = action;

  state.progress = false;
  if (payload && typeof payload === 'string') {
    state.errorMessage = payload;
  }
}
