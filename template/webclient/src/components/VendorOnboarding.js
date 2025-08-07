import React, { useState } from 'react';
import axios from 'axios';

const VendorOnboarding = () => {
  const [form, setForm] = useState({
    businessName: '',
    category: '',
    phone: '',
    address: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const BASE_URL = process.env.REACT_APP_API_BASE_URL;

    try {
      const response = await axios.post(
        `${BASE_URL}/api/vendor/onboarding`,
        form,
        {
          withCredentials: true // ✅ Send cookie along with the request
        }
      );

      setMessage(response.data.message || 'Onboarding successful!');
      // You can optionally redirect here, e.g., navigate('/vendor/dashboard');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error during onboarding');
    }
  };

  return (
    <div>
      <h2>Vendor Onboarding</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="businessName"
          placeholder="Business Name"
          value={form.businessName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Business Address"
          value={form.address}
          onChange={handleChange}
        />
        <button type="submit">Submit Onboarding</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default VendorOnboarding;
