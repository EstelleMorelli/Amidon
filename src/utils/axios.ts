import axios from 'axios';

// on créé une instance axios (comme un duplicata) avec la base url pré configuré pour ne pas la répéter à chaque fois
// Version pour le back infomaniak
const axiosInstance = axios.create({
  baseURL: 'https://amidon.dev-me.fr/Amidon/public/api/',
  withCredentials: true,
});

// Version pour un back en localhost
// const axiosInstance = axios.create({
//   baseURL: 'http://localhost/Spe/projet-4-aide-o-tri-back/public/api/',
// });

export default axiosInstance;
