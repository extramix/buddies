import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'
});

axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const csrfToken = Cookies.get('csrftoken');
    const sessionToken = Cookies.get('sessionid');

    if (csrfToken) {
      config.headers = {
        ...config.headers,
        'X-CSRFToken': csrfToken,
      };
    }
    if (sessionToken) {
      config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${sessionToken}`,
      };
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
