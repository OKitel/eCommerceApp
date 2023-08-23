import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import spaApi from '../api/Spa';
import ServiceApi from '../api/Service';
import { TokenStoreTypes } from '../lib/commercetools-sdk';
import {
  clearLoggedInCustomerId,
  getLoggedInCustomerId,
  getTokenStore,
  saveLoggedInCustomerId,
} from '../utils/localStorage';
import { RegistrationRequest, TCustomerSliceState, TLoginRequest } from './types';

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
  // eslint-disable-next-line max-lines-per-function
  extraReducers: (builder) => {
    builder.addCase(getLoggedInCustomer.pending, (state) => {
      state.progress.introspect = true;
    });
    builder.addCase(getLoggedInCustomer.fulfilled, (state, action) => {
      state.progress.introspect = false;
      state.errorMessage = null;
      if (action.payload) {
        state.customerData = action.payload;
      }
    });
    builder.addCase(getLoggedInCustomer.rejected, (state, action) => {
      const { payload } = action;

      state.progress.introspect = false;
      if (payload && typeof payload === 'string') {
        state.errorMessage = payload;
      }
    });

    builder.addCase(loginCustomer.pending, (state) => {
      state.progress.login = true;
    });
    builder.addCase(loginCustomer.fulfilled, (state, action) => {
      state.progress.login = false;
      state.errorMessage = null;
      if (action.payload) {
        state.customerData = action.payload;
        saveLoggedInCustomerId(action.payload.id);
      }
    });
    builder.addCase(loginCustomer.rejected, (state, action) => {
      const { payload } = action;

      state.progress.login = false;
      if (payload && typeof payload === 'string') {
        state.errorMessage = payload;
      }
    });

    builder.addCase(registerCustomer.pending, (state) => {
      state.progress.registration = true;
    });
    builder.addCase(registerCustomer.fulfilled, (state, action) => {
      state.progress.registration = false;
      state.errorMessage = null;
      if (action.payload) {
        state.customerData = action.payload;
        saveLoggedInCustomerId(action.payload.id);
      }
    });
    builder.addCase(registerCustomer.rejected, (state) => {
      state.progress.registration = false;
    });
  },
});

export const { clearCustomerData } = customerSlice.actions;

export default customerSlice.reducer;
