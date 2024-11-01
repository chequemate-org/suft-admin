// src/utils/auth.js
export const setAuthToken = (token) => {
    localStorage.setItem('adminToken', token);
  };
  
  export const getAuthToken = () => {
    return localStorage.getItem('adminToken');
  };
  
  export const removeAuthToken = () => {
    localStorage.removeItem('adminToken');
  };
  
  export const isAuthenticated = () => {
    const token = getAuthToken();
    return !!token; // Returns true if token exists
  };
  
  export const logout = () => {
    removeAuthToken();
    // Optionally remove user info or redirect to login
    localStorage.removeItem('adminUser');
    // You can add a redirect to login page here if needed
  };