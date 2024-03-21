import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/login', { username, password });
      if (response.status === 201) {
        const user = response.data;
        console.log('Logged in user:', user);
        navigate('/');
      } else if (response.status === 400 || response.status === 404) {
        alert("User does not exist");
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message || 'An error occurred during login');
      } else {
        setErrorMessage('An error occurred during login');
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {errorMessage && <div>{errorMessage}</div>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
        <Link to="/register">
          <button>Signup</button>
        </Link>
      </form>
    </div>
  );
};

export default Login;
