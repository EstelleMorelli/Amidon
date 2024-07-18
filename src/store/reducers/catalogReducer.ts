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

import deleteProductPicture from '../middlewares/deleteProductPicture';

import logout from '../middlewares/logout';

interface ICatalogState {
  friendProducts: IFriendProduct[];
  selfProducts: ISelfProduct[];
  currentProduct: ICurrentProduct;
  followers: IFriendProduct[];
  actionMessage: string;
  errorMsg: string[];
  okMsg: string[];
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
  errorMsg: [],
  okMsg: [],
};

export const actionChangeProductStateInfo = createAction<{
  newValue: string;
  fieldName: 'title' | 'price' | 'description';
}>('product/CHANGE_PRODUCTINFOS');

export const actionEmptyCatalogMsg = createAction('user/EMPTY_MSG');

export const actionResetCurrentProductState = createAction(
  'catalog/RESET_CURRENT_PRODUCT'
);

const catalogReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actionResetCurrentProductState, (state) => {
      state.currentProduct.description = '';
      state.currentProduct.title = '';
      state.currentProduct.media = [{ url: '' }];
      state.currentProduct.price = 0;
    })
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
    .addCase(updateProduct.fulfilled, (state, action) => {
      state.actionMessage =
        'Les informations du produit ont été modifiées avec succès';
      console.log(action.payload);
    })
    .addCase(deleteProductPicture.fulfilled, (state) => {
      state.actionMessage = 'La photo du produit a bien été supprimée';
    })
    .addCase(addProduct.fulfilled, (state, action) => {
      state.actionMessage = action.payload.message;
      state.currentProduct.description = '';
      state.currentProduct.title = '';
      state.currentProduct.media = [{ url: '' }];
      state.currentProduct.price = 0;
    })
    .addCase(actionChangeProductStateInfo, (state, action) => {
      state.currentProduct[action.payload.fieldName] = action.payload.newValue;
    })
    .addCase(deleteProduct.fulfilled, (state, action) => {
      state.currentProduct.description = '';
      state.currentProduct.title = '';
      state.currentProduct.media = [{ url: '' }];
      state.currentProduct.price = 0;
      // state.actionMessage = action.payload.message;
    })
    .addCase(deleteFollower.fulfilled, (state) => {
      console.log('Action deleteFollower fullfilled');
      state.errorMsg = [];
      state.okMsg = [];
      state.okMsg.push(
        "Vous avez bien supprimé l'accès de cet ami à vos produits."
      );
    })
    .addCase(deleteFollower.pending, () => {
      console.log('Action deleteFollower pending');
    })
    .addCase(deleteFollower.rejected, (state, action) => {
      console.log('Action deleteFollower rejected');
      const response = action.payload;
      // On vide le msg du state au cas où ce n'est pas la 1ère fois que la requête est rejected
      state.errorMsg = [];
      state.okMsg = [];
      // Si la ou les erreurs sont bien parmi celles définies dans l'API, on rempli le tableau msg du state avec les erreurs
      // Si c'est une string (cas de l'email déjà existant), on la stock
      if (typeof response === 'string') {
        state.errorMsg.push(response);
      }
      // Sinon, si le tableau d'erreur existe, on stocke ses valeurs dans state.msg
      else if (response) {
        const responseArray = Object.values(response);
        responseArray.map((error: string) => {
          state.errorMsg.push(error);
        });
      }
      // Sinon, on rempli msg du state avec un message générique
      else {
        state.errorMsg.push(
          "Échec de la suppression de l'accès de cet amis à vos produits"
        );
      }
    })
    .addCase(unfollow.fulfilled, (state) => {
      console.log('Action unfollow fullfilled');
      state.errorMsg = [];
      state.okMsg = [];
      state.okMsg.push('Vous avez bien supprimé ce donneur.');
    })
    .addCase(unfollow.pending, () => {
      console.log('Action unfollow pending');
    })
    .addCase(unfollow.rejected, (state, action) => {
      console.log('Action unfollow rejected');
      const response = action.payload;
      // On vide le msg du state au cas où ce n'est pas la 1ère fois que la requête est rejected
      state.errorMsg = [];
      state.okMsg = [];
      // Si la ou les erreurs sont bien parmi celles définies dans l'API, on rempli le tableau msg du state avec les erreurs
      // Si c'est une string (cas de l'email déjà existant), on la stock
      if (typeof response === 'string') {
        state.errorMsg.push(response);
      }
      // Sinon, si le tableau d'erreur existe, on stocke ses valeurs dans state.msg
      else if (response) {
        const responseArray = Object.values(response);
        responseArray.map((error: string) => {
          state.errorMsg.push(error);
        });
      }
      // Sinon, on rempli msg du state avec un message générique
      else {
        state.errorMsg.push('Échec de la suppression du donneur');
      }
    })
    .addCase(logout.fulfilled, (state) => {
      state.actionMessage = '';
      state.friendProducts = [];
      state.selfProducts = [];
      state.currentProduct.booker = null;
      state.currentProduct.id = 0;
      state.currentProduct.title = '';
      state.currentProduct.description = '';
      state.currentProduct.price = '';
      state.currentProduct.created_at = '';
      state.currentProduct.updated_at = null;
      state.currentProduct.media = [{ url: '' }];
      state.currentProduct.owner.firstname = '';
      state.currentProduct.owner.lastname = '';
      state.currentProduct.owner.id = 0;
      state.currentProduct.owner.picture = null;
      state.followers = [];
    })
    .addCase(actionEmptyCatalogMsg, (state) => {
      state.errorMsg = [];
      state.okMsg = [];
    });
});

export default catalogReducer;
