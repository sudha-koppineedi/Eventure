// // import axios from 'axios';

// // const API_URL = `${import.meta.env.VITE_API_URL}/auth/admin`;

// // const adminApi = axios.create({
// //   baseURL: API_URL,
// //   headers: {
// //     'Content-Type': 'application/json'
// //   }
// // });

// // adminApi.interceptors.request.use((config) => {
// //   const token = localStorage.getItem('token');
// //   if (token) {
// //     config.headers.Authorization = `Bearer ${token}`;
// //   }
// //   return config;
// // });

// // const adminService = {

// //   getAllUsers: async () => {
// //     const response = await adminApi.get('/users');
// //     return response.data;
// //   },

// //   updateUserRole: async (userId, role) => {
// //     const response = await adminApi.put(`/users/${userId}/role`, { role });
// //     return response.data;
// //   },

// //   getUserDetails: async (userId) => {
// //     const response = await adminApi.get(`/users/${userId}`);
// //     return response.data;
// //   },

// //   getAdminStats: async () => {
// //     const response = await adminApi.get('/stats');
// //     return response.data.data;
// //   }
// // };

// // export default adminService;

// import axios from 'axios';

// const API_URL = `${import.meta.env.VITE_API_URL}/auth/admin`;

// const adminApi = axios.create({
//   baseURL: API_URL,
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });

// adminApi.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// const adminService = {

//   getAllUsers: async () => {
//     const response = await adminApi.get('/users');
//     return response.data;
//   },

//   updateUserRole: async (userId, role) => {
//     const response = await adminApi.put(`/users/${userId}/role`, { role });
//     return response.data;
//   },

//   getUserDetails: async (userId) => {
//     const response = await adminApi.get(`/users/${userId}`);
//     return response.data;
//   },

//   /* NEW DELETE FUNCTION */
//   deleteUser: async (userId) => {
//     const response = await adminApi.delete(`/users/${userId}`);
//     return response.data;
//   },

//   getAdminStats: async () => {
//     const response = await adminApi.get('/stats');
//     return response.data.data;
//   }
// };

// export default adminService;

import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/auth/admin`;

const adminApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

adminApi.interceptors.request.use((config) => {

  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;

});

const adminService = {

  getAllUsers: async () => {

    const response = await adminApi.get('/users');
    return response.data;

  },

  updateUserRole: async (userId, role) => {

    const response = await adminApi.put(`/users/${userId}/role`, { role });
    return response.data;

  },

  getUserDetails: async (userId) => {

    const response = await adminApi.get(`/users/${userId}`);
    return response.data;

  },

  deleteUser: async (userId) => {

    const response = await adminApi.delete(`/users/${userId}`);
    return response.data;

  },

  getAdminStats: async () => {

    const response = await adminApi.get('/stats');
    return response.data.data;

  }

};

export default adminService;