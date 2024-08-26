// Importe un outil de Redux Toolkit qui simplifie la création des actions asynchrone
import { createAsyncThunk } from '@reduxjs/toolkit';

// Importe notre typage de state fait dans le store
import type { RootState } from '../store';

// Notre action asynchrone qui va faire l'appel API
const logout = createAsyncThunk('user/LOGOUT', async () => {});

export default logout;
