import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './styles/register.css';

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
<<<<<<< HEAD
      const response = await axios.post('/auth/register', formData);
=======
      const response = await axios.post('http://localhost:3000/auth/register', formData);
>>>>>>> ca446e2c66f15324b7de07d3ed155294ab026821
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
    <div className='registerPage'>
   <div>
   <p className='Brand'> 
    <span className='firstSliceName'>Me</span>
    <span className='secondSliceName'>he</span>
    <span className='thirdSliceName'>ja</span>
    <span className='domain'>.com</span></p>
   </div>

    <form onSubmit={handleSubmit} className='registerForm'>
      <input
        type="text"
        className='inputField'
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        className='inputField'
        name="fname"
        placeholder="First Name"
        value={formData.fname}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        className='inputField'
        name="lname"
        placeholder="Last Name"
        value={formData.lname}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        className='inputField'
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        className='inputField'
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <button type="submit" className='buttons'>Register</button>
      <Link to="/login" className='anchor'>
        <button className='buttons'>Login</button>
      </Link>
    </form>
    </div>

  );
};

export default Register;
