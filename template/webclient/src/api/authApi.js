import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const authApi = {
  login: (role, credentials) => {
    const endpoint =
      role === 'vendor'
        ? `${BASE_URL}/api/auth/vendor/login`
        : `${BASE_URL}/api/auth/login`;

    return axios.post(endpoint, credentials, { withCredentials: true });
  },

  register: (role, data) => {
    const endpoint =
      role === 'vendor'
        ? `${BASE_URL}/api/auth/vendor/register`
        : `${BASE_URL}/api/auth/register`;

    return axios.post(endpoint, data, { withCredentials: true });
  },
};

export default authApi;
