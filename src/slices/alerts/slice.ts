import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { TAlert, TAlertsSliceState } from './types';

const initialState: TAlertsSliceState = {
  alert: null,
};

const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    setAlert: (state, action: PayloadAction<Omit<TAlert, 'isShow'>>) => {
      state.alert = { ...action.payload, isShow: true };
    },
    clearAlert: (state) => {
      if (state.alert) {
        state.alert.isShow = false;
      }
    },
  },
});

export const { setAlert, clearAlert } = alertsSlice.actions;

export default alertsSlice.reducer;
