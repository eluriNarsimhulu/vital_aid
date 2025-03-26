import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom'; // Add this import
import { useGoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';
import authService from '../services/authService';
import { AuthContext } from '../context/AuthContext';
import "./css/Login.css"

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle traditional email/password login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userData = await authService.login(email, password);
      login(userData);
      toast.success("Login successful!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid credentials. Please try again.");
    }
  };
  
  // Google OAuth login
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenResponse.access_token}`);
        const profile = await response.json();

        const userData = await authService.googleLogin(profile.email, profile.name);
        login(userData);
        toast.success("Google login successful!");
      } catch (error) {
        toast.error("Google login failed");
      }
    },
    onError: () => {
      toast.error("Google authentication failed");
    },
  });

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <h2>Welcome Back</h2>
        
        {/* Traditional Email/Password Login */}
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>Email or Phone Number:</label>
            <input 
              type="text" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>

          <div className="login-additional-links">
            <Link to="/forgot-password">Forgot Password?</Link>
            <Link to="/signup">Create an Account</Link>
          </div>

          <button type="submit" className="btn btn-primary">Login</button>
        </form>

        <div className="divider">OR</div>

        {/* Google OAuth Login */}
        <button onClick={() => googleLogin()} className="btn btn-google">
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;