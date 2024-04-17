import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ handleLogin }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/login', { username, password });
      if (response.status === 201) {
        const { token } = response.data; // Access the token from response data
        localStorage.setItem('token', token);
        console.log("this is the response data: ", response.data.token)
        handleLogin();
        navigate('/');
      } else {
        console.log("Can't login")
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
    <div className='loginPage'> 
        <p className='Brand'> 
          <span className='firstSliceName'>Me</span>
          <span className='secondSliceName'>he</span>
          <span className='thirdSliceName'>ja</span>
          <span className='domain'>.com</span>
        </p>

      <form onSubmit={handleSubmit} className='registerForm'>
      {errorMessage && <div className='errorDisplay'>{errorMessage}</div>}
        <div className='loginField'>
          <label>Username:</label>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className='loginInputField' />
        </div>
        <div className='loginField'>
          <label>Password:</label>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className='loginInputField'/>
        </div>
        <button type="submit" className='buttons'>Login</button>
        <Link to="/register" className='anchor'>
          <button className='buttons'> Signup</button>
        </Link>
      </form>
    </div>
  );
};

export default Login;
