import { Draft, PayloadAction } from '@reduxjs/toolkit';
import { TCustomerSliceState } from './types';
import { Customer } from '@commercetools/platform-sdk';
import { saveLoggedInCustomerId } from '../utils/localStorage';

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
  }
}
export function reducerGetLoggedInCustomerRejected(
  state: Draft<TCustomerSliceState>,
  action: PayloadAction<unknown>,
): void {
  const { payload } = action;

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
