// authService.js
import axios from "axios";

// const BASE_URL = "https://futureblink-backend.onrender.com/api/auth"; // Change this to your backend API URL
const BASE_URL = "http://localhost:8000/api/auth";
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    throw new Error("Login failed. Please check your credentials.");
  }
};

export const signup = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw new Error("Signup failed. Please try again later.");
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/logout`);
    return response.data;
  } catch (error) {
    throw new Error("Logout failed. Please try again later.");
  }
};

export const isAuthenticated = () => {
  // Check if the token exists in local storage
  return !!localStorage.getItem("authToken");
};
