import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

import Register from '../src/pages/Register';
import Login from '../src/pages/Login';
import Home from '../src/pages/Home';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // If token exists, set isLoggedIn to true
      setIsLoggedIn(true);
      console.log("token found", isLoggedIn)
      // Set the default Authorization header for axios requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      console.log("token not found")
      // If token doesn't exist, set isLoggedIn to false
      setIsLoggedIn(false);
      // Remove the default Authorization header for axios requests
      delete axios.defaults.headers.common['Authorization'];
    }
  }, []);

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    // Set isLoggedIn to false
    setIsLoggedIn(false);
    // Remove the default Authorization header for axios requests
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<Login isLoggedIn={isLoggedIn} />} />
          <Route path="/register" element={<Register />} />
          {/* Private Route for Home */}
          <Route
            path="/"
            element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
