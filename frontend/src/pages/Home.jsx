import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchAndFilter from '../components/SearchAndFilter';
import CircularCarousel from '../components/CircularCarousel';
import Promotion from '../components/Promotion';
import Subscribe from '../components/Subscribe';
import cardImage3 from '../assets/wenchi 2.webp';
import Navigation from '../components/Navigation';

function Home(isLoggedIn) {
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

const sampleProducts = [
  {
      name: 'Product 1',
      price: '100',
      image: cardImage3,
  },
  {
      name: 'Product 2',
      price: '200',
      image: cardImage3,
  },
  {
      name: 'Product 3',
      price: '150',
      image: cardImage3,
  },
  {
      name: 'Product 4',
      price: '250',
      image: cardImage3,
  },
  {
      name: 'Product 5',
      price: '300',
      image: cardImage3,
  },
  {
      name: 'Product 6',
      price: '350',
      image: cardImage3,
  },
  // Add more products as needed
];



  return (
    <div className='flex flex-col w-full min-h-screen bg-white'>
      <Navigation list={['Home', 'Flights', 'Rooms', 'Rides', 'Dining', 'Packages','Events']} title='Exopia' isLoggedIn={isLoggedIn} App={true} />
      <div className='h-20'></div>
      <div className='w-full flex'>
       <SearchAndFilter/>
      </div>
      
      <CircularCarousel products={sampleProducts} />
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
