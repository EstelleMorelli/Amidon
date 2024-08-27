import axios from 'axios';

// VERSION DEVELOP LOCALE

// On créé une instance axios (comme un duplicata) avec la base url pré configuré pour ne pas la répéter à chaque fois
export const axiosInstance = axios.create({
  baseURL: 'http://localhost/Spe/projet-4-aide-o-tri-back/public/api/',
  // baseURL: 'http://amidon.yoan80490-server.eddi.cloud/api/',
});

// cette fonction ajoute le token dans les entetes de toutes les requetes qui seront lancée avec l'instance, on l'execute dès qu'on reçoit le token du back (quand on est connecté)
export const addTokenToAxiosInstance = (token: string) => {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// cette fonction enleve le token des entetes de toutes les requetes qui seront lancée avec l'instance, on l'execute dès qu'on se deconnecte
export const removeTokenFromAxiosInstance = () => {
  axiosInstance.defaults.headers.common.Authorization = ``;
};

export default axiosInstance;

// VERSION PROD INFOMANIAK

// on créé une instance axios (comme un duplicata) avec la base url pré configuré pour ne pas la répéter à chaque fois
// const axiosInstance = axios.create({
//   baseURL: 'https://amidon.dev-me.fr/Amidon/public/api/',
//   withCredentials: true,
// });

// export default axiosInstance;
