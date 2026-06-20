import api from './api.js';

const createNote = async (note) => {
  const { data } = await api.post('/notes', note);
  return data;
};

const getNotes = async (params) => {
  const { data } = await api.get('/notes', { params });
  return data;
};

const getNote = async (id) => {
  const { data } = await api.get(`/notes/${id}`);
  return data;
};

const updateNote = async (id, note) => {
  const { data } = await api.put(`/notes/${id}`, note);
  return data;
};

const deleteNote = async (id) => {
  const { data } = await api.delete(`/notes/${id}`);
  return data;
};

export default {
  createNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote,
};
