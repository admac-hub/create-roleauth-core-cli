import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homepage';
import Login from './pages/login';
import Register from './pages/register';
import VendorOnboarding from './components/VendorOnboarding';
import EmailSent from './pages/auth/EmailSent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />                           
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user/register" element={<Register role="user" />} />
        <Route path="/vendor/register" element={<Register role="vendor" />} />
        <Route path="/vendor/onboarding" element={<VendorOnboarding />} />
        <Route path="/email-sent" element={<EmailSent />} />

        {/* Add more routes like home/dashboard here */}
      </Routes>
    </Router>
  );
}

export default App;
