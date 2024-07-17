// Importe un outil de Redux Toolkit qui simplifie la création des actions asynchrone
import { createAsyncThunk } from '@reduxjs/toolkit';

// Notre action asynchrone qui va faire l'appel API
const convertBase64 = createAsyncThunk(
  'app/CONVERT_BASE64',

  async (file: Blob) => {
    const promise = new Promise((resolve) => {
      let fileInfo;
      let baseURL: string | ArrayBuffer | null = '';
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        baseURL = reader.result;
        resolve(baseURL);
      };
      // rejectWithValue('Error, rejectedWithValue');
    });
    return promise;
  }
);

export default convertBase64;
