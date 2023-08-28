import { configureStore } from '@reduxjs/toolkit';
import customerReducer from '../slices/customer/slice';
import alertsReducer from '../slices/alerts/slice';
import settingsReducer from '../slices/settings/slice';

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    customer: customerReducer,
    alerts: alertsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
