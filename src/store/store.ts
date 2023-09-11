import { configureStore } from '@reduxjs/toolkit';

import settingsReducer from '../slices/settings/slice';
import customerReducer from '../slices/customer/slice';
import productTypesReducer from '../slices/productTypes/slice';
import categoriesReducer from '../slices/categories/slice';
import productProjectionsReducer from '../slices/productProjections/slice';
import productReducer from '../slices/product/slice';
import cartReducer from '../slices/cart/slice';
import alertsReducer from '../slices/alerts/slice';

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    customer: customerReducer,
    productTypes: productTypesReducer,
    categories: categoriesReducer,
    productProjections: productProjectionsReducer,
    product: productReducer,
    cart: cartReducer,
    alerts: alertsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
