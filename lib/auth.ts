import axiosInstance from './axios';
import Cookies from 'js-cookie';

// Function to check authentication status with Django backend (server-side compatible)
export const checkAuthStatus = async (sessionCookie: string): Promise<boolean> => {
  try {
    // For server-side use with a provided session cookie
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/check/`, {
      method: 'GET',
      headers: {
        'Cookie': `sessionid=${sessionCookie}`,
        'X-CSRFToken': getCsrfToken(),
      },
      credentials: 'include',
    });

    if (response.ok) {
      const data = await response.json();
      return data.isAuthenticated;
    }
    
    return false;
  } catch (error) {
    console.error('Error checking authentication status:', error);
    return false;
  }
};

export const getCsrfToken = (): string => {
  // In browser context
  if (typeof document !== 'undefined') {
    return Cookies.get('csrftoken') || '';
  }
  
  // In server context
  return '';
};

// Client-side authentication functions using axios
export const login = async (username: string, password: string): Promise<boolean> => {
  try {
    const response = await axiosInstance.post('/auth/login/', {
      username,
      password
    });
    return response.status === 200;
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
};

export const logout = async (): Promise<boolean> => {
  try {
    const response = await axiosInstance.post('/auth/logout/');
    Cookies.remove('sessionid');
    return true;
  } catch (error) {
    console.error('Logout error:', error);
    return false;
  }
}; 