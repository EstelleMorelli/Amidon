// Importe un outil de Redux Toolkit qui simplifie la création des actions asynchrone
import { createAsyncThunk } from '@reduxjs/toolkit';

// Importe notre typage de state fait dans le store
import type { RootState } from '../store';

// Importe notre instance de axios avec la base url préconfiguré et les actions liées au localStorage
import { removeTokenFromAxiosInstance } from '../../utils/axios';
import { removeInfosFromStorage } from '../../utils/localStorage';

// Notre action asynchrone qui va faire l'appel API
const logout = createAsyncThunk(
  'user/LOGOUT',

  async () => {
    removeTokenFromAxiosInstance();
    removeInfosFromStorage();
  }
);

export default logout;
