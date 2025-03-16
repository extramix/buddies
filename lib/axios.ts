import axios, { InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'sonner';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api',
  withCredentials: true
});

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

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const errorData = error.response?.data;
    if (errorData && typeof errorData === 'object') {
      // Handle field-level validation errors
      Object.entries(errorData).forEach(([field, errors]) => {
        if (Array.isArray(errors)) {
          errors.forEach(error => {
            toast.error(`${field}: ${error}`);
          });
        }
      });
    } else {
      const errorMessage = error.response?.data?.detail || error.message || 'An unknown error occurred';
      toast.error(errorMessage);
    }
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
