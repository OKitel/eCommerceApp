import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import spaApi from '../../api/Spa';
import anonymousApi from '../../api/Anonymous';
import { RootState } from '../../store/store';
import { getTokenStore } from '../../utils/localStorage';
import { chooseApiWithToken } from '../../utils/apiUtils';
import { TokenStoreTypes } from '../../lib/commercetools-sdk';
import { mapErrorMessage } from '../../api/mapError';
import {
  reducerGetActiveCartPending,
  reducerGetActiveCartFulfilled,
  reducerGetActiveCartRejected,
  reducerAddLineItemToCartPending,
  reducerAddLineItemToCartFulfilled,
  reducerAddLineItemToCartRejected,
} from './extraReducers';
import { TAddLineItemRequest, TCartSliceState } from './types';
import { MyCartAddLineItemAction } from '@commercetools/platform-sdk';

const initialState: TCartSliceState = {
  activeCart: null,
  errorMessage: null,
  progress: {
    getActiveCart: false,
    addingLineItem: null,
  },
};

export const getActiveCart = createAsyncThunk('cart/getActiveCart', async (_, { rejectWithValue }) => {
  const spaApiTokenStore = getTokenStore(TokenStoreTypes.SpaApiTokenStore);
  const anonymousApiTokenStore = getTokenStore(TokenStoreTypes.AnonymousApiTokenStore);

  try {
    if (spaApiTokenStore.token) {
      const response = await spaApi.getActiveCart();

      return response.body;
    }

    if (anonymousApiTokenStore.token) {
      const response = await anonymousApi.getActiveCart();

      return response.body;
    }
  } catch (error: unknown) {
    const mappedServerError = mapErrorMessage(error);
    return rejectWithValue(mappedServerError);
  }
});

export const addLineItemToCart = createAsyncThunk(
  'cart/addLineItemToCart',
  async (addLineItemRequest: TAddLineItemRequest, { getState, rejectWithValue }) => {
    const api = chooseApiWithToken();
    const {
      settings: { currency },
      cart,
    } = getState() as RootState;

    if (api) {
      const activeCart = cart.activeCart || (await api.createCart(currency)).body;
      const { productId, variantId, quantity, onSuccess, onError } = addLineItemRequest;
      const actionAddLineItem: MyCartAddLineItemAction = { action: 'addLineItem', productId, variantId, quantity };

      try {
        const response = await api.updateCart(activeCart.id, activeCart.version, [actionAddLineItem]);
        onSuccess();

        return response.body;
      } catch (error: unknown) {
        const mappedServerError = mapErrorMessage(error);
        onError(mappedServerError);

        return rejectWithValue(mappedServerError);
      }
    }
  },
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearActiveCart: (state) => {
      state.activeCart = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getActiveCart.pending, reducerGetActiveCartPending);
    builder.addCase(getActiveCart.fulfilled, reducerGetActiveCartFulfilled);
    builder.addCase(getActiveCart.rejected, reducerGetActiveCartRejected);

    builder.addCase(addLineItemToCart.pending, reducerAddLineItemToCartPending);
    builder.addCase(addLineItemToCart.fulfilled, reducerAddLineItemToCartFulfilled);
    builder.addCase(addLineItemToCart.rejected, reducerAddLineItemToCartRejected);
  },
});

export const { clearActiveCart } = cartSlice.actions;

export default cartSlice.reducer;
