// frontend/src/pages/Login.jsx
import React, { useState } from 'react';
import api from '../utils/axiosConfig';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [role, setRole] = useState('HOD');
  const [domain, setDomain] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { role, domain, username, password });
      localStorage.setItem('token', response.data.token); // Save JWT to localStorage
      navigate('/profile'); // Redirect to Profile page after successful login
    } catch (error) {
      console.error('Login failed', error);
      alert('Invalid login credentials');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <label>
        Role:
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="HOD">HOD</option>
          <option value="Staff">Staff</option>
        </select>
      </label>

      {role === 'Staff' && (
        <label>
          Domain:
          <select value={domain} onChange={(e) => setDomain(e.target.value)}>
            <option value="fullstack">Fullstack</option>
            <option value="ML">ML</option>
          </select>
        </label>
      )}

      <label>
        Username:
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>

      <label>
        Password:
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>

      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
