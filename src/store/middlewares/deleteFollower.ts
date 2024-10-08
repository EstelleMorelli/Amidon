// Importe un outil de Redux Toolkit qui simplifie la création des actions asynchrone
import { createAsyncThunk } from '@reduxjs/toolkit';

// Importe notre instance de axios avec la base url préconfiguré et les actions liées au localStorage
import axiosInstance from '../../utils/axios';
import getFollowers from './getFollowers';
import getSelfProducts from './getSelfProducts';

// Notre action asynchrone qui va faire l'appel API
const deleteFollower = createAsyncThunk(
  'user/DELETEFOLLOW',

  async (follower_id: number, thunkAPI) => {
    try {
      // Pas besoin du chemin complet car on utilise l'axiosInstance qui a déjà notre url de base
      await axiosInstance.delete(`/user/follower`, {
        data: { follower_id },
      });
      // const actions = () => {

      // }
      return (
        await thunkAPI.dispatch(getFollowers()),
        await thunkAPI.dispatch(getSelfProducts())
      );
    } catch (err: any) {
      const result: string | string[] = err.response.data.errors;
      return thunkAPI.rejectWithValue(result);
    }
  }
);

export default deleteFollower;
