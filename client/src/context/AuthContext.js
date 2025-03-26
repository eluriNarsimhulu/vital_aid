import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
  
    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data from localStorage", error);
        localStorage.removeItem('user'); // Remove corrupt data
      }
    }
    setLoading(false);
  }, []);
  

  const login = (userData) => {
    if (userData?.token) {
      localStorage.setItem('user', JSON.stringify(userData.user)); // Store user object
      localStorage.setItem('token', userData.token); // Store token separately
      setUser(userData.user);
      navigate('/home');
    }
  };

  const signup = async (userData) => {
  if (!userData || !userData.user || !userData.token) {
    console.error("Signup error: Invalid response from server", userData);
    return;
  }

  localStorage.setItem('user', JSON.stringify(userData.user));
  localStorage.setItem('token', userData.token);
  setUser(userData.user);
  navigate('/home');
};


  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
