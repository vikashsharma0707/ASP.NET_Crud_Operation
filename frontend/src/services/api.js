import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5206/api'  // HTTP पोर्ट
});

export default api;