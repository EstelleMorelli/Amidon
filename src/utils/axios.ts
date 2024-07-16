import axios from 'axios';

// on créé une instance axios (comme un duplicata) avec la base url pré configuré pour ne pas la répéter à chaque fois
const axiosInstance = axios.create({
  baseURL: 'https://amidon.dev-me.fr/Back/public/api/',
// ??
  withCredentials: true,
});

export default axiosInstance;
