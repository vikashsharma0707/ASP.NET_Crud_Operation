import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: 'admin',
    password: 'password'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(
        'https://localhost:7234/api/login',  // अपना पोर्ट चेक करो (dotnet run में जो दिखे)
        credentials,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const token = response.data.token;
      localStorage.setItem('token', token);
      alert('Login successful!');
      navigate('/list');
    } catch (err) {
      if (err.code === 'ERR_NETWORK') {
        setError('Cannot connect to backend. Check if backend is running on HTTPS port.');
      } else if (err.response?.status === 401) {
        setError('Invalid username or password');
      } else {
        setError('Server error. Check console.');
      }
      console.error('Login error:', err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Employee Management System</h2>
        <h3>Login</h3>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={credentials.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p className="hint">Default: admin / password</p>
      </div>
    </div>
  );
};

export default Login;