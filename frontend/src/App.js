import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

import Register from '../src/pages/Register';
import Login from '../src/pages/Login';
import Home from '../src/pages/Home';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // Set initial state to null

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      setIsLoggedIn(false);
      delete axios.defaults.headers.common['Authorization'];
    }
  }, []);

  // Render a loading indicator until authentication check is complete
  if (isLoggedIn === null) {
    return <div>Loading...</div>;
  }

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
