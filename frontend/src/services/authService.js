import axios from "axios";

// API Gateway URL from Vite environment
const API_URL = `${import.meta.env.VITE_API_URL}/auth`;

// Axios instance
const authApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

// Attach JWT automatically to every request
authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

const authService = {

  register: async (userData) => {
    try {
      const response = await authApi.post("/register", userData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Registration failed"
      );
    }
  },

  login: async (email, password) => {
    try {
      const response = await authApi.post("/login", { email, password });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Login failed"
      );
    }
  },

  logout: () => {
    localStorage.removeItem("token");
  },

  getCurrentUser: async () => {
    try {
      const response = await authApi.get("/me");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get user profile"
      );
    }
  },

  updateProfile: async (profileData) => {
    try {
      const response = await authApi.put("/profile", profileData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Profile update failed"
      );
    }
  },

  forgotPassword: async (email) => {
    try {
      const response = await authApi.post("/forgot-password", { email });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
        "Failed to send password reset email"
      );
    }
  },

  // FIXED: uses PUT instead of POST
  resetPassword: async (token, password) => {
    try {
      const response = await authApi.put(`/reset-password/${token}`, {
        password
      });

      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to reset password"
      );
    }
  },

  googleLogin: async (idToken, college = null) => {
    try {
      const response = await authApi.post("/google", {
        idToken,
        college
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Google login failed"
      );
    }
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  }
};

export default authService;