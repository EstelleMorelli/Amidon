// Importe un outil de Redux Toolkit qui simplifie la création des actions asynchrone
import { createAsyncThunk } from '@reduxjs/toolkit';

// Notre action asynchrone qui va traiter le fichier pour renvoyer la photo en base64
const convertBase64 = createAsyncThunk(
  'app/CONVERT_BASE64',

  async (file: Blob, thunkAPI) => {
    const promise = new Promise((resolve) => {
      // let fileInfo;
      // On prépare la variable pour récupérer la baseURL
      let baseURL: string | ArrayBuffer | null = '';
      // On instancie l'objet API web FileReader qui permet à JS de lire un fichier
      let reader = new FileReader();

      // On utilise la méthode readAsDataURL de FileReader pour démarer la lecture du file qui a été donné en argument de ce middleware. Cette méthode renverra une URL de données qui représente les données du fichier (le fichier en texte base64)
      reader.readAsDataURL(file);

      // On utilise le gestionnaire d'événement onload de FileReader qui est déclenché quand une opération de lecture est menée à bien (ici notre reader.readAsDataURL(file))
      reader.onload = () => {
        // Quand cette lecture est faite, on récupère le résultat de l'opération de lecture (readAsDataURL) au format défini par cette opération de lecture (donc l'URL de données = le texte en base64)
        baseURL = reader.result;
        // On utilise la méthode resolve de Promise pour récupèrer la valeur de baseURL dans notre promise de départ
        resolve(baseURL);
      };
    });
    return promise;
  }
);

export default convertBase64;
