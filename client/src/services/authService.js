import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

// Register user
const signup = async (userData) => {
  const response = await axios.post(`${API_URL}/signup`, userData);
  return response.data;
};

// Login user
const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
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

const authService = {
  signup,
  login,
  getUserProfile,
};

export default authService;