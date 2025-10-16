import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api/v2',
  // baseURL: 'https://unmagnetic-martial-garrett.ngrok-free.dev/api/v2',
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use((req) => {
  const token = sessionStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
