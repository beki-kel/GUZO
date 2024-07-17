import React, { useState , useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchAndFilter from '../components/SearchAndFilter';
import Subscribe from '../components/Subscribe';
import cardImage3 from '../assets/wenchi 2.webp';
import Navigation from '../components/Navigation';
import HomePricingCard from '../components/HomePricingCard';
import Gallery from '../components/Gallery';
import { CarouselCustomNavigation } from '../components/blogCarousal';
import Footer from '../components/Footer';
import { Spinner } from "@material-tailwind/react";

function Home({isLoggedIn}) {
  const[isLoaded,setIsLoaded]=useState(null)


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

useEffect(() => {
  const timer = setTimeout(() => {
    setIsLoaded(true);
  }, 5000);

  return () => clearTimeout(timer);
}, []);

if (!isLoaded) {
  return (
    <div className='w-full min-h-screen flex justify-center items-center mb-2 p-2'>
      <Spinner className="h-50 w-50 text-orange-800" />
    </div>
  );
}
  return (
    <div className='flex flex-col w-full min-h-screen bg-white'>
      <Navigation list={['Home', 'Blog', 'Bookings', 'Packages']} title='Exopia' isLoggedIn={isLoggedIn} App={true} />
      <div className='h-20'></div>
      <div className='w-full flex '>
        <SearchAndFilter/>
      </div>
      <Gallery/>
      <HomePricingCard/>
      <div className='w-full h-[36rem] '>
        <CarouselCustomNavigation/>
      </div>
      <div className='w-full bg-gray-900'>
        <Footer/>
      </div>
    </div>
  );
}

export default Home;
