// on importe la fonction fournie par Redux Toolkit qui simplifie la gestion des opérations asynchrones dans une application Redux
import { createAsyncThunk } from '@reduxjs/toolkit';
// on importe notre instance axios paramétrée
import axiosInstance from '../../utils/axios';

const getProductsCatalog = createAsyncThunk(
  'GET_PRODUCTS_CATALOG',
  async () => {
    // on fait une requete sur un endpoint privé mais on est connecté avec le JWT token dans le cookie HTTPOnly
    const result = await axiosInstance.get('/products');
    // on a recup le tableau des produits qui forme le catalogue, on le return pour l'ajouter au payload de l'action fulfilled
    //  pour que le reducer les place dans le state
    return result.data;
  }
);

export default getProductsCatalog;
