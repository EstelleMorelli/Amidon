import { createAsyncThunk } from '@reduxjs/toolkit';
// Importe notre typage de state fait dans le store
import axiosInstance from '../../utils/axios';

const getFAQ = createAsyncThunk('GET_FAQ', async () => {
  // on fait une requete sur un endpoint privé mais normalement on est connecté donc les header contiennent le token
  const result = await axiosInstance.get('/faq');
  // on a recup le tableau des questions et réponses, on le return pour l'ajouter au payload de l'action fulfilled pour que le reducer les place dans le state
  return result.data;
});

export default getFAQ;
