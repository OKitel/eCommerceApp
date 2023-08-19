import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Customer } from '@commercetools/platform-sdk';
import spaApi from '../api/Spa';

type TCustomerSliceProgress = {
  login: boolean;
};

type TCustomerSliceState = {
  customerData: Customer | null;
  progress: TCustomerSliceProgress;
};

const initialState: TCustomerSliceState = {
  customerData: null,
  progress: {
    login: false,
  },
};

export const loginCustomer = createAsyncThunk(
  'customer/loginCustomer',
  async (loginData: { email: string; password: string; onSuccess: () => void }) => {
    const { email, password, onSuccess } = loginData;
    const response = await spaApi.loginCustomer(email, password);

    onSuccess();

    return response?.body.customer;
  },
);

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    clearCustomerData: (state) => {
      state.customerData = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginCustomer.pending, (state) => {
      state.progress.login = true;
    });
    builder.addCase(loginCustomer.fulfilled, (state, action) => {
      state.progress.login = false;
      if (action.payload) {
        state.customerData = action.payload;
      }
    });
    builder.addCase(loginCustomer.rejected, (state) => {
      state.progress.login = false;
    });
  },
});

export const { clearCustomerData } = customerSlice.actions;

export default customerSlice.reducer;
