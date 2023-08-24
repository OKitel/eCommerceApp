import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import spaApi from '../api/Spa';
import ServiceApi from '../api/Service';
import { TokenStoreTypes } from '../lib/commercetools-sdk';
import { clearLoggedInCustomerId, getLoggedInCustomerId, getTokenStore } from '../utils/localStorage';
import { RegistrationRequest, TCustomerSliceState, TLoginRequest } from './types';
import {
  reducerGetLoggedInCustomerFulfilled,
  reducerGetLoggedInCustomerPending,
  reducerGetLoggedInCustomerRejected,
  reducerLoginCustomerFulfilled,
  reducerLoginCustomerPending,
  reducerLoginCustomerRejected,
  reducerRegisterCustomerFulfilled,
  reducerRegisterCustomerPending,
  reducerRegisterCustomerRejected,
} from './reducers';

const initialState: TCustomerSliceState = {
  customerData: null,
  errorMessage: null,
  progress: {
    introspect: false,
    login: false,
    registration: false,
  },
};

export const getLoggedInCustomer = createAsyncThunk('customer/getLoggedInCustomer', async (_, { rejectWithValue }) => {
  const loggedInCustomerId = getLoggedInCustomerId();
  const spaApiTokenStore = getTokenStore(TokenStoreTypes.SpaApiTokenStore);

  if (loggedInCustomerId && spaApiTokenStore) {
    try {
      const introspectResponse = await ServiceApi.introspectToken(spaApiTokenStore.token);

      if (introspectResponse.active) {
        const response = await ServiceApi.getCustomerById(loggedInCustomerId);

        return response.body;
      }
    } catch (error) {
      let errorMessage = 'An unknown error occurred';

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      return rejectWithValue(errorMessage);
    }
  }
});

export const loginCustomer = createAsyncThunk(
  'customer/loginCustomer',
  async (request: TLoginRequest, { rejectWithValue }) => {
    const { email, password, onSuccess, onError } = request;
    try {
      const response = await spaApi.loginCustomer(email, password);
      onSuccess();

      return response?.body.customer;
    } catch (error) {
      let errorMessage = 'An unknown error occurred';

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      onError(errorMessage);

      return rejectWithValue(errorMessage);
    }
  },
);

export const registerCustomer = createAsyncThunk(
  'customer/registerCustomer',
  async (request: RegistrationRequest, { rejectWithValue }) => {
    const { onSuccess, onError, email, password, ...req } = request;
    try {
      await ServiceApi.createCustomer({ email, password, ...req });
      const response = await spaApi.loginCustomer(email, password);
      onSuccess();

      return response?.body.customer;
    } catch (error: unknown) {
      let errorMessage = 'An unknown error occured';

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      onError(errorMessage);

      return rejectWithValue(errorMessage);
    }
  },
);

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    clearCustomerData: (state) => {
      state.customerData = null;
      clearLoggedInCustomerId();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLoggedInCustomer.pending, reducerGetLoggedInCustomerPending);
    builder.addCase(getLoggedInCustomer.fulfilled, reducerGetLoggedInCustomerFulfilled);
    builder.addCase(getLoggedInCustomer.rejected, reducerGetLoggedInCustomerRejected);

    builder.addCase(loginCustomer.pending, reducerLoginCustomerPending);
    builder.addCase(loginCustomer.fulfilled, reducerLoginCustomerFulfilled);
    builder.addCase(loginCustomer.rejected, reducerLoginCustomerRejected);

    builder.addCase(registerCustomer.pending, reducerRegisterCustomerPending);
    builder.addCase(registerCustomer.fulfilled, reducerRegisterCustomerFulfilled);
    builder.addCase(registerCustomer.rejected, reducerRegisterCustomerRejected);
  },
});

export const { clearCustomerData } = customerSlice.actions;

export default customerSlice.reducer;
