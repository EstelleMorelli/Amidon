import { createReducer, createAction } from '@reduxjs/toolkit';
import { IFriend, IUser } from '../../@types/user';
import login from '../middlewares/login';
import logout from '../middlewares/logout';
import register from '../middlewares/register';
import searchGiver from '../middlewares/searchGiver';
import follow from '../middlewares/follow';
import modifyUser from '../middlewares/modifyUser';
import deleteUser from '../middlewares/deleteUser';

interface IUserState {
  logged: boolean;
  connectedUser: IUser;
  searchedGiver: IFriend;
  errorMsg: string[];
  okMsg: string[];
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
  errorMsg: [],
  okMsg: [],
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

export const actionRegisterNewUser = createAction<{}>('user/REGISTER');

export const actionChangeGiverStateInfo = createAction<{
  newValue: string;
  fieldName: 'lastname' | 'firstname' | 'picture' | 'share_code' | 'color';
}>('user/CHANGE_GIVERINFO');

export const actionEmptySearchedGiver = createAction('user/EMPTY_GIVERINFO');

export const actionEmptyUserMsg = createAction('user/EMPTY_MSG');

export const actionToggleIsCatalogUpdateNeeded = createAction(
  'app/TOOGLE_CATALOGUPDATENEEDED'
);

export const actionResetGiverInfo = createAction('user/RESET_GIVER');

const userReducer = createReducer(userStateInitial, (builder) => {
  builder
    .addCase(actionChangeUserStateInfo, (state, action) => {
      state.connectedUser[action.payload.fieldName] = action.payload.newValue;
      // TODO : réfléchir au fait que le mot de passe est visible dans le state Redux
    })
    .addCase(login.fulfilled, (state, action) => {
      console.log('Action login fullfilled');
      state.connectedUser.id = action.payload.id;
      state.connectedUser.firstname = action.payload.firstname;
      state.connectedUser.lastname = action.payload.lastname;
      state.connectedUser.description = action.payload.description;
      state.connectedUser.color = action.payload.color;
      state.connectedUser.share_code = action.payload.share_code;
      state.connectedUser.picture = action.payload.picture;
      state.connectedUser.password = '';
      state.logged = true;
      state.errorMsg = [];
      state.okMsg = [];
    })
    .addCase(login.pending, () => {
      console.log('Action login pending');
    })
    .addCase(login.rejected, (state, action) => {
      console.log('Action login rejected');
      const response = action.payload;
      // On vide les msg du state au cas où ce n'est pas la 1ère fois que la requête est rejected
      state.errorMsg = [];
      state.okMsg = [];
      // Si la ou les erreurs sont bien parmi celles définies dans l'API, on rempli le tableau msg du state avec les erreurs
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
        state.errorMsg.push('Échec de la connexion.');
      }
    })
    .addCase(register.fulfilled, (state) => {
      state.errorMsg = [];
      state.okMsg = [];
      console.log('Action register fullfilled');
    })
    .addCase(register.pending, () => {
      console.log('Action register pending');
    })
    .addCase(register.rejected, (state, action) => {
      console.log('Action register rejected');
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
        state.errorMsg.push('Échec de la création du compte.');
      }
    })
    .addCase(logout.fulfilled, (state) => {
      state.logged = false;
      state.connectedUser.id = 0;
      state.connectedUser.email = '';
      state.connectedUser.password = '';
      state.connectedUser.firstname = '';
      state.connectedUser.lastname = '';
      state.connectedUser.picture = '';
      state.connectedUser.description = '';
      state.connectedUser.color = '';
      state.connectedUser.share_code = '';
      state.searchedGiver.giver_id = null;
      state.searchedGiver.firstname = '';
      state.searchedGiver.lastname = '';
      state.searchedGiver.picture = '';
      state.searchedGiver.share_code = '';
      state.searchedGiver.color = '';
      state.errorMsg = [];
      state.okMsg = [];
    })
    .addCase(actionChangeGiverStateInfo, (state, action) => {
      state.searchedGiver[action.payload.fieldName] = action.payload.newValue;
    })
    .addCase(actionResetGiverInfo, (state) => {
      state.searchedGiver.color = '';
      state.searchedGiver.firstname = '';
      state.searchedGiver.giver_id = 0;
      state.searchedGiver.lastname = '';
      state.searchedGiver.picture = '';
      state.searchedGiver.share_code = '';
    })
    .addCase(searchGiver.fulfilled, (state, action) => {
      console.log('Action searchedGiver fullfilled');
      state.searchedGiver.giver_id = action.payload.id;
      state.searchedGiver.firstname = action.payload.firstname;
      state.searchedGiver.lastname = action.payload.lastname;
      state.searchedGiver.picture = action.payload.picture;
      state.errorMsg = [];
      state.okMsg = [];
    })
    .addCase(searchGiver.pending, () => {
      console.log('Action searchedGiver pending');
    })
    .addCase(searchGiver.rejected, (state, action) => {
      console.log('Action searchedGiver rejected');
      const response = action.payload;
      // On vide le msg du state au cas où ce n'est pas la 1ère fois que la requête est rejected
      state.errorMsg = [];
      state.okMsg = [];
      // Si la ou les erreurs sont bien parmi celles définies dans l'API, on rempli le tableau msg du state avec les erreurs
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
        state.errorMsg.push('Échec de la recherche de donneur.');
      }
    })
    .addCase(follow.fulfilled, (state) => {
      console.log('Action follow fullfilled');
      state.errorMsg = [];
      state.okMsg = [];
      state.searchedGiver.giver_id = null;
      state.searchedGiver.firstname = '';
      state.searchedGiver.lastname = '';
      state.searchedGiver.picture = '';
      state.searchedGiver.share_code = '';
      state.okMsg.push('Vous avez bien ajouté ce donneur.');
    })
    .addCase(follow.pending, () => {
      console.log('Action follow pending');
    })
    .addCase(follow.rejected, (state, action) => {
      console.log('Action follow rejected');
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
        state.errorMsg.push("Échec de l'ajout du donneur");
      }
    })
    .addCase(actionEmptySearchedGiver, (state) => {
      state.searchedGiver.giver_id = null;
      state.searchedGiver.firstname = '';
      state.searchedGiver.lastname = '';
      state.searchedGiver.picture = '';
    })
    .addCase(modifyUser.fulfilled, (state, action) => {
      console.log('Action modifyUser fullfilled');
      state.errorMsg = [];
      state.okMsg = [];
      state.connectedUser.picture = action.payload.picture;
      state.connectedUser.password = '';
      state.okMsg.push('Profil bien mis à jour.');
    })
    .addCase(modifyUser.pending, () => {
      console.log('Action modifyUser pending');
    })
    .addCase(modifyUser.rejected, (state, action) => {
      console.log('Action modifyUser rejected');
      state.connectedUser.password = '';
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
        state.errorMsg.push('Échec de la modification du profil.');
      }
    })
    .addCase(deleteUser.fulfilled, (state) => {
      console.log('Action deleteUser fullfilled');
      state.errorMsg = [];
      state.okMsg = [];
    })
    .addCase(deleteUser.pending, () => {
      console.log('Action deleteUser pending');
    })
    .addCase(deleteUser.rejected, (state, action) => {
      console.log('Action deleteUser rejected');
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
        state.errorMsg.push('Échec de la suppression du compte.');
      }
    })
    .addCase(actionEmptyUserMsg, (state) => {
      state.errorMsg = [];
      state.okMsg = [];
    });
});

export default userReducer;
