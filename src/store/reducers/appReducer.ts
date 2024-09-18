import { createReducer, createAction } from '@reduxjs/toolkit';
import convertBase64 from '../middlewares/convertBase64';
import getFAQ from '../middlewares/getFAQ';
import getLegals from '../middlewares/getLegals';

import logout from '../middlewares/logout';

import { IQandA, ILegals } from '../../@types/app';

import register from '../middlewares/register';

interface IAppState {
  isAddFriendModalOpen: boolean;
  isWarningMessage: boolean;
  pictureZoom: {
    isPictureZoomOpen: boolean;
    currentPicture: string;
  };
  image64: string[];
  faq: IQandA[];
  legalsData: ILegals;
}

const initialState: IAppState = {
  isAddFriendModalOpen: false,
  isWarningMessage: false,
  pictureZoom: { isPictureZoomOpen: false, currentPicture: '' },
  image64: [],
  faq: [],
  legalsData: { date: '', legals: [] },
};

export const actionEmptyImage64 = createAction('app/EMPTY_IMAGE64');

export const actionToggleIsAddFriendModalOpen = createAction(
  'app/TOOGLE_ADDFRIENDMODAL'
);

export const actionToggleIsWarningMessage = createAction(
  'app/TOOGLE_WARNINGMODAL'
);

export const actionResetAppReducer = createAction('app/RESET');

export const actionOpenPictureZoom = createAction<{ currentPicture: string }>(
  'app/OPEN_PICTUREZOOM'
);
export const actionClosePictureZoom = createAction('app/CLOSE_PICTUREZOOM');

const appReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actionResetAppReducer, (state) => {
      state.faq = [];
      state.image64 = [];
      state.isAddFriendModalOpen = false;
      state.isWarningMessage = false;
    })
    .addCase(actionEmptyImage64, (state) => {
      state.image64 = [];
    })
    .addCase(register.fulfilled, (state) => {
      state.image64 = [];
    })
    .addCase(actionToggleIsAddFriendModalOpen, (state) => {
      state.isAddFriendModalOpen = !state.isAddFriendModalOpen;
    })

    .addCase(actionOpenPictureZoom, (state, action) => {
      state.pictureZoom.isPictureZoomOpen = true;
      state.pictureZoom.currentPicture = action.payload.currentPicture;
    })
    .addCase(actionClosePictureZoom, (state) => {
      state.pictureZoom.isPictureZoomOpen = false;
      state.pictureZoom.currentPicture = '';
    })

    .addCase(actionToggleIsWarningMessage, (state) => {
      state.isWarningMessage = !state.isWarningMessage;
    })
    .addCase(convertBase64.fulfilled, (state, action) => {
      state.image64.push(String(action.payload));
    })
    .addCase(convertBase64.pending, () => {
      console.log('Action convertBase64 pending');
    })
    .addCase(convertBase64.rejected, () => {
      console.log('Action convertBase64 rejected');
    })
    .addCase(getFAQ.fulfilled, (state, action) => {
      console.log('Action getFAQ fullfilled');
      state.faq = action.payload;
    })
    .addCase(getFAQ.pending, () => {
      console.log('Action getFAQ pending');
    })
    .addCase(getFAQ.rejected, () => {
      console.log('Action getFAQ rejected');
    })
    .addCase(getLegals.fulfilled, (state, action) => {
      console.log('Action getLegals fullfilled');
      state.legalsData = action.payload;
    })
    .addCase(getLegals.pending, () => {
      console.log('Action getLegals pending');
    })
    .addCase(getLegals.rejected, () => {
      console.log('Action getLegals rejected');
    })
    .addCase(logout.fulfilled, (state) => {
      state.faq = [];
      state.image64 = [];
      state.isAddFriendModalOpen = false;
      state.isWarningMessage = false;
    });
});

export default appReducer;
