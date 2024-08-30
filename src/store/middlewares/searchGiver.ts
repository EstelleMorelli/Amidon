// Importe un outil de Redux Toolkit qui simplifie la création des actions asynchrone
import { createAsyncThunk } from '@reduxjs/toolkit';

// Importe notre typage de state fait dans le store
import type { RootState } from '../store';

// Importe notre instance de axios avec la base url préconfiguré et les actions liées au localStorage
import axiosInstance from '../../utils/axios';
import { actionEmptySearchedGiver } from '../reducers/userReducer';

// Notre action asynchrone qui va faire l'appel API
const searchGiver = createAsyncThunk(
  'user/SEARCH_GIVER',
  async (_, thunkAPI) => {
    // On récupère le share_code dans le state qui a été mis à jour en même temps qu'on remplit le champs (champs contrôlé) grâce à la function get.State() appliqué au paramètre thunkAPI de createAsyncThunk() de redux qui nous permet de récupèrer automatique le State
    const state = thunkAPI.getState() as RootState;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { share_code } = state.userReducer.searchedGiver;
    thunkAPI.dispatch(actionEmptySearchedGiver());
    // Pas besoin du chemin complet car on utilise l'axiosInstance qui a déjà notre url de base
    try {
      const result = await axiosInstance.get(`/user/giver/${share_code}`);

      return result.data.user;
    } catch (err: any) {
      // const result: string | string[] = err.response.data.errors;
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export default searchGiver;
