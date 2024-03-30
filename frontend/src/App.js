import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Register from '../src/pages/Register';
import Login from '../src/pages/Login';
import Home from '../src/pages/Home';
import Admin from './pages/Admin';
import { jwtDecode } from 'jwt-decode';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // Set initial state to null
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      setIsLoggedIn(true);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken && decodedToken.isAdmin) {
          setIsAdmin(true);
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
  }

  // Render a loading indicator until authentication check is complete
  if (isLoggedIn === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<Login isLoggedIn={isLoggedIn} handleLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          {/* Only render Admin route if user is logged in and is admin */}
          {isLoggedIn && isAdmin && <Route path="/admin" element={<Admin />} />}
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
