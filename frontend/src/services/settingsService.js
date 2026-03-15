// import axios from 'axios';

// const API_URL = `${import.meta.env.VITE_API_URL}/settings`;

// const settingsApi = axios.create({
//   baseURL: API_URL,
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });

// settingsApi.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// const settingsService = {

//   getUserSettings: async () => {
//     const response = await settingsApi.get('/user');
//     return response.data;
//   },

//   updateUserSettings: async (settings) => {
//     const response = await settingsApi.put('/user', settings);
//     return response.data;
//   },

//   getSystemSettings: async () => {
//     const response = await settingsApi.get('/system');
//     return response.data;
//   },

//   updateSystemSettings: async (settings) => {
//     const response = await settingsApi.put('/system', settings);
//     return response.data;
//   }
// };

// export default settingsService;

import axios from "axios";

const API = "http://localhost:8000/api/settings";

const getSystemSettings = async (token) => {
  const res = await axios.get(`${API}/system`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

const updateSystemSettings = async (data, token) => {
  const res = await axios.put(`${API}/system`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export default {
  getSystemSettings,
  updateSystemSettings,
};