import { createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../utils/axios';
import getProductDetail from './getProductDetail';

interface Props {
  id: number;
  infos: {
    title: string;
    price: string;
    description: string;
    media: {
      image64: string;
    }[];
  };
}
const updateProduct = createAsyncThunk(
  'catalog/UPDATE_PRODUCT',
  // eslint-disable-next-line @typescript-eslint/ban-types
  async (payload: Props, thunkAPI) => {
    try {
      await axiosInstance.put(`/product/${payload.id}`, {
        title: payload.infos.title,
        description: payload.infos.description,
        price: Number(payload.infos.price),
        media: payload.infos.media,
      });
      return await thunkAPI.dispatch(getProductDetail(payload.id));
    } catch (err: any) {
      const result: string | string[] = err.response.data.errors;
      return thunkAPI.rejectWithValue(result);
    }
  }
);

export default updateProduct;
