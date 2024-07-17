import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../utils/axios';
// Importe notre typage de state fait dans le store
import type { RootState } from '../store';

interface Props {
  id: number;
  bookerId: number | null;
}
const bookAProduct = createAsyncThunk(
  'catalog/BOOK_PRODUCT',
  // eslint-disable-next-line @typescript-eslint/ban-types
  async (payload: Props, thunkAPI) => {
    // const bookerId = state.userReducer.connectedUser.id;
    const bookerData = payload.bookerId ? { id: payload.bookerId } : null;
    // on fait une requete sur un endpoint privé mais normalement on est connecté donc les header contiennent le token
    await axiosInstance.put(`/product/${payload.id}`, {
      booker: bookerData,
    });
    // on a recup le tableau des produits qui forme le catalogue, on le return pour l'ajouter au payload de l'action fulfilled pour que le reducer les place dans le state
    const state = thunkAPI.getState() as RootState;
    // par défaut, le booker est à null
    let bookerUser = null;
    // mais si on a renseigné un bookerId à l'appel de l'action alors on construit un objet booker de type identique à ce qui sera placé en BDD.
    if (payload.bookerId) {
      bookerUser = {
        id: state.userReducer.connectedUser.id,
        firstname: state.userReducer.connectedUser.firstname,
        lastname: state.userReducer.connectedUser.lastname,
        color: state.userReducer.connectedUser.color,
        picture: state.userReducer.connectedUser.picture,
      };
    }
    return bookerUser;
  }
);

export default bookAProduct;
