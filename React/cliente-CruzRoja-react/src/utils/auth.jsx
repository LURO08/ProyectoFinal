import api from '../api/api';  // Importa la configuración de API

export const loginUser = async (email, password) => {
  try {
    const response = await api.post('login', { email, password }); // Usamos el endpoint de login en Laravel
    localStorage.setItem('token', response.data.token); // Guarda el token en localStorage
    return response.data.token;
  } catch (error) {
    console.error('Login failed:', error);
    throw new Error('Login failed');
  }
};

export const logoutUser = () => {
  localStorage.removeItem('token'); // Elimina el token al hacer logout
};

export const getAuthToken = () => {
  return localStorage.getItem('token');
};

export const isAuthenticated = () => {
  return !!getAuthToken(); // Devuelve true si hay un token
};
