// src/features/auth/authAPI.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/auth';

export const loginAPI = async (credentials) => {
  const res = await axios.post(`${API_URL}/login`, credentials);
  return res.data;
};

export const registerAPI = async (userData) => {
  const res = await axios.post(`${API_URL}/register`, userData);
  return res.data;
};
