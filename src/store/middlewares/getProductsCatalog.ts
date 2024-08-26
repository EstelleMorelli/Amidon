import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axios';

const getProductsCatalog = createAsyncThunk(
  'GET_PRODUCTS_CATALOG',
  async () => {
    // on fait une requete sur un endpoint privé mais normalement on est connecté donc les header contiennent le token
    const result = await axiosInstance.get('/products');
    // on a recup le tableau des produits qui forme le catalogue, on le return pour l'ajouter au payload de l'action fulfilled pour que le reducer les place dans le state
    return result.data;
  }
);

export default getProductsCatalog;
