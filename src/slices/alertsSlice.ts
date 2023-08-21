import { AlertColor } from '@mui/material';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type TAlert = {
  isShow: boolean;
  message: string;
  severity?: AlertColor;
};

type TAlertsSliceState = {
  alert: TAlert | null;
};

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
