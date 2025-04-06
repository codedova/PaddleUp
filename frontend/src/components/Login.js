// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Log the credentials for debugging purposes
    console.log("Attempting login with:", { username, password });
    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/api/login',
        { username, password },
        { withCredentials: true }
      );
      console.log("Login successful:", response.data);
      onLogin(response.data.user);
    } catch (err) {
      console.error("Login error:", err);
      // Check if the error response exists and use it, otherwise fallback to a generic message
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("Login failed: " + err.message);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2>Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Username:</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;
