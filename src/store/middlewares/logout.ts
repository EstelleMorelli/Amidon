// Importe un outil de Redux Toolkit qui simplifie la création des actions asynchrone
import { createAsyncThunk } from '@reduxjs/toolkit';

// À décommenter pour usage en local
// Importe notre instance de axios avec la base url préconfiguré et les actions liées au localStorage
// import { removeTokenFromAxiosInstance } from '../../utils/axios';

// Notre action asynchrone qui va faire l'appel API
const logout = createAsyncThunk(
  'user/LOGOUT',

  async () => {
    // À décommenter pour usage en local
    //   removeTokenFromAxiosInstance();
  }
);

export default logout;
