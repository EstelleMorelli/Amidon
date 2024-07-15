import { createAction, createReducer } from '@reduxjs/toolkit';
import {
  ICurrentProduct,
  IFriendProduct,
  ISelfProduct,
} from '../../@types/product';
import getProductsCatalog from '../middlewares/getProductsCatalog';
import getProductDetail from '../middlewares/getProductDetail';
import getSelfProducts from '../middlewares/getSelfProducts';
import getFollowers from '../middlewares/getFollowers';
import updateProduct from '../middlewares/updateProduct';
import bookAProduct from '../middlewares/bookAProduct';
import deleteFollower from '../middlewares/deleteFollower';
import unfollow from '../middlewares/unfollow';
import addProduct from '../middlewares/addProduct';
import deleteProduct from '../middlewares/deleteProduct';

interface ICatalogState {
  friendProducts: IFriendProduct[];
  selfProducts: ISelfProduct[];
  currentProduct: ICurrentProduct;
  followers: IFriendProduct[];
  actionMessage: string;
}

const initialState: ICatalogState = {
  friendProducts: [],
  selfProducts: [],
  currentProduct: {
    booker: null,
    id: 0,
    title: '',
    description: '',
    price: 0,
    created_at: '',
    updated_at: null,
    media: [{ url: '' }],
    owner: {
      firstname: '',
      id: 0,
      lastname: '',
      picture: null,
    },
  },
  followers: [],
  actionMessage: '',
};

export const actionChangeProductStateInfo = createAction<{
  newValue: string;
  fieldName: 'title' | 'price' | 'description';
}>('product/CHANGE_PRODUCTINFOS');

const catalogReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getProductsCatalog.fulfilled, (state, action) => {
      state.friendProducts = action.payload;
      state.actionMessage = '';
    })
    .addCase(getProductDetail.fulfilled, (state, action) => {
      state.currentProduct = action.payload;
      state.actionMessage = '';
    })
    .addCase(getSelfProducts.fulfilled, (state, action) => {
      state.selfProducts = action.payload;
      state.actionMessage = '';
    })
    .addCase(getFollowers.fulfilled, (state, action) => {
      state.followers = action.payload;
      state.actionMessage = '';
    })
    .addCase(bookAProduct.fulfilled, (state, action) => {
      if (action.payload) {
        state.currentProduct.booker = action.payload;
        state.actionMessage = 'Vous avez bien réservé ce produit';
      } else {
        state.currentProduct.booker = null;
        state.actionMessage =
          'Vous avez bien annulé la réservation de ce produit';
      }
    })
    .addCase(updateProduct.fulfilled, (state) => {
      state.actionMessage =
        'Les informations du produit ont été modifiées avec succès';
    })
    .addCase(addProduct.fulfilled, (state, action) => {
      state.actionMessage = action.payload.message;
    })
    .addCase(actionChangeProductStateInfo, (state, action) => {
      state.currentProduct[action.payload.fieldName] = action.payload.newValue;
    })
    .addCase(deleteProduct.fulfilled, (state, action) => {
      state.actionMessage = action.payload.message;
    })
    .addCase(deleteFollower.fulfilled, () => {
      console.log('Action deleteFollower fullfilled');
    })
    .addCase(unfollow.fulfilled, () => {
      console.log('Action unfollow fullfilled');
    });
});

export default catalogReducer;
