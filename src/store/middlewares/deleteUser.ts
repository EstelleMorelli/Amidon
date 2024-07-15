// Importe un outil de Redux Toolkit qui simplifie la création des actions asynchrone
import { createAsyncThunk } from '@reduxjs/toolkit';

// Importe notre instance de axios avec la base url préconfiguré et les actions liées au localStorage
import { axiosInstance } from '../../utils/axios';
import { actionLogout } from '../reducers/userReducer';

// Notre action asynchrone qui va faire l'appel API
const deleteUser = createAsyncThunk(
  'user/DELETEUSER',

  async (_, thunkAPI) => {
    // Pas besoin du chemin complet car on utilise l'axiosInstance qui a déjà notre url de base
    await axiosInstance.delete(`/profil`);
    return thunkAPI.dispatch(actionLogout());
  }
);

export default deleteUser;
