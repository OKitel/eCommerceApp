import { configureStore } from '@reduxjs/toolkit';
import customerReducer from '../slices/customerSlice';

export const store = configureStore({
  reducer: {
    customer: customerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
