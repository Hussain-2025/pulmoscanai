import axios from "axios";

let rawUrl = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").trim();
if (rawUrl.endsWith("/")) rawUrl = rawUrl.slice(0, -1);
if (!rawUrl.endsWith("/api")) rawUrl = `${rawUrl}/api`;
const API_URL = rawUrl;

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || error.message || "Something went wrong";
    return Promise.reject(new Error(message));
  }
);

export default api;
