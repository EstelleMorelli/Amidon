// Importe un outil de Redux Toolkit qui simplifie la création des actions asynchrone
import { createAsyncThunk } from '@reduxjs/toolkit';
// À DÉCOMMENTER POUR UN USAGE EN LOCAL - COMMENTER POUR INFOMANIAK
import { removeTokenFromAxiosInstance } from '../../utils/axios';

// Notre action asynchrone qui va faire l'appel API
const logout = createAsyncThunk(
  'user/LOGOUT',

  async () => {
    // À DÉCOMMENTER POUR UN USAGE EN LOCAL - COMMENTER POUR INFOMANIAK
    removeTokenFromAxiosInstance();
  }
);

export default logout;
