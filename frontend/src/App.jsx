import axios from 'axios';

// Dynamically sets the backend URL: uses VITE_API_URL if set (production), otherwise defaults to localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://community-hub-2af6.onrender.com';

const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach JWT token to requests if user is logged in
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
