// Importe un outil de Redux Toolkit qui simplifie la création des actions asynchrone
import { createAsyncThunk } from '@reduxjs/toolkit';

// Importe notre instance de axios avec la base url préconfiguré et les actions liées au localStorage
import { axiosInstance } from '../../utils/axios';
import getProductsCatalog from './getProductsCatalog';

// Notre action asynchrone qui va faire l'appel API
const unfollow = createAsyncThunk(
  'user/UNFOLLOW',

  async (giver_id: number, thunkAPI) => {
    await axiosInstance.delete(`/user/giver`, {
      data: { giver_id },
    });
    return thunkAPI.dispatch(getProductsCatalog());
  }
);

export default unfollow;
