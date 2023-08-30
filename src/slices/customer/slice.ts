import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import spaApi from '../../api/Spa';
import ServiceApi from '../../api/Service';
import { TokenStoreTypes } from '../../lib/commercetools-sdk';
import { clearLoggedInCustomerId, getLoggedInCustomerId, getTokenStore } from '../../utils/localStorage';
import { mapErrorMessage } from '../../api/mapError';
import {
  PasswordChangeRequest,
  PersonalInfoUpdateRequest,
  RegistrationRequest,
  TCustomerSliceState,
  TLoginRequest,
} from './types';
import {
  reducerChangePasswordFulfilled,
  reducerChangePasswordPending,
  reducerChangePasswordRejected,
  reducerGetLoggedInCustomerFulfilled,
  reducerGetLoggedInCustomerPending,
  reducerGetLoggedInCustomerRejected,
  reducerLoginCustomerFulfilled,
  reducerLoginCustomerPending,
  reducerLoginCustomerRejected,
  reducerRegisterCustomerFulfilled,
  reducerRegisterCustomerPending,
  reducerRegisterCustomerRejected,
  reducerUpdateCustomerFulfilled,
  reducerUpdateCustomerPending,
  reducerUpdateCustomerRejected,
} from './extraReducers';

const initialState: TCustomerSliceState = {
  customerData: null,
  errorMessage: null,
  progress: {
    introspect: false,
    login: false,
    registration: false,
    update: false,
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
    } catch (error: unknown) {
      const mappedServerError = mapErrorMessage(error);
      onError(mappedServerError);
      return rejectWithValue(mappedServerError);
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
      const mappedServerError = mapErrorMessage(error);
      onError(mappedServerError);
      return rejectWithValue(mappedServerError);
    }
  },
);

export const updateCustomer = createAsyncThunk(
  'customer/updateCustomer',
  async (request: PersonalInfoUpdateRequest, { rejectWithValue }) => {
    const { onSuccess, onError, id, version, firstName, lastName, email, dateOfBirth } = request;
    try {
      const response = await ServiceApi.updateCustomer(id, {
        version,
        actions: [
          { action: 'setFirstName', firstName },
          { action: 'setLastName', lastName },
          { action: 'changeEmail', email },
          { action: 'setDateOfBirth', dateOfBirth },
        ],
      });
      onSuccess();

      return response?.body;
    } catch (error: unknown) {
      const mappedServerError = mapErrorMessage(error);
      onError(mappedServerError);
      return rejectWithValue(mappedServerError);
    }
  },
);

export const changePassword = createAsyncThunk(
  'customer/changePassword',
  async (request: PasswordChangeRequest, { rejectWithValue }) => {
    const { onSuccess, onError, ...req } = request;
    try {
      const response = await ServiceApi.changePasswordOfCustomer({ ...req });
      onSuccess();

      return response?.body;
    } catch (error: unknown) {
      const mappedServerError = mapErrorMessage(error);
      onError(mappedServerError);
      return rejectWithValue(mappedServerError);
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

    builder.addCase(updateCustomer.pending, reducerUpdateCustomerPending);
    builder.addCase(updateCustomer.fulfilled, reducerUpdateCustomerFulfilled);
    builder.addCase(updateCustomer.rejected, reducerUpdateCustomerRejected);

    builder.addCase(changePassword.pending, reducerChangePasswordPending);
    builder.addCase(changePassword.fulfilled, reducerChangePasswordFulfilled);
    builder.addCase(changePassword.rejected, reducerChangePasswordRejected);
  },
});

export const { clearCustomerData } = customerSlice.actions;

export default customerSlice.reducer;
