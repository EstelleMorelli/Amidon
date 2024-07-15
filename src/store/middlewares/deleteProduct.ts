import { createAsyncThunk } from '@reduxjs/toolkit';

import { axiosInstance } from '../../utils/axios';

const deleteProduct = createAsyncThunk(
  'catalog/DELETE_PRODUCT',
  async (id: number) => {
    const result = await axiosInstance.delete(`/product/${id}`);
    return result.data.message;
  }
);

export default deleteProduct;
