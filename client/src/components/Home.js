// import React, { useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';

const Home = () => {
  // const { user, logout, loading } = useContext(AuthContext);

  // if (loading) {
  //   return <h2>Loading...</h2>; // Prevent rendering issues
  // }

  return (
    <div className="home-container">
      {/* <div className="home-content">
        <h1>Welcome, {user?.fullName || 'Guest'}!</h1>
        <p>You have successfully logged in to your account.</p>
        
        {user && (
          <div className="user-info">
            <h3>Your Profile Information</h3>
            <div className="info-item">
              <span className="label">Full Name:</span>
              <span className="value">{user.fullName}</span>
            </div>
            <div className="info-item">
              <span className="label">Email:</span>
              <span className="value">{user.email}</span>
            </div>
            <div className="info-item">
              <span className="label">Mobile Number:</span>
              <span className="value">{user.mobileNumber || 'N/A'}</span>
            </div>
          </div>
        )}

        <button className="btn btn-danger" onClick={logout}>
          Logout
        </button>
      </div> */}
      <h1>Home Page</h1>
    </div>
  );
};

export default Home;
