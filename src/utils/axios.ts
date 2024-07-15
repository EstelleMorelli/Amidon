import axios from 'axios';

// on créé une instance axios (comme un duplicata) avec la base url pré configuré pour ne pas la répéter à chaque fois
const axiosInstance = axios.create({
  // baseURL: 'http://localhost/Spe/projet-4-aide-o-tri-back/public/api/',
  withCredentials: true,
});

export default axiosInstance;
