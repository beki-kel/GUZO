import React, { useRef,useEffect } from 'react';
import Navigation from '../components/Navigation';
import { Navigate, useNavigate } from 'react-router-dom';
import PricingCards from '../components/pricingCard';
import cardImage1 from '../assets/entoto 2.jpg';
import cardImage2 from '../assets/kuriftu-water-park.jpg';
import cardImage3 from '../assets/wenchi 2.webp';
import ethiopianAirlines from '../assets/Ethiopian_Airlines.jpg';
import ethiopianairline2 from '../assets/airlines2.webp';
import skyLight from '../assets/sky light.jpg';
import kuriftu from '../assets/img-kuriftu-resort-and-spa-adama-adama-2.jpg'
import cabin from '../assets/Cabin.jpg';
import wenchiCarter from '../assets/wenchi carter.jpg';
import friendship from '../assets/frendship.jpg';
import changan from '../assets/changan.jpg';
import tesla from '../assets/tesla.jpg';
import expressWay from '../assets/expressway.jpg';
import CircularCarousel from '../components/CircularCarousel';
import girum from '../assets/air lines 3.jpg';
import EventDisplay from '../components/EventsDisplay';
import kirunfud from '../assets/Kirunfud.jpg';
import bk from '../assets/BK ON DA TRACK.jpg';
import Garage from '../assets/Garage Expo.jpg';
import jazz from '../assets/jazz night.jpg';
import champions from '../assets/champions league.jpg';
import zoya from '../assets/Zoya.jpg';
import MobilePhone from '../components/MobilePhone';
import techEvent from '../assets/Tech Event.jpg';
import kebero from '../assets/Kebero.jpg';
import screenshoot from '../assets/Image (1).png'
import playstore from '../assets/PlayStore.webp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faApple } from '@fortawesome/free-brands-svg-icons';
import { faArrowCircleDown, faDownload } from '@fortawesome/free-solid-svg-icons';
import myTraveller from '../assets/myTraveller.png';
import Traveller10 from '../assets/traveller10.png';
import Footer from '../components/Footer';
import Typed from 'typed.js';

