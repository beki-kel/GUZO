import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import traveller6 from '../assets/traveller6.png';
import orangeLoading from '../assets/orange-gif.gif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    fname: '',
    lname: '',
    email: '',
    password: '',
  });
  const [Loading, setLoading]=useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('https://guzo-x4ue.onrender.com/auth/register', formData);

      if (response.status === 201) {
        console.log(response.data);
        navigate('/login', { state: { username: formData.username, password: formData.password } });
      } else {
        setLoading(false);
        alert('User is not Registered');
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data.message;

        if (status === 409 || message.includes('E11000 duplicate key error')) {
          if (message.includes('username')) {
            setErrorMessage('Username already exists. Please choose a different one.');
          } else if (message.includes('email')) {
            setErrorMessage('Email already exists. Please use a different one.');
          } else {
            setErrorMessage('email and username must be unique ');
          }
        } else if (status === 422) {
          setErrorMessage('Validation error. Please check your input.');
        } else {
          setErrorMessage(`An error occurred during registration. Please retry.`);
        }
      } else {
        setErrorMessage('An error occurred during registration');
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
      <h4 className='w-full text-orange-800 font-normal'>Discover Your Adventure with a Web all in one</h4>
      <p className='w-full text-xl'> book your flights,rides,dinning,events and more!</p>
      <p className='w-full text-xl'> Ethiopia the land of origins.</p>
    </div>
      
  </div>

    <div className='flex flex-col justify-center items-center w-1/2'>
    <div className='flex w-52 h-52'>
      <img src={traveller6} alt="traveller"  className="object-contain w-full h-full"/>
    </div>

    <form onSubmit={handleSubmit} className="bg-black p-6 rounded-3xl shadow-lg w-full max-w-sm border-2 border-orange-800 justify-center items-center">
        <h1 className="text-2xl text-center text-white mb-4 font-bold">Register Now</h1>
        {errorMessage && <div className='text-red-700 text-center mb-3'>{errorMessage}</div>}
        {Loading &&<div className='w-full flex justify-center items-center mb-2 p-1'>
                      <img src={orangeLoading} alt="Loading" className="w-10 h-10 rounded-t-lg" />
                    </div>}
        <div className='flex justify-center items-center space-x-5 w-full'>
        <input
          type="text"
          className=" rounded-lg p-2 mb-3 text-center bg-gray-900 focus:outline-none focus:border-none focus:outline-orange-800 text-white w-full"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        </div>

        <div className='flex justify-between items-center w-full space-x-4'>
        <input
          type="text"
          className=" rounded-lg p-2 mb-3 text-center bg-gray-900 focus:outline-none focus:border-none focus:outline-orange-800 text-white w-1/2 "
          name="fname"
          placeholder="First Name"
          value={formData.fname}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          className="rounded-lg p-2 mb-3 text-center bg-gray-900 focus:outline-none focus:border-none focus:outline-orange-800 text-white w-1/2 "
          name="lname"
          placeholder="Last Name"
          value={formData.lname}
          onChange={handleChange}
          required
        />
        </div>

        <div className='flex justify-center items-center space-x-5 w-full'>
          <input
            type="email"
            name="email"
            className="rounded-lg p-2 mb-3 text-center bg-gray-900 focus:outline-none focus:border-none focus:outline-orange-800 text-white w-full"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className='flex justify-center items-center space-x-5 w-full'>
          <input
            type="password"
            name="password"
            className="rounded-lg p-2 mb-3 text-center bg-gray-900 focus:outline-none focus:border-none focus:outline-orange-800 text-white w-full"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className='flex flex-col w-full items-center justify-center'>
        <button type="submit" className="bg-orange-800 text-white font-bold py-2 px-4 mt-6 rounded-xl w-8/12">Register</button>
        <div className="flex flex-col w-full items-center justify-center">
          <p className="text-white font-medium mt-2">Already have account? <Link to='/login' className='text-orange-600 underline font-normal'>Login </Link></p>
        </div>
        </div>

    </form>
    </div>
    </div>

  );
};

export default Register;
