// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://your-api-base-url.com', // Replace with your actual API base URL
  ENDPOINTS: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh',
  },
  HEADERS: {
    'Content-Type': 'application/json',
  },
};

// API utility functions
export const getAuthHeader = (token) => ({
  Authorization: `Bearer ${token}`,
});

export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error
    return error.response.data.message || 'An error occurred';
  }
  if (error.request) {
    // Request made but no response
    return 'Network error. Please check your connection.';
  }
  // Other errors
  return 'An unexpected error occurred';
};