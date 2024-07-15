import { createReducer, createAction } from '@reduxjs/toolkit';
import convertBase64 from '../middlewares/convertBase64';
import getFAQ from '../middlewares/getFAQ';

import { IQandA } from '../../@types/app';

interface IAppState {
  isAddFriendModalOpen: boolean;
  image64: string[];
  faq: IQandA[];
}

const initialState: IAppState = {
  isAddFriendModalOpen: false,
  image64: [],
  faq: [],
};

export const actionToggleIsAddFriendModalOpen = createAction(
  'app/TOOGLE_ADDFRIENDMODALOPEN'
);
export const actionResetAppReducer = createAction('app/RESET');

const appReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actionResetAppReducer, (state) => {
      state.faq = [];
      state.image64 = [];
      state.isAddFriendModalOpen = false;
    })
    .addCase(actionToggleIsAddFriendModalOpen, (state) => {
      state.isAddFriendModalOpen = !state.isAddFriendModalOpen;
    })
    .addCase(convertBase64.fulfilled, (state, action) => {
      state.image64.push(String(action.payload));
    })
    .addCase(convertBase64.pending, (state, action) => {
      console.log('Action convertBase64 pending');
    })
    .addCase(convertBase64.rejected, (state, action) => {
      console.log('Action convertBase64 rejected');
    })
    .addCase(getFAQ.fulfilled, (state, action) => {
      console.log('Action getFAQ fullfilled');
      state.faq = action.payload;
    })
    .addCase(getFAQ.pending, (state, action) => {
      console.log('Action getFAQ pending');
    })
    .addCase(getFAQ.rejected, (state, action) => {
      console.log('Action getFAQ rejected');
    });
});

export default appReducer;
