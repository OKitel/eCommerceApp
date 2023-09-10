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

export const getProductById = createAsyncThunk('product/getProductById', async (id: string, { rejectWithValue }) => {
  try {
    const response = await spaApi.getProductById(id);

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
    builder.addCase(getProductById.pending, reducerGetProductPending);
    builder.addCase(getProductById.fulfilled, reducerGetProductFulfilled);
    builder.addCase(getProductById.rejected, reducerGetProductRejected);
  },
});

export const {} = productSlice.actions;

export default productSlice.reducer;
