import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
// import '../styles/Home.css';

const Home = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome, {user?.fullName}!</h1>
        <p>You have successfully logged in to your account.</p>
        
        <div className="user-info">
          <h3>Your Profile Information</h3>
          <div className="info-item">
            <span className="label">Full Name:</span>
            <span className="value">{user?.fullName}</span>
          </div>
          <div className="info-item">
            <span className="label">Email:</span>
            <span className="value">{user?.email}</span>
          </div>
          <div className="info-item">
            <span className="label">Mobile Number:</span>
            <span className="value">{user?.mobileNumber}</span>
          </div>
        </div>
        
        <button className="btn btn-danger" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;