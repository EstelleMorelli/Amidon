// VERSION LOCALE
// import axios from 'axios';

// // On crée une instance axios (comme un duplicata) avec la base url pré configuré pour ne pas la répéter à chaque fois
// export const axiosInstance = axios.create({
//   // baseURL: 'http://amidon.yoan80490-server.eddi.cloud/api/',
//   // baseURL: 'http://localhost/Spe/projet-4-aide-o-tri-back/public/api/',
//   baseURL: 'http://amidonbacknem/api',
// });

// // cette fonction ajoute le token dans les entetes de toutes les requetes qui seront lancée avec l'instance, on l'execute dès qu'on reçoit le token du back (quand on est connecté)
// export const addTokenToAxiosInstance = (token: string) => {
//   axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
// };

// // cette fonction enleve le token des entetes de toutes les requetes qui seront lancée avec l'instance, on l'execute dès qu'on se deconnecte
// export const removeTokenFromAxiosInstance = () => {
//   axiosInstance.defaults.headers.common.Authorization = ``;
// };

// export default axiosInstance;

// VERSION PROD INFOMANIAK
import axios from 'axios';

// On crée une instance axios (comme un duplicata)
// avec la base url pré-configurée pour ne pas la répéter à chaque fois
const axiosInstance = axios.create({
  baseURL: 'https://amidon.dev-me.fr/Amidon/public/api/',
// Permet d'envoyer les cookies dans les requêtes :
  withCredentials: true,
});

export default axiosInstance;
