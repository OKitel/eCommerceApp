import { Draft, PayloadAction } from '@reduxjs/toolkit';
import { Customer } from '@commercetools/platform-sdk';

import { TCustomerSliceState } from './types';
import { clearLoggedInCustomerId, clearTokenStore, saveLoggedInCustomerId } from '../../utils/localStorage';
import { TokenStoreTypes } from '../../lib/commercetools-sdk';

export function reducerGetLoggedInCustomerPending(state: Draft<TCustomerSliceState>): void {
  state.progress.introspect = true;
}
export function reducerGetLoggedInCustomerFulfilled(
  state: Draft<TCustomerSliceState>,
  action: PayloadAction<Customer | undefined>,
): void {
  state.progress.introspect = false;
  state.errorMessage = null;

  if (action.payload) {
    state.customerData = action.payload;
  } else {
    clearLoggedInCustomerId();
    clearTokenStore(TokenStoreTypes.SpaApiTokenStore);
  }
}
export function reducerGetLoggedInCustomerRejected(
  state: Draft<TCustomerSliceState>,
  action: PayloadAction<unknown>,
): void {
  const { payload } = action;
  state.customerData = null;
  state.progress.introspect = false;
  if (payload && typeof payload === 'string') {
    state.errorMessage = payload;
  }
}

export function reducerLoginCustomerPending(state: Draft<TCustomerSliceState>): void {
  state.progress.login = true;
}
export function reducerLoginCustomerFulfilled(
  state: Draft<TCustomerSliceState>,
  action: PayloadAction<Customer | undefined>,
): void {
  state.progress.login = false;
  state.errorMessage = null;
  if (action.payload) {
    state.customerData = action.payload;
    saveLoggedInCustomerId(action.payload.id);
  }
}
export function reducerLoginCustomerRejected(state: Draft<TCustomerSliceState>, action: PayloadAction<unknown>): void {
  const { payload } = action;

  state.progress.login = false;
  if (payload && typeof payload === 'string') {
    state.errorMessage = payload;
  }
}

export function reducerRegisterCustomerPending(state: Draft<TCustomerSliceState>): void {
  state.progress.registration = true;
}
export function reducerRegisterCustomerFulfilled(
  state: Draft<TCustomerSliceState>,
  action: PayloadAction<Customer | undefined>,
): void {
  state.progress.registration = false;
  state.errorMessage = null;
  if (action.payload) {
    state.customerData = action.payload;
    saveLoggedInCustomerId(action.payload.id);
  }
}
export function reducerRegisterCustomerRejected(state: Draft<TCustomerSliceState>): void {
  state.progress.registration = false;
}

export function reducerUpdateCustomerFulfilled(
  state: Draft<TCustomerSliceState>,
  action: PayloadAction<Customer | undefined>,
): void {
  state.progress.update = false;
  state.errorMessage = null;

  if (action.payload) {
    state.customerData = action.payload;
  }
}

export function reducerUpdateCustomerRejected(state: Draft<TCustomerSliceState>, action: PayloadAction<unknown>): void {
  const { payload } = action;

  state.progress.update = false;
  if (payload && typeof payload === 'string') {
    state.errorMessage = payload;
  }
}

export function reducerUpdateCustomerPending(state: Draft<TCustomerSliceState>): void {
  state.progress.update = true;
}