function LandingPage({isLoggedIn}) {

  const navigate = useNavigate();
  const handleClick = (isLoggedIn) => {
    isLoggedIn? navigate('/home') : navigate('/register');
    
  };
  
  const cardData = [
    {
      image: cardImage1,
      title: "1 day in Entoto Park",
      price: "2000 ",
      features: ["Transportation", "Lunch and Dinner", "Sleeping Room"],
    },
    {
      image: cardImage2,
      title: "Kuriftu Water Park",
      price: "1500 ",
      features: ["Transportation", "Lunch", "Swimming pools"],
    },
    {
      image: cardImage3,
      title: "2 day in Wenchi Lodge",
      price: "5500 ",
      features: ["Transportation", "Lunch", "Room & swimming pools"],
    },
  ];

  const sampleProducts = [
    {
      Title: 'Find best deals',
      Description: 'Compare prices & book flights to your favourite destination',
      image: ethiopianAirlines,
    },
    {
      Title: 'Fly with comfort',
      Description: 'Enjoy in-flight services & comfortable seating',
      image: girum,
    },
    {
      Title: 'Travel with Ease',
      Description: 'Easy booking and hassle-free travel experiences',
      image: ethiopianairline2,
    },
    {
      Title: 'Cozy Cabins',
      Description: 'Relax and Unwind in a Serene Enviroment',
      image: cabin,
    },
    {
      Title: 'Beachside Resorts',
      Description: 'Stay right by the ocean with stunning views',
      image: kuriftu,
    },
    {
      Title: 'Luxury Hotels',
      Description: 'Experience the best in comfort and amenities',
      image: skyLight,
    },
    {
      Title: 'Relax by the Gentle Flow of the River',
      Description: 'Explore the rich landscape and stunning views of Ethiopia',
      image: wenchiCarter,
    },
    {
      Title: 'Unbeatable Package Deals',
      Description: 'Get the best deals on travel packages and save big',
      image: friendship,
    },
    {
      Title: 'Water Park Adventures',
      Description: 'Enjoy fun-filled days at the best water parks',
      image: cardImage2,
    },
    {
      Title: 'Reliable Ride Service',
      Description: 'Experience comfort and reliability with our ride service',
      image:changan,
    },
    {
      Title: 'Hassle-Free Rides Between Cities',
      Description: 'Travel with experienced drivers to different cities',
      image: expressWay,
    },
    {
      Title: 'Ride in Style',
      Description: 'Enjoy luxury and comfort in our premium vehicles',
      image: tesla,
    },
  ];
  
  const sampleItems = [
    {
      image: kirunfud,
      title: 'Kirunfud Events',
    },
    {
      image: bk,
      title: 'BK ON DA TRACK',
    },
    {
      image: Garage,
      title: 'Garage Expo',
    },
    {
      image: jazz,
      title: 'Jazz Night',
    },
    {
      image: champions,
      title: 'Champions league',
    },
    {
      image: zoya,
      title: 'Zoya',
    },
    {
      image: techEvent,
      title: 'Tech event',
    },
    {
      image: kebero,
      title: 'Kebero Event',
    },

  ];
  const nextSectionRef = useRef(null);
  const typedRef = useRef(null);
  
  const scrollToNextSection = () => {
    window.scrollTo({
      top: nextSectionRef.current.offsetTop,
      behavior: 'smooth'
    });}

    useEffect(() => {
      const typed = new Typed(typedRef.current, {
        strings: ["book your Flights", "book your Rides", "book your Event", "Create Your Own Package and more!"],
        typeSpeed: 50,
        backSpeed: 50,
        backDelay: 1000,
        showCursor:false,
        loop:true,
      });
      return () => {
        typed.destroy();
      };
    }, []);
    

  return (
    <div className='flex flex-col w-full min-h-screen '>
      <div className='flex flex-col justify-center items-center w-full min-h-screen bg-background1 bg-cover'>
        <div className='w-full flex flex-col text-center items-center justify-center h-1/3 mb-14'>
          <h1 className='text-4xl text-orange-800 font-semibold w-full'>Discover Your Adventure</h1>
          <span ref={typedRef} className='text-white text-xl inline-block' ></span>
          <button className="bg-orange-800 text-white font-bold p-2 mt-6 rounded-xl w-1/12" onClick={handleClick}> Get Started </button>
        </div>
        <FontAwesomeIcon icon={faArrowCircleDown} className='absolute bottom-0 mb-2 h-10 text-orange-800' onClick={scrollToNextSection}/>
      </div>

      <div ref={nextSectionRef} className="w-full max-h-[90vh] justify-center items-center font-light relative px-24 bg-gray-100 pb-72">
        <h2 className='text-center text-2xl pt-14 pb-5 text-black font-serif'>
          Enjoy travelling to the peak with us.
        </h2>
        <CircularCarousel products={sampleProducts} />
      </div>

      <div className="w-full justify-center items-center font-light bg-white">
        <h2 className='text-center text-2xl pt-5 text-black font-serif pb-5'>
          Discover the beauty of exotic destinations with best values in our Top Packages.
        </h2>
        <PricingCards cardData={cardData} />
      </div>

      <div className='flex flex-col justify-center items-center w-full  bg-cover px-10 py-4'>
        <h2 className='text-center text-4xl font-light p-10 pt-3 text-black font-serif'>
          Trending Events This Week
        </h2>
        <div className='w-full'>
          <EventDisplay items={sampleItems} />
        </div>
        </div>

      <div className='w-full bg-gradient-to-bl from-orange-200 to-red-300'>
        <div className='flex justify-center items-center w-full pt-6 '>
            <FontAwesomeIcon icon={faDownload} className='mr-3 h-8 text-white' />
            <h2 className='text-center text-4xl font-thin text-black font-serif'>
              Download the App
            </h2>
            <FontAwesomeIcon icon={faDownload}  className='ml-3 h-8 text-white' />
        </div>
        <div className='flex justify-center items-center'>
        <div className=' w-4/12 h-96  flex items-end justify-end mt-24'>
        <img src={Traveller10} alt="traveller"  className="object-contain h-full "/>
        </div>

          <div className='flex flex-col justify-center items-center w-2/3  bg-cover '>
          <div className='w-full  flex '>
            <div className='w-1/2  flex flex-col items-center mt-28 pl-48'>
              
              <div className='ml-auto py-2 px-8 mb-9 rounded-md bg-gray-900 flex justify-center items-center shadow-md shadow-black' onClick={() => navigate('/downloadPage') }>
                <img className='w-14 h-18 object-cover' src={playstore} alt='screenshot' />
                <div className='flex flex-col text-center  text-white ml-10 mr-6' >
                <p className='text-sm'> GET IT ON</p>
                <p className='text-xl'>Google Play</p>
              </div>
              </div>

              <div className=' ml-auto py-2 px-8 mb-2 rounded-md bg-gray-900 flex justify-center items-center shadow-md shadow-black' onClick={() => navigate('/downloadPage') }>
                <FontAwesomeIcon icon={faApple} style={{color: "#ffffff",}} className='w-14 h-16 object-cover'/>
                <div className='flex flex-col text-center  text-white ml-10 mr-6' >
                  <p className='text-sm'> GET IT ON</p>
                  <p className='text-xl'>Apple Store</p>
                </div>
                </div>
              </div>

            <div className='w-1/2  flex flex-col justify-start items-start mt-10 ml-10'>
              <MobilePhone image={screenshoot} />
            </div>
        </div>
      </div>
        </div>

      </div>
      <div className='w-full bg-gray-900'>
        <Footer/>
      </div>
    </div>
    
  );}

export default LandingPage;
