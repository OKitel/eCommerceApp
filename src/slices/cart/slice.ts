import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import spaApi from '../../api/Spa';
import anonymousApi from '../../api/Anonymous';
import serviceApi from '../../api/Service';
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
  reducerRemoveLineItemFromCartPending,
  reducerRemoveLineItemFromCartFulfilled,
  reducerRemoveLineItemFromCartRejected,
  reducerChangeLineItemQuantityPending,
  reducerChangeLineItemQuantityFulfilled,
  reducerChangeLineItemQuantityRejected,
  reducerChangeCartCurrencyPending,
  reducerChangeCartCurrencyFulfilled,
  reducerChangeCartCurrencyRejected,
  reducerAddDiscountCodePending,
  reducerAddDiscountCodeFulfilled,
  reducerAddDiscountCodeRejected,
  reducerRemoveDiscountCodePending,
  reducerRemoveDiscountCodeFulfilled,
  reducerRemoveDiscountCodeRejected,
  reducerGetAppliedDiscountCodePending,
  reducerGetAppliedDiscountCodeFulfilled,
  reducerGetAppliedDiscountCodeRejected,
} from './extraReducers';
import { Currencies } from '../../types';
import {
  TAddDiscountCodeRequest,
  TAddLineItemRequest,
  TCartSliceState,
  TChangeLineItemQuantity,
  TCommonCartRequest,
  TRemoveLineItemRequest,
} from './types';
import {
  MyCartAddDiscountCodeAction,
  MyCartAddLineItemAction,
  MyCartChangeLineItemQuantityAction,
  MyCartRemoveDiscountCodeAction,
  MyCartRemoveLineItemAction,
} from '@commercetools/platform-sdk';

const initialState: TCartSliceState = {
  activeCart: null,
  discountCode: null,
  errorMessage: null,
  progress: {
    getActiveCart: false,
    addingLineItem: null,
    modifyingCart: false,
    getDiscountCode: false,
    setDiscountCode: false,
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
  async (clearCartRequest: TCommonCartRequest, { getState, rejectWithValue }) => {
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
      const prevCartId = activeCart.id;
      const prevCartVersion = activeCart.version;

      try {
        const createCartResponse = await api.createCart({
          currency,
          lineItems: prevCartLineItems,
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

export const addDiscountCode = createAsyncThunk(
  'cart/addDiscountCode',
  async (applyDiscountCodeRequest: TAddDiscountCodeRequest, { getState, rejectWithValue }) => {
    const api = chooseApiWithToken();
    const {
      cart: { activeCart },
    } = getState() as RootState;

    if (api && activeCart) {
      const { code, onSuccess, onError } = applyDiscountCodeRequest;
      const actionAddDiscountCode: MyCartAddDiscountCodeAction = { action: 'addDiscountCode', code };

      try {
        const response = await api.updateCart(activeCart.id, activeCart.version, [actionAddDiscountCode]);
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

export const removeDiscountCode = createAsyncThunk(
  'cart/removeDiscountCode',
  async (removeDiscountCodeRequest: TCommonCartRequest, { getState, rejectWithValue }) => {
    const api = chooseApiWithToken();
    const {
      cart: { activeCart },
    } = getState() as RootState;

    if (api && activeCart && activeCart.discountCodes.length) {
      const { onSuccess, onError } = removeDiscountCodeRequest;
      const appliedDiscountCodeId = activeCart.discountCodes[0].discountCode.id;
      const actionRemoveDiscountCode: MyCartRemoveDiscountCodeAction = {
        action: 'removeDiscountCode',
        discountCode: { typeId: 'discount-code', id: appliedDiscountCodeId },
      };

      try {
        const response = await api.updateCart(activeCart.id, activeCart.version, [actionRemoveDiscountCode]);
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

export const getAppliedDiscountCode = createAsyncThunk(
  'cart/getAppliedDiscountCode',
  async (_, { getState, rejectWithValue }) => {
    const {
      cart: { activeCart },
    } = getState() as RootState;

    if (activeCart && !!activeCart.discountCodes.length) {
      const discountCodeId = activeCart.discountCodes[0].discountCode.id;
      try {
        const response = await serviceApi.getDiscountCodeById(discountCodeId);

        return response.body;
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

    builder.addCase(addDiscountCode.pending, reducerAddDiscountCodePending);
    builder.addCase(addDiscountCode.fulfilled, reducerAddDiscountCodeFulfilled);
    builder.addCase(addDiscountCode.rejected, reducerAddDiscountCodeRejected);

    builder.addCase(removeDiscountCode.pending, reducerRemoveDiscountCodePending);
    builder.addCase(removeDiscountCode.fulfilled, reducerRemoveDiscountCodeFulfilled);
    builder.addCase(removeDiscountCode.rejected, reducerRemoveDiscountCodeRejected);

    builder.addCase(getAppliedDiscountCode.pending, reducerGetAppliedDiscountCodePending);
    builder.addCase(getAppliedDiscountCode.fulfilled, reducerGetAppliedDiscountCodeFulfilled);
    builder.addCase(getAppliedDiscountCode.rejected, reducerGetAppliedDiscountCodeRejected);
  },
});

export const { clearActiveCart } = cartSlice.actions;

export default cartSlice.reducer;
