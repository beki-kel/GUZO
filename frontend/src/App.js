import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Register from '../src/pages/Register';
import Login from '../src/pages/Login';
import Home from '../src/pages/Home';
import Admin from './pages/Admin';
import LandingPage from './pages/landingPage';
import {jwtDecode} from 'jwt-decode';
import './index.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // Set initial state to null
  const [isAdmin, setIsAdmin] = useState(false);
  const [pageState, setPageState] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      setIsLoggedIn(true);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken && decodedToken.isAdmin) {
          setIsAdmin(true);
          console.log("isadmin: ", isAdmin, "decoded:", token);
        }
      } catch (err) {
        console.log("Can not decode the token: ", err);
      }
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);
      delete axios.defaults.headers.common['Authorization'];
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handlePageState = (page) => {
    setPageState(page);
    console.log("Page state set to:", page);
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/landing' element={<LandingPage isLoggedIn={isLoggedIn} handlePageState={handlePageState} />} />
          <Route path="/login" element={<Login isLoggedIn={isLoggedIn} pageState={pageState} handleLogin={handleLogin} handlePageState={handlePageState} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home isLoggedIn={isLoggedIn} /> } />
          {/* Only render Admin route if user is logged in and is admin */}
          {isLoggedIn && isAdmin && <Route path="/admin" element={<Admin />} />}
          {/* Private Route for Home */}
          <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/landing" />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
