import { createAsyncThunk } from '@reduxjs/toolkit';

import { axiosInstance } from '../../utils/axios';

interface Props {
  id: number;
  url: string;
}
const deleteProductPicture = createAsyncThunk(
  'catalog/DELETE_PRODUCT_PICTURE',
  // eslint-disable-next-line @typescript-eslint/ban-types
  async (payload: Props) => {
    await axiosInstance.put(`/product/${payload.id}`, {
      url: payload.url,
    });
  }
);

export default deleteProductPicture;
