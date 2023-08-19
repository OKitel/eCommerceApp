import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Customer } from '@commercetools/platform-sdk';
import spaApi from '../api/Spa';
import ServiceApi from '../api/Service';
import { RegistrationRequest } from './types';

type TCustomerSliceProgress = {
  login: boolean;
  registration: boolean;
};

type TCustomerSliceState = {
  customerData: Customer | null;
  progress: TCustomerSliceProgress;
};

const initialState: TCustomerSliceState = {
  customerData: null,
  progress: {
    login: false,
    registration: false,
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

export const registerCustomer = createAsyncThunk('customer/registerCustomer', async (request: RegistrationRequest) => {
  const { onSuccess, ...req } = request;
  const response = await ServiceApi.createCustomer(req);

  onSuccess();

  return response?.body.customer;
});

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
    builder.addCase(registerCustomer.pending, (state) => {
      state.progress.registration = true;
    });
    builder.addCase(registerCustomer.fulfilled, (state, action) => {
      state.progress.registration = false;
      if (action.payload) {
        state.customerData = action.payload;
      }
    });
    builder.addCase(registerCustomer.rejected, (state) => {
      state.progress.registration = false;
    });
  },
});

export const { clearCustomerData } = customerSlice.actions;

export default customerSlice.reducer;
