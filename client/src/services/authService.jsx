import api from './api.js';

const register = async (payload) => {
  const { data } = await api.post('/users/register', payload);
  return data;
};

const login = async (payload) => {
  const { data } = await api.post('/users/login', payload);
  return data;
};

const getProfile = async () => {
  const { data } = await api.get('/users/profile');
  return data;
};

const updateProfile = async (body) => {
  const { data } = await api.put('/users/profile', body);
  return data;
};

const updatePassword = async (body) => {
  const { data } = await api.put('/users/profile/password', body);
  return data;
};

const deleteAccount = async () => {
  const { data } = await api.delete('/users/profile');
  return data;
};

export default {
  register,
  login,
  getProfile,
  updateProfile,
  updatePassword,
  deleteAccount,
};
