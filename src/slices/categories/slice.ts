import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import spaApi from '../../api/Spa';
import { TCategoriesSliceState } from './types';
import { mapErrorMessage } from '../../api/mapError';
import {
  reducerGetCategoriesPending,
  reducerGetCategoriesFulfilled,
  reducerGetCategoriesRejected,
} from './extraReducers';

const initialState: TCategoriesSliceState = {
  categories: null,
  progress: false,
  errorMessage: null,
};

export const getCategories = createAsyncThunk('categories/getCategories', async (_, { rejectWithValue }) => {
  try {
    const response = await spaApi.getCategories();

    return response?.body.results;
  } catch (error: unknown) {
    const mappedServerError = mapErrorMessage(error);
    return rejectWithValue(mappedServerError);
  }
});

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, reducerGetCategoriesPending);
    builder.addCase(getCategories.fulfilled, reducerGetCategoriesFulfilled);
    builder.addCase(getCategories.rejected, reducerGetCategoriesRejected);
  },
});

export const {} = categoriesSlice.actions;

export default categoriesSlice.reducer;
