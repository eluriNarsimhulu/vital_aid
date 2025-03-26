import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

// Register user
const signup = async (userData) => {
  const response = await axios.post(`${API_URL}/signup`, userData);
  return response.data;
};

// Login user
// Login user
const login = async (email, password) => {
  console.log("Login request sent with:", email, password); // Debugging log

  const response = await axios.post(`${API_URL}/login`, { email, password });

  console.log("Login Response:", response.data); // Debugging log
  return response.data;
};
// Get user profile
const getUserProfile = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/profile`, config);
  return response.data;
};

// Google Login
const googleLogin = async (email, fullName) => {
  const response = await axios.post(`${API_URL}/google-login`, { email, fullName });
  return response.data;
};

const authService = { signup, login, getUserProfile, googleLogin };

export default authService;
