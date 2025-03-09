import axios, { InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api',
  withCredentials: true
});

export const getSession = async () => {
  try {
    const response = await axiosInstance.get('/auth/session/');
    return response.data;
  } catch (error) {
    console.error('Session Error:', error);
    return null;
  }
};

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers = config.headers || {};    

    const csrfToken = Cookies.get('csrftoken');
    const sessionToken = Cookies.get('sessionid');

    if (csrfToken) {
      config.headers['X-CSRFToken'] = csrfToken;
    }
    if (sessionToken) {
      config.headers['Authorization'] = `Bearer ${sessionToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Add response interceptors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors globally
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
