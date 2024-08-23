import { createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../utils/axios';
import getProductDetail from './getProductDetail';

interface Props {
  id: number;
  url: string;
}
const deleteProductPicture = createAsyncThunk(
  'catalog/DELETE_PRODUCT_PICTURE',
  // eslint-disable-next-line @typescript-eslint/ban-types
  async (payload: Props, thunkAPI) => {
    try {
      await axiosInstance.put(`/product/${payload.id}`, {
        url: payload.url,
      });
      return await thunkAPI.dispatch(getProductDetail(payload.id));
    } catch (err: any) {
      const result: string | string[] = err.response.data.errors;
      return thunkAPI.rejectWithValue(result);
    }
  }
);

export default deleteProductPicture;
