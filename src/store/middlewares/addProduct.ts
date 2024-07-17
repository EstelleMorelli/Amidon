import { createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../utils/axios';

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
  async ({ title, price, description, media }: Props) => {
    const result = await axiosInstance.post(`/product`, {
      title,
      description,
      price: Number(price),
      media,
    });
    return result.data;
  }
);

export default addProduct;
