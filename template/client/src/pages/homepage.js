import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

  const handleGoogleUserLogin = () => {
    window.location.href = `${API_BASE_URL}/api/auth/google/user`;
  };

  const handleGoogleVendorLogin = () => {
    window.location.href = `${API_BASE_URL}/api/auth/google/vendor`;
  };

  return (
    <div className="home-container">
      <div className="welcome-card">
        <h1>Welcome to Mern Auth 🌿</h1>
        <p>Build the perfect authentication flow.</p>

        <div className="btn-group">
          <button onClick={() => navigate('/login')}>Login</button>
          <button onClick={() => navigate('/register?role=user')}>Sign Up as User</button>
          <button onClick={() => navigate('/register?role=vendor')}>Sign Up as Vendor</button>
        </div>

        <div className="google-login-group" style={{ marginTop: '20px' }}>
          <p>— or sign in with Google —</p>
          <button onClick={handleGoogleUserLogin}>Google Sign In (User)</button>
          <button onClick={handleGoogleVendorLogin}>Google Sign In (Vendor)</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
