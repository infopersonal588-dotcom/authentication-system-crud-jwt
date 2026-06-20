import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
  const authUser = localStorage.getItem('authUser');
  if (authUser) {
    try {
      const parsed = JSON.parse(authUser);
      const token = parsed?.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      // If localStorage contains invalid JSON, remove it to avoid blocking requests
      localStorage.removeItem('authUser');
    }
  }
  return config;
});

export default api;
