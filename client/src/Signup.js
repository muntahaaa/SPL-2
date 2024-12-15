import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [user, setUser] = useState({
    userType: '',
    Username: '',
    Email: '',
    Password: '',
    FullName: '',
    RoleID: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/v1/signup', user);
      setMessage('Registration successful!');
      console.log(response.data);
    } catch (error) {
      setMessage('Registration failed. Please try again.');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="userType" placeholder="User Type" onChange={handleChange} />
      <input type="text" name="Username" placeholder="Username" onChange={handleChange} />
      <input type="email" name="Email" placeholder="Email" onChange={handleChange} />
      <input type="password" name="Password" placeholder="Password" onChange={handleChange} />
      <input type="text" name="FullName" placeholder="Full Name" onChange={handleChange} />
      <input type="number" name="RoleID" placeholder="Role ID" onChange={handleChange} />
      <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} />
      <button type="submit">Sign Up</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default Signup;