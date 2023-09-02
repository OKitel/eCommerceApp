import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import spaApi from '../../api/Spa';
import { mapErrorMessage } from '../../api/mapError';
import {
  reducerGetMainProductTypePending,
  reducerGetMainProductTypeFulfilled,
  reducerGetMainProductTypeRejected,
} from './extraReducers';
import { TProductTypesSliceState } from './types';

const initialState: TProductTypesSliceState = {
  types: {
    main: null,
  },
  progress: false,
  errorMessage: null,
};

export const getMainProductType = createAsyncThunk('productTypes/getProductType', async (_, { rejectWithValue }) => {
  try {
    const response = await spaApi.getProductTypeByKey('main');

    return response?.body;
  } catch (error: unknown) {
    const mappedServerError = mapErrorMessage(error);
    return rejectWithValue(mappedServerError);
  }
});

const productTypesSlice = createSlice({
  name: 'productTypes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMainProductType.pending, reducerGetMainProductTypePending);
    builder.addCase(getMainProductType.fulfilled, reducerGetMainProductTypeFulfilled);
    builder.addCase(getMainProductType.rejected, reducerGetMainProductTypeRejected);
  },
});

export default productTypesSlice.reducer;
