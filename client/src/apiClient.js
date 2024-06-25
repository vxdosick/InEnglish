import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.production.VUE_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default apiClient;