import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/token/', credentials);
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      navigate('/'); // Redirect to homepage after login
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow-lg p-4 rounded-4" style={{ width: '100%', maxWidth: '420px', background: '#ffffff' }}>
        <h2 className="text-center mb-4 text-primary fw-bold">Welcome Back 👋</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label fw-semibold text-secondary">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              className="form-control rounded-3"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold text-secondary">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="form-control rounded-3"
              placeholder="Enter your password"
              required
            />
          </div>
          {error && (
            <div className="alert alert-danger py-2 text-center" role="alert">
              {error}
            </div>
          )}
          <button type="submit" className="btn btn-primary w-100 rounded-3 fw-semibold">
            Log In
          </button>
        </form>
        <div className="text-center mt-3 text-muted small">
          Don’t have an account? <a href="/register" className="text-decoration-none text-primary">Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
