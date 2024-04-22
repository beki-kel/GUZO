import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import traveller6 from '../assets/traveller6.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    fname: '',
    lname: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/register', formData);

      if (response.status === 201) {
        console.log(response.data);
        navigate('/');
      } else if (response.status === 400 || response.status === 404 ) {
        alert("User is not Registered");
      }
    } catch (error) {
      if (error.response) {
        console.error('Registration failed:', error.response.data.message);
      } else {
        console.error('Registration failed:', error.message);
      }
    }
  };

  return (
  <div className='flex justify-center items-center bg-white w-full min-h-screen mb-14 px-10'>
  
  <div className='flex mb-10 text-3xl font-thin w-1/2 items-center justify-center'>
      <FontAwesomeIcon icon={faPlaneDeparture} style={{ color: "#ff622e" }} className='mr-2' />
      <p>Exopia</p>
  </div>

    <div className='flex flex-col justify-center items-center w-1/2'>
    <div className='flex w-52 h-52'>
      <img src={traveller6} alt="traveller"  className="object-contain w-full h-full"/>
    </div>

    <form onSubmit={handleSubmit} className="bg-black p-4 pb-6 rounded-3xl shadow-lg w-full max-w-sm border-2 border-orange-600 justify-center items-center">
        <h1 className="text-2xl text-center text-white mb-4 font-bold">Register Now</h1>

        <div className='flex justify-center items-center space-x-5 w-full'>
        <input
          type="text"
          className=" rounded-lg p-2 mb-3 text-center bg-gray-900 focus:outline-none focus:border-none focus:outline-orange-600 text-white w-full"
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
          className=" rounded-lg p-2 mb-3 text-center bg-gray-900 focus:outline-none focus:border-none focus:outline-orange-600 text-white w-1/2 "
          name="fname"
          placeholder="First Name"
          value={formData.fname}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          className="rounded-lg p-2 mb-3 text-center bg-gray-900 focus:outline-none focus:border-none focus:outline-orange-600 text-white w-1/2 "
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
            className="rounded-lg p-2 mb-3 text-center bg-gray-900 focus:outline-none focus:border-none focus:outline-orange-600 text-white w-full"
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
            className="rounded-lg p-2 mb-3 text-center bg-gray-900 focus:outline-none focus:border-none focus:outline-orange-600 text-white w-full"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className='flex flex-col w-full items-center justify-center'>
        <button type="submit" className="bg-orange-600 text-white font-bold py-2 px-4 mt-6 rounded-xl w-8/12">Register</button>
        <Link to="/login" className="flex flex-col w-full items-center justify-center">
          <button type="button" className="bg-orange-600 text-white font-bold py-2 px-4 mt-4 rounded-xl w-8/12">Login</button>
        </Link>
        </div>

    </form>
    </div>

    </div>

  );
};

export default Register;
