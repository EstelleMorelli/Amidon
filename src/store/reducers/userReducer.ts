import { createReducer, createAction } from '@reduxjs/toolkit';
import { IFriend, IUser } from '../../@types/user';
import login from '../middlewares/login';
import register from '../middlewares/register';
import searchGiver from '../middlewares/searchGiver';
import follow from '../middlewares/follow';
import modifyUser from '../middlewares/modifyUser';
import deleteUser from '../middlewares/deleteUser';

interface IUserState {
  logged: boolean;
  connectedUser: IUser;
  searchedGiver: IFriend;
  msg: null | string[];
}

export const userStateInitial: IUserState = {
  logged: false,
  connectedUser: {
    id: 0,
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    picture: null,
    description: '',
    color: '',
    share_code: '',
  },
  searchedGiver: {
    giver_id: null,
    firstname: '',
    lastname: '',
    picture: '',
    share_code: '',
    color: '',
  },
  msg: null,
};

export const actionChangeUserStateInfo = createAction<{
  newValue: string;
  fieldName:
    | 'lastname'
    | 'firstname'
    | 'email'
    | 'password'
    | 'picture'
    | 'description'
    | 'color';
}>('user/CHANGE_USERINFO');
export const actionLogout = createAction('user/LOGOUT');

export const actionRegisterNewUser = createAction<{}>('user/REGISTER');

export const actionChangeGiverStateInfo = createAction<{
  newValue: string;
  fieldName: 'lastname' | 'firstname' | 'picture' | 'share_code' | 'color';
}>('user/CHANGE_GIVERINFO');
export const emptySearchedGiver = createAction('user/EMPTY_GIVERINFO');
export const actionToggleIsCatalogUpdateNeeded = createAction(
  'app/TOOGLE_CATALOGUPDATENEEDED'
);

const userReducer = createReducer(userStateInitial, (builder) => {
  builder
    .addCase(actionChangeUserStateInfo, (state, action) => {
      state.connectedUser[action.payload.fieldName] = action.payload.newValue;
      // TODO : réfléchir au fait que le mot de passe est visible dans le state Redux
    })

    .addCase(login.fulfilled, (state, action) => {
      state.connectedUser.id = action.payload.id;
      state.connectedUser.firstname = action.payload.firstname;
      state.connectedUser.lastname = action.payload.lastname;
      state.connectedUser.description = action.payload.description;
      state.connectedUser.color = action.payload.color;
      state.connectedUser.share_code = action.payload.share_code;
      state.connectedUser.picture = action.payload.picture;
      state.connectedUser.password = '';
      state.logged = true;
      state.msg = null;
      console.log('Action login fullfilled');
    })
    .addCase(login.pending, () => {
      console.log('Action login pending');
    })
    .addCase(login.rejected, () => {
      console.log('Action login rejected');
      // On vide le msg du state au cas où ce n'est pas la 1ère fois que la requête est rejected
      /* state.msg = [];
      if (action.payload) {
        action.payload.errors.map((error: any) => {
          state.msg?.push(error);
        });
      }
      // Sinon, on rempli msg du state avec un message générique
      else {
        state.msg.push('Échec de la connexion');
        */
    })
    .addCase(register.fulfilled, (state) => {
      state.msg = null;
      console.log('Action register fullfilled');
    })
    .addCase(register.pending, () => {
      console.log('Action register pending');
    })
    .addCase(register.rejected, (state, action) => {
      console.log('Action register rejected');
      /* 
      // console.log(action.payload);
      // On vide le msg du state au cas où ce n'est pas la 1ère fois que la requête est rejected
      state.msg = [];
      // Si la ou les erreurs sont bien parmi celles définies dans l'API, on rempli le tableau msg du state avec les erreurs
      // TODO : voir comment typer l'action.payload
      console.log(action.payload);
      if (action.payload) {
        action.payload.errors.map((error: any) => {
          state.msg?.push(error);
        });
      }
      // Sinon, on rempli msg du state avec un message générique
      else {
        state.msg.push('Échec de la création du compte');
      } */
    })
    .addCase(actionLogout, (state) => {
      state.connectedUser.id = 0;
      state.connectedUser.email = '';
      state.connectedUser.password = '';
      state.connectedUser.firstname = '';
      state.connectedUser.lastname = '';
      state.connectedUser.picture = '';
      state.connectedUser.description = '';
      state.connectedUser.color = '';
      state.connectedUser.share_code = '';
      state.logged = false;
    })

    .addCase(actionChangeGiverStateInfo, (state, action) => {
      state.searchedGiver[action.payload.fieldName] = action.payload.newValue;
    })
    .addCase(searchGiver.fulfilled, (state, action) => {
      state.searchedGiver.giver_id = action.payload.id;
      state.searchedGiver.firstname = action.payload.firstname;
      state.searchedGiver.lastname = action.payload.lastname;
      state.searchedGiver.picture = action.payload.picture;
      state.msg = null;
      console.log('Action searchedGiver fullfilled');
    })
    .addCase(searchGiver.pending, () => {
      console.log('Action searchedGiver pending');
    })
    .addCase(searchGiver.rejected, (state, action) => {
      console.log('Action searchedGiver rejected');
      state.msg = [];
      if (action.error.message) {
        state.msg.push('Échec de la recherche de donneur.');
      }
    })
    .addCase(follow.fulfilled, (state) => {
      state.searchedGiver.giver_id = null;
      state.searchedGiver.firstname = '';
      state.searchedGiver.lastname = '';
      state.searchedGiver.picture = '';
      state.searchedGiver.share_code = '';
      state.msg = null;
      console.log('Action follow fullfilled');
    })
    .addCase(follow.pending, () => {
      console.log('Action follow pending');
    })
    .addCase(follow.rejected, (state, action) => {
      console.log('Action follow rejected');
      state.msg = [];
      if (action.error.message) {
        state.msg.push("Échec de l'ajout du donneur.");
      }
    })
    .addCase(emptySearchedGiver, (state) => {
      state.searchedGiver.giver_id = null;
      state.searchedGiver.firstname = '';
      state.searchedGiver.lastname = '';
      state.searchedGiver.picture = '';
    })
    .addCase(modifyUser.fulfilled, (state, action) => {
      console.log('Action modifyUser fullfilled');
      state.msg = null;
      state.connectedUser.picture = action.payload.picture;
      state.connectedUser.password = '';
    })
    .addCase(modifyUser.pending, () => {
      console.log('Action modifyUser pending');
    })
    .addCase(modifyUser.rejected, () => {
      console.log('Action modifyUser rejected');
    });
  /* .addCase(deleteUser.fulfilled, () => {
      console.log('Action deleteUser fullfilled');
    })
    .addCase(deleteUser.pending, () => {
      console.log('Action deleteUser pending');
    })
    .addCase(deleteUser.rejected, () => {
      console.log('Action deleteUser rejected');
    }) */
});

export default userReducer;
