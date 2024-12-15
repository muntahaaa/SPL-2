import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setToken }) => {
  const [credentials, setCredentials] = useState({
    Email: '',
    Password: ''
  });
  const [message, setMessage] = useState('');
  const [userToken, setUserToken] = useState('');

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/v1/login', credentials);
      console.log('API Response:', response.data); // Log the API response
      if (response.data.data.token) {
        setToken(response.data.data.token);
        setUserToken(response.data.data.token);
        setMessage('Login successful!');
      } else {
        setMessage('Login failed. No token received.');
      }
    } catch (error) {
      setMessage('Login failed. Please try again.');
      console.error('Login error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="Email" placeholder="Email" onChange={handleChange} />
      <input type="password" name="Password" placeholder="Password" onChange={handleChange} />
      <button type="submit">Login</button>
      {message && <p>{message}</p>}
      {userToken && <p>Token: {userToken}</p>}
    </form>
  );
};

export default Login;