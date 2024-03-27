import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Nav from "../components/Nav"
import SearchAndFilter from '../components/SearchAndFilter';
import CardSlider from '../components/CardSlider';
import Promotion from '../components/Promotion';
import Subscribe from '../components/Subscribe';
function Home() {
  const navigate = useNavigate()
  // Function to remove JWT token from browser storage
const removeTokenFromStorage = () => {
  localStorage.removeItem('token');
};

  // Function to handle logout
const handleLogout = () => {
  removeTokenFromStorage();
  // Redirect to login page
  navigate('/login');
};
  return (
    <div>
      <Nav />
      <SearchAndFilter/>
      <CardSlider/>
      <Promotion/>
      <h2>Dashboard</h2>
      <Link to="/login">
        <button>Login</button>
      </Link>
      <button onClick={handleLogout}>Logout</button>
      <Subscribe/>
    </div>
  );
}

export default Home;
