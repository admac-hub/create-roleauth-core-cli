import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import authApi from '../api/authApi';

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const role = queryParams.get('role') || 'user';

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    try {
      setSubmitting(true);
      await authApi.register(role, formData, role === 'vendor');
      navigate(`/email-sent?role=${role}`);
    } catch (err) {
      console.error('Registration error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>{role === 'vendor' ? 'Vendor Registration' : 'User Registration'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
          required
        />
        <input
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={submitting}>
          {submitting ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;
