import { createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../utils/axios';
import getSelfProducts from './getSelfProducts';

interface Props {
  title: string;
  price: string;
  description: string;
  media: {
    image64: string;
  }[];
}
const addProduct = createAsyncThunk(
  'catalog/ADD_PRODUCT',
  // eslint-disable-next-line @typescript-eslint/ban-types
  async ({ title, price, description, media }: Props, thunkAPI) => {
    try {
      const result = await axiosInstance.post(`/product`, {
        title,
        description,
        price: Number(price),
        media,
      });
      return await thunkAPI.dispatch(getSelfProducts());
    } catch (err: any) {
      // const result: string | string[] = err.response.data.errors;
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export default addProduct;
