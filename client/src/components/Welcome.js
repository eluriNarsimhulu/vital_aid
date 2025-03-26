import React from 'react';
import { Link } from 'react-router-dom';
import "./css/Welcome.css"
// .css';

const Welcome = () => {
  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1>Vital Aid</h1>
        <p>Join our community today and unlock amazing features!</p>
        
        <div className="welcome-buttons">
          <Link to="/login" className="btn btn-primary">Login</Link>
          <Link to="/signup" className="btn btn-secondary">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;