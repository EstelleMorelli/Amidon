// Importe un outil de Redux Toolkit qui simplifie la création des actions asynchrone
import { createAsyncThunk } from '@reduxjs/toolkit';

// Importe notre typage de state fait dans le store
import { RootState } from '../store';
// Importe notre instance de axios avec la base url préconfiguré
import { axiosInstance } from '../../utils/axios';
import login from './login';
import { actionEmptyImage64 } from '../reducers/appReducer';

// Notre action asynchrone qui va faire l'appel API
const register = createAsyncThunk('user/REGISTER', async (_, thunkAPI) => {
  // On récupère les valeurs des champs remplis et stockés dans le state qui a été mis à jour en même temps qu'on remplit le champs (champs contrôlé) grâce à la function get.State() appliqué au paramètre thunkAPI de createAsyncThunk() de redux qui nous permet de récupèrer automatique le State
  const state = thunkAPI.getState() as RootState;
  const { email, password, firstname, lastname, picture } =
    state.userReducer.connectedUser;
  const { image64 } = state.appReducer;
  // Pas besoin du chemin complet car on utilise l'axiosInstance qui a déjà notre url de base
  try {
    console.log(image64);
    await axiosInstance.post('/register', {
      email,
      password,
      firstname,
      lastname,
      picture,
      image64,
    });
    thunkAPI.dispatch(actionEmptyImage64());
    // Si on a bien eu une response, on ne retourne pas les data mais l'action login qui elle retournera les data
    return thunkAPI.dispatch(login());
    // Si on a un échec de la requête, on force un retour qui renvoi la partie data de la réponse (où on a mis les messages d'erreurs et le champs problématique dans l'API)
  } catch (err: any) {
    // TODO : voir comment typer cette erreur
    return thunkAPI.rejectWithValue(err.response.data);
  }
});
export default register;
