import { createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../utils/axios';

const deleteProduct = createAsyncThunk(
  'catalog/DELETE_PRODUCT',
  async (id: number, thunkAPI) => {
    try {
      const result = await axiosInstance.delete(`/product/${id}`);
      return result.data.message;
    } catch (err: any) {
      const result: string | string[] = err.response.data.errors;
      return await thunkAPI.rejectWithValue(result);
    }
  }
);

export default deleteProduct;
