import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import spaApi from '../../api/Spa';
import { TProductSliceState } from './types';
import { mapErrorMessage } from '../../api/mapError';
import { reducerGetProductPending, reducerGetProductFulfilled, reducerGetProductRejected } from './extraReducers';

const initialState: TProductSliceState = {
  product: null,
  progress: false,
  errorMessage: null,
};

export const getProduct = createAsyncThunk('product/getProduct', async (id: string, { rejectWithValue }) => {
  try {
    const response = await spaApi.getProduct(id);

    return response?.body;
  } catch (error: unknown) {
    const mappedServerError = mapErrorMessage(error);
    return rejectWithValue(mappedServerError);
  }
});

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProduct.pending, reducerGetProductPending);
    builder.addCase(getProduct.fulfilled, reducerGetProductFulfilled);
    builder.addCase(getProduct.rejected, reducerGetProductRejected);
  },
});

export const {} = productSlice.actions;

export default productSlice.reducer;
