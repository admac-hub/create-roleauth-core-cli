import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authApi from '../api/authApi';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await authApi.login('user', form); // Sends cookie automatically if axios is configured withCredentials

      const { role, isOnboarded } = response.data;

      if (role === 'vendor' && !isOnboarded) {
        navigate('/vendor/onboarding');
      } else {
        navigate('/');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      {message && <p style={{ color: 'red' }}>{message}</p>}
      {/* <p style={{ marginTop: '1rem' }}>Don’t have an account?</p> */}
      {/* <div>
        <button onClick={() => navigate('/register?role=user')}>
          Sign up as User
        </button>
        <button onClick={() => navigate('/register?role=vendor')} style={{ marginLeft: '1rem' }}>
          Sign up as Vendor
        </button>
      </div> */}
    </div>
  );
};

export default Login;
