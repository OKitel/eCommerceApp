import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import spaApi from '../../api/Spa';
import { mapErrorMessage } from '../../api/mapError';
import {
  reducerGetProductProjectionsPending,
  reducerGetProductProjectionsFulfilled,
  reducerGetProductProjectionsRejected,
} from './extraReducers';
import { TProductProjectionsSliceState } from './types';
import { ProductProjectionSearchQueryArgs } from '../../api/types';

const initialState: TProductProjectionsSliceState = {
  productProjections: null,
  progress: false,
  errorMessage: null,
};

export const searchProductProjections = createAsyncThunk(
  'productProjections/searchProductProjections',
  async (queryArgs: ProductProjectionSearchQueryArgs | undefined, { rejectWithValue }) => {
    try {
      const response = await spaApi.searchProductProjections(queryArgs);

      return response?.body.results;
    } catch (error: unknown) {
      const mappedServerError = mapErrorMessage(error);
      return rejectWithValue(mappedServerError);
    }
  },
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(searchProductProjections.pending, reducerGetProductProjectionsPending);
    builder.addCase(searchProductProjections.fulfilled, reducerGetProductProjectionsFulfilled);
    builder.addCase(searchProductProjections.rejected, reducerGetProductProjectionsRejected);
  },
});

export const {} = categoriesSlice.actions;

export default categoriesSlice.reducer;
