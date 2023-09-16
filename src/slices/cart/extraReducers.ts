import { Draft, PayloadAction } from '@reduxjs/toolkit';
import { Cart } from '@commercetools/platform-sdk';

import {
  TAddLineItemRequest,
  TCartSliceState,
  TChangeLineItemQuantity,
  TClearCartRequest,
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
  action: FulfilledAction<TRemoveLineItemRequest | TClearCartRequest, Cart | undefined>,
): void {
  state.progress.modifyingCart = false;
  state.errorMessage = null;

  if (action.payload) {
    state.activeCart = action.payload;
  }
}

export function reducerRemoveLineItemFromCartRejected(
  state: Draft<TCartSliceState>,
  action: RejectedAction<TRemoveLineItemRequest | TClearCartRequest>,
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
