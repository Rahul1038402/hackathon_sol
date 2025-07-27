import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Intercept requests to attach token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // stored after login
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
