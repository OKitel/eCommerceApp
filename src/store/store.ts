import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from '../slices/settings/slice';
import customerReducer from '../slices/customer/slice';
import categoriesReducer from '../slices/categories/slice';
import productProjectionsReducer from '../slices/productProjections/slice';
import alertsReducer from '../slices/alerts/slice';

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    customer: customerReducer,
    categories: categoriesReducer,
    productProjections: productProjectionsReducer,
    alerts: alertsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
