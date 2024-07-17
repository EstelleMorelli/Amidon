import { createAsyncThunk } from '@reduxjs/toolkit';

import { axiosInstance } from '../../utils/axios';

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
  async (payload: Props) => {
    await axiosInstance.put(`/product/${payload.id}`, {
      title: payload.infos.title,
      description: payload.infos.description,
      price: Number(payload.infos.price),
      media: payload.infos.media,
    });
  }
);

export default updateProduct;
