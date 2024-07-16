// Importe un outil de Redux Toolkit qui simplifie la création des actions asynchrone
import { createAsyncThunk } from '@reduxjs/toolkit';

// Importe notre typage de state fait dans le store
// Importe notre instance de axios avec la base url préconfiguré
import axiosInstance from '../../utils/axios';
import { RootState } from '../store';

// Notre action asynchrone qui va faire l'appel API
const modifyUser = createAsyncThunk(
  'user/MODIFY',
  async (
    payload:
      | { firstname: string; lastname: string; description: string }
      | {
          password: string;
          newPassword: string;
        }
      | { color: string }
      | { picture: string },
    thunkAPI
  ) => {
    const state = thunkAPI.getState() as RootState;
    const { image64 } = state.appReducer;
    // Pas besoin du chemin complet car on utilise l'axiosInstance qui a déjà notre url de base
    try {
      if (image64) {
        const result = await axiosInstance.put('/profil', { image64 });
        return result.data;
      }
      const result = await axiosInstance.put('/profil', payload);
      return result.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export default modifyUser;
