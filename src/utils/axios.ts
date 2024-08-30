import axios from 'axios';

// on créé une instance axios (comme un duplicata) avec la base url pré configuré pour ne pas la répéter à chaque fois
const axiosInstance = axios.create({
  baseURL: 'https://amidon.dev-me.fr/Amidon/public/api/',
  // Permet d'envoyer les cookies dans les requêtes :
  withCredentials: true,
});

export default axiosInstance;
