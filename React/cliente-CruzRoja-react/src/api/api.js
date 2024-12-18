import axios from 'axios';
import { getAuthToken } from '../utils/auth'; // Importa la función para obtener el token

const api = axios.create({
  baseURL: 'http://192.168.209.113:8000/api/', // La URL del backend Laravel
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Interceptor para agregar el token en todas las solicitudes
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Añade el token en los encabezados
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
