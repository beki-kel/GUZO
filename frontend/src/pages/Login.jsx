import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate,useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';
import traveller4 from '../assets/traveller4.png';

const Login = ({ handleLogin }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (location.state) {
      setUsername(location.state.username || '');
      setPassword(location.state.password || '');
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://guzo-x4ue.onrender.com/auth/login', { username, password });
      if (response.status === 201) {
        const { token } = response.data; // Access the token from response data
        localStorage.setItem('token', token);
        console.log("this is the response data: ", response.data)
        handleLogin();
        navigate('/Home');
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
    <div className='flex justify-center items-center bg-white w-full min-h-screen  px-10'>
  <div className='flex flex-col mb-10 text-3xl font-thin w-1/2 items-center justify-center'>
    <div className='flex w-full justify-center items-center mb-6'>
      <FontAwesomeIcon icon={faPlaneDeparture} style={{ color: "#ff622e" }} className='mr-2' />
      <h2 className='text-4xl font-medium'>Exopia</h2>
    </div>
    
    <div className='flex flex-col w-full text-center justify-center items-center'>
      <h4 className='w-full text-orange-600 font-normal'>Discover Your Adventure with a Web all in one</h4>
      <p className='w-full text-xl'> book your flights,rides,dinning,events and more!</p>
      <p className='w-full text-xl'> Ethiopia the land of origins.</p>
    </div>
      
  </div>

      <div className='flex flex-col justify-center items-center mt-auto w-1/2'>
        <form onSubmit={handleSubmit} className="bg-black px-8 py-12 rounded-3xl shadow-lg w-full max-w-sm border-2 border-orange-600 justify-center items-center">
      <h1 className="text-2xl text-center text-white mb-4 font-bold">Login</h1>
        {errorMessage && <div className='text-red-700 text-center mb-3'>{errorMessage}</div>}
          <div className='flex justify-center items-center space-x-5 w-full'>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className='rounded-lg p-2 mb-3 text-center bg-gray-900 focus:outline-none focus:border-none focus:outline-orange-600 text-white w-full' />
          </div>
          <div className='flex justify-center items-center space-x-5 w-full'>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className='rounded-lg p-2 mb-3 text-center bg-gray-900 focus:outline-none focus:border-none focus:outline-orange-600 text-white w-full'/>
          </div>
          <div className='flex flex-col w-full items-center justify-center'>
            <button type="submit" className="bg-orange-600 text-white font-bold py-2 px-4 mt-6 rounded-xl w-8/12">Login</button>
            <div className="flex flex-col w-full items-center justify-center">
              <p className="text-white font-medium mt-2">don't have account? <Link to='/register' className='text-orange-600 underline font-normal'>Signup </Link></p>
            </div>
          </div>
        </form>

      <div className='flex w-full h-72 justify-end'>
        <img src={traveller4} alt="traveller"  className="object-contain h-full"/>
      </div>
      </div>

    </div>
  );
};

export default Login;
