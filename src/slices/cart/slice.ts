import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import spaApi from '../../api/Spa';
import anonymousApi from '../../api/Anonymous';
import { RootState } from '../../store/store';
import { getAppliedDiscountCode, getTokenStore } from '../../utils/localStorage';
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
  reducerRemoveLineItemFromCartPending,
  reducerRemoveLineItemFromCartFulfilled,
  reducerRemoveLineItemFromCartRejected,
  reducerChangeLineItemQuantityPending,
  reducerChangeLineItemQuantityFulfilled,
  reducerChangeLineItemQuantityRejected,
  reducerChangeCartCurrencyPending,
  reducerChangeCartCurrencyFulfilled,
  reducerChangeCartCurrencyRejected,
} from './extraReducers';
import { Currencies } from '../../types';
import {
  TAddLineItemRequest,
  TCartSliceState,
  TChangeLineItemQuantity,
  TClearCartRequest,
  TRemoveLineItemRequest,
} from './types';
import {
  MyCartAddLineItemAction,
  MyCartChangeLineItemQuantityAction,
  MyCartRemoveLineItemAction,
} from '@commercetools/platform-sdk';

const initialState: TCartSliceState = {
  activeCart: null,
  errorMessage: null,
  progress: {
    getActiveCart: false,
    addingLineItem: null,
    modifyingCart: false,
    changeCartCurrency: false,
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
      const activeCart = cart.activeCart || (await api.createCart({ currency })).body;
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

export const removeLineItemFromCart = createAsyncThunk(
  'cart/removeLineItemFromCart',
  async (removeLineItemRequest: TRemoveLineItemRequest, { getState, rejectWithValue }) => {
    const api = chooseApiWithToken();
    const {
      cart: { activeCart },
    } = getState() as RootState;

    if (api && activeCart) {
      const { lineItemId, quantity, onSuccess, onError } = removeLineItemRequest;
      const actionRemoveLineItem: MyCartRemoveLineItemAction = {
        action: 'removeLineItem',
        lineItemId,
        quantity,
      };

      try {
        const response = await api.updateCart(activeCart.id, activeCart.version, [actionRemoveLineItem]);
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

export const changeLineItemQuantity = createAsyncThunk(
  'cart/changeLineItemQuantity',
  async (changeLineItemQuantityRequest: TChangeLineItemQuantity, { getState, rejectWithValue }) => {
    const api = chooseApiWithToken();
    const {
      cart: { activeCart },
    } = getState() as RootState;

    if (api && activeCart) {
      const { lineItemId, quantity, onSuccess, onError } = changeLineItemQuantityRequest;
      const actionChangeLineItemQuantity: MyCartChangeLineItemQuantityAction = {
        action: 'changeLineItemQuantity',
        lineItemId,
        quantity,
      };

      try {
        const response = await api.updateCart(activeCart.id, activeCart.version, [actionChangeLineItemQuantity]);
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

export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (clearCartRequest: TClearCartRequest, { getState, rejectWithValue }) => {
    const api = chooseApiWithToken();
    const {
      cart: { activeCart },
    } = getState() as RootState;

    if (api && activeCart) {
      const { onSuccess, onError } = clearCartRequest;
      const actions: MyCartRemoveLineItemAction[] = activeCart.lineItems.map((item) => ({
        action: 'removeLineItem',
        lineItemId: item.id,
      }));

      try {
        const response = await api.updateCart(activeCart.id, activeCart.version, actions);
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

export const changeCartCurrency = createAsyncThunk(
  'cart/changeCartCurrency',
  async (currency: Currencies, { getState, rejectWithValue }) => {
    const api = chooseApiWithToken();
    const {
      cart: { activeCart },
    } = getState() as RootState;

    if (api && activeCart) {
      const prevCartLineItems = activeCart.lineItems.map((lineItem) => ({
        productId: lineItem.productId,
        variantId: lineItem.variant.id,
        quantity: lineItem.quantity,
      }));
      const appliedDiscountCode = getAppliedDiscountCode();
      const prevCartDiscountCodes = appliedDiscountCode ? [appliedDiscountCode] : [];
      const prevCartId = activeCart.id;
      const prevCartVersion = activeCart.version;

      try {
        const createCartResponse = await api.createCart({
          currency,
          lineItems: prevCartLineItems,
          discountCodes: prevCartDiscountCodes,
        });
        api.deleteCart(prevCartId, prevCartVersion);

        return createCartResponse.body;
      } catch (error: unknown) {
        const mappedServerError = mapErrorMessage(error);

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

    builder.addCase(removeLineItemFromCart.pending, reducerRemoveLineItemFromCartPending);
    builder.addCase(removeLineItemFromCart.fulfilled, reducerRemoveLineItemFromCartFulfilled);
    builder.addCase(removeLineItemFromCart.rejected, reducerRemoveLineItemFromCartRejected);

    builder.addCase(changeLineItemQuantity.pending, reducerChangeLineItemQuantityPending);
    builder.addCase(changeLineItemQuantity.fulfilled, reducerChangeLineItemQuantityFulfilled);
    builder.addCase(changeLineItemQuantity.rejected, reducerChangeLineItemQuantityRejected);

    builder.addCase(clearCart.pending, reducerRemoveLineItemFromCartPending);
    builder.addCase(clearCart.fulfilled, reducerRemoveLineItemFromCartFulfilled);
    builder.addCase(clearCart.rejected, reducerRemoveLineItemFromCartRejected);

    builder.addCase(changeCartCurrency.pending, reducerChangeCartCurrencyPending);
    builder.addCase(changeCartCurrency.fulfilled, reducerChangeCartCurrencyFulfilled);
    builder.addCase(changeCartCurrency.rejected, reducerChangeCartCurrencyRejected);
  },
});

export const { clearActiveCart } = cartSlice.actions;

export default cartSlice.reducer;
