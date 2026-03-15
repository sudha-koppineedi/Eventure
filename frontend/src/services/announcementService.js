import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/notifications`;

const announcementAPI = axios.create({
  baseURL: API_URL
});

announcementAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const announcementService = {

  getAllAnnouncements: async () => {
    const response = await announcementAPI.get('/announcements');
    return response.data;
  },

  getAnnouncementById: async (id) => {
    const response = await announcementAPI.get(`/announcements/${id}`);
    return response.data;
  },

  getAnnouncementsByEvent: async (eventId) => {
    const response = await announcementAPI.get(`/announcements/event/${eventId}`);
    return response.data;
  },

  createAnnouncement: async (data) => {
    const response = await announcementAPI.post('/announcements', data);
    return response.data;
  },

  updateAnnouncement: async (id, data) => {
    const response = await announcementAPI.put(`/announcements/${id}`, data);
    return response.data;
  },

  deleteAnnouncement: async (id) => {
    const response = await announcementAPI.delete(`/announcements/${id}`);
    return response.data;
  }
};

export default announcementService;