import { configureStore } from '@reduxjs/toolkit';
import customerReducer from '../slices/customerSlice';
import alertsReducer from '../slices/alertsSlice';

export const store = configureStore({
  reducer: {
    customer: customerReducer,
    alerts: alertsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
