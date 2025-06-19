import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import './Login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // 👈 From context

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/token/', credentials);
      login(response.data.access, response.data.refresh); // 👈 Set tokens and trigger global auth state
      navigate('/');
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 login-bg">
      <div className="login-card shadow-lg p-4 animate-pop">
        <h2 className="text-center mb-4 text-light fw-bold">Welcome Back 👋</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label text-light fw-semibold">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              className="form-control rounded-pill input-glass"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label text-light fw-semibold">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="form-control rounded-pill input-glass"
              placeholder="Enter your password"
              required
            />
          </div>
          {error && (
            <div className="alert alert-danger py-2 text-center rounded-pill fw-semibold" role="alert">
              {error}
            </div>
          )}
          <button type="submit" className="btn btn-gradient w-100 rounded-pill fw-semibold py-2">
            Log In
          </button>
        </form>
        <div className="text-center mt-3 text-light small">
          Don’t have an account? <a href="/register" className="text-decoration-none text-accent">Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
