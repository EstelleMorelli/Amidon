// Importe un outil de Redux Toolkit qui simplifie la création des actions asynchrone
import { createAsyncThunk } from '@reduxjs/toolkit';

// Importe notre typage de state fait dans le store
import type { RootState } from '../store';
import axiosInstance from '../../utils/axios';

// Notre action asynchrone qui va faire l'appel API
const login = createAsyncThunk(
  'user/LOGIN',

  async (_, thunkAPI) => {
    // On récupère l'email et le mot de passe dans le state qui a été mis à jour en même temps qu'on remplit le champs (champs contrôlé) grâce à la function get.State() appliqué au paramètre thunkAPI de createAsyncThunk() de redux qui nous permet de récupèrer automatique le State
    const state = thunkAPI.getState() as RootState;
    const { email, password } = state.userReducer.connectedUser;
    // Pas besoin du chemin complet car on utilise l'axiosInstance qui a déjà notre url de base
    try {
      const result = await axiosInstance.post('/login', {
        email,
        password,
      });
      // Appel notre fonction qui met le token dans l'instance Axios pour le renvoyer à chaque requête dans l'entête

      const result2 = await axiosInstance.post('/login_check', {
        email,
        password,
      });

      return result.data.user;
    } catch (err: any) {
      // ! TODO : voir comment typer cette erreur
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export default login;