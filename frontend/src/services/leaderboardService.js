import axios from "axios";

const API_URL = "http://localhost:8000/api/leaderboard";

const leaderboardApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

leaderboardApi.interceptors.request.use((config) => {

  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;

});

const leaderboardService = {

  getEventLeaderboard: async (eventId) => {

    const res = await leaderboardApi.get(`/event/${eventId}`);
    return res.data.data;

  },

  updateParticipantScore: async (eventId, userId, scoreData) => {

    const res = await leaderboardApi.put(
      `/event/${eventId}/user/${userId}`,
      scoreData
    );

    return res.data.data;

  },

  getTopPerformers: async () => {

    const res = await leaderboardApi.get("/top-performers");
    return res.data.data;

  },

  getCollegeLeaderboard: async () => {

    const res = await leaderboardApi.get("/college-leaderboard");
    return res.data.data;

  }

};

export default leaderboardService;