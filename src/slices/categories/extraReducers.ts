import { Draft, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '@commercetools/platform-sdk';

import { TCategoriesSliceState } from './types';

export function reducerGetCategoriesPending(state: Draft<TCategoriesSliceState>): void {
  state.progress = true;
}
export function reducerGetCategoriesFulfilled(
  state: Draft<TCategoriesSliceState>,
  action: PayloadAction<Category[] | undefined>,
): void {
  state.progress = false;
  state.errorMessage = null;

  if (action.payload) {
    state.categories = action.payload;
  }
}
export function reducerGetCategoriesRejected(
  state: Draft<TCategoriesSliceState>,
  action: PayloadAction<unknown>,
): void {
  const { payload } = action;

  state.progress = false;
  if (payload && typeof payload === 'string') {
    state.errorMessage = payload;
  }
}
