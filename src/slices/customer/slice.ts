import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CustomerUpdateAction } from '@commercetools/platform-sdk';
import { v4 as uuidv4 } from 'uuid';

import spaApi from '../../api/Spa';
import ServiceApi from '../../api/Service';
import { TokenStoreTypes } from '../../lib/commercetools-sdk';
import { clearLoggedInCustomerId, getLoggedInCustomerId, getTokenStore } from '../../utils/localStorage';
import { mapErrorMessage } from '../../api/mapError';
import {
  AddNewAddressRequest,
  ChangeAddressRequest,
  DeleteAddressRequest,
  PasswordChangeRequest,
  PersonalInfoUpdateRequest,
  RegistrationRequest,
  SetDefaultAddressRequest,
  TCustomerSliceState,
  TLoginRequest,
} from './types';
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
  reducerUpdateCustomerFulfilled,
  reducerUpdateCustomerPending,
  reducerUpdateCustomerRejected,
} from './extraReducers';

const initialState: TCustomerSliceState = {
  customerData: undefined,
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
      } else {
        return rejectWithValue('');
      }
    } catch (error) {
      let errorMessage = 'An unknown error occurred';

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      return rejectWithValue(errorMessage);
    }
  } else {
    return rejectWithValue('');
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

export const deleteAddress = createAsyncThunk(
  'customer/deleteAddress',
  async (request: DeleteAddressRequest, { rejectWithValue }) => {
    const { onSuccess, onError, id, version, addressId, type } = request;
    const action = type === 'shipping' ? 'removeShippingAddressId' : 'removeBillingAddressId';
    try {
      const response = await ServiceApi.updateCustomer(id, {
        version,
        actions: [{ action, addressId }],
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

export const addAddress = createAsyncThunk(
  'customer/addAddress',
  async (request: AddNewAddressRequest, { rejectWithValue }) => {
    const { onSuccess, onError, id, version, type, address } = request;
    const addressKey = uuidv4();
    const actions: CustomerUpdateAction[] = [{ action: 'addAddress', address: { key: addressKey, ...address } }];

    if (type === 'shipping' || type === 'both') {
      actions.push({ action: 'addShippingAddressId', addressKey });
    }
    if (type === 'billing' || type === 'both') {
      actions.push({ action: 'addBillingAddressId', addressKey });
    }
    try {
      const response = await ServiceApi.updateCustomer(id, {
        version,
        actions,
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

export const changeAddress = createAsyncThunk(
  'customer/changeAddress',
  async (request: ChangeAddressRequest, { rejectWithValue }) => {
    const { onSuccess, onError, id, version, address, addressId } = request;
    try {
      const response = await ServiceApi.updateCustomer(id, {
        version,
        actions: [{ action: 'changeAddress', addressId, address }],
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

export const setDefaultAddress = createAsyncThunk(
  'customer/setDefaultAddress',
  async (request: SetDefaultAddressRequest, { rejectWithValue }) => {
    const { onSuccess, onError, id, version, type, addressId } = request;
    const action = type === 'shipping' ? 'setDefaultShippingAddress' : 'setDefaultBillingAddress';
    try {
      const response = await ServiceApi.updateCustomer(id, {
        version,
        actions: [{ action, addressId }],
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

    builder.addCase(changePassword.pending, reducerUpdateCustomerPending);
    builder.addCase(changePassword.fulfilled, reducerUpdateCustomerFulfilled);
    builder.addCase(changePassword.rejected, reducerUpdateCustomerRejected);

    builder.addCase(deleteAddress.pending, reducerUpdateCustomerPending);
    builder.addCase(deleteAddress.fulfilled, reducerUpdateCustomerFulfilled);
    builder.addCase(deleteAddress.rejected, reducerUpdateCustomerRejected);

    builder.addCase(addAddress.pending, reducerUpdateCustomerPending);
    builder.addCase(addAddress.fulfilled, reducerUpdateCustomerFulfilled);
    builder.addCase(addAddress.rejected, reducerUpdateCustomerRejected);

    builder.addCase(setDefaultAddress.pending, reducerUpdateCustomerPending);
    builder.addCase(setDefaultAddress.fulfilled, reducerUpdateCustomerFulfilled);
    builder.addCase(setDefaultAddress.rejected, reducerUpdateCustomerRejected);

    builder.addCase(changeAddress.pending, reducerUpdateCustomerPending);
    builder.addCase(changeAddress.fulfilled, reducerUpdateCustomerFulfilled);
    builder.addCase(changeAddress.rejected, reducerUpdateCustomerRejected);
  },
});

export const { clearCustomerData } = customerSlice.actions;

export default customerSlice.reducer;
