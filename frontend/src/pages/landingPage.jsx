import React from 'react';
import Navigation from '../components/Navigation';
import { Navigate, useNavigate } from 'react-router-dom';
import PricingCards from '../components/pricingCard';
import cardImage1 from '../assets/entoto 2.jpg';
import cardImage2 from '../assets/kuriftu-water-park.jpg';
import cardImage3 from '../assets/wenchi 2.webp';
import ethiopianAirlines from '../assets/Ethiopian_Airlines.jpg';
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
import screenshoot from '../assets/Image (1).png'
import playstore from '../assets/PlayStore.webp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faApple } from '@fortawesome/free-brands-svg-icons';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import myTraveller from '../assets/myTraveller.png';
import Traveller10 from '../assets/traveller10.png';
import Footer from '../components/Footer';

function LandingPage({ isLoggedIn }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/register');
  };
  
  const cardData = [
    {
      image: cardImage1,
      title: "1 day in Entoto Park",
      price: "2000 birr",
      features: ["Transportation", "Lunch and Dinner", "Sleeping Room"],
    },
    {
      image: cardImage2,
      title: "Kuriftu Water Park",
      price: "1500 birr",
      features: ["Transportation", "Lunch", "Swimming pools"],
    },
    {
      image: cardImage3,
      title: "2 day in Wenchi Lodge",
      price: "5500 birr",
      features: ["Transportation", "Lunch", "Room & swimming pools"],
    },
  ];

  const sampleProducts = [
    {
      Title: 'Find best deals',
      Description: 'compare prices & book flights to your favourite destination',
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
      image: ethiopianAirlines,
    },
    {
      Title: 'Ad 1',
      Description: '100',
      image: cardImage2,
    },
    {
      Title: 'Ad 1',
      Description: '100',
      image: cardImage2,
    },
    {
      Title: 'Ad 1',
      Description: '100',
      image: cardImage2,
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
      image: kirunfud,
      title: 'Kirunfud Events',
    },
    {
      image: Garage,
      title: 'Garage Expo',
    },

  ];

  return (
    <div className='flex flex-col w-full min-h-screen '>
      <Navigation list={['Home', 'Flights', 'Rooms', 'Rides', 'Dining', 'Events']} title='Exopia' islogged={isLoggedIn} />
      <div className='flex flex-col justify-center items-center w-full min-h-screen bg-background1 bg-cover'>
        <div className='w-full flex flex-col text-center items-center justify-center h-1/3'>
          <h1 className='text-4xl text-orange-600 font-bold w-full'>Discover Your Adventure</h1>
          <p className='text-white text-xl'>book your flights, rides, dining, events and more!</p>
          <button className="bg-orange-600 text-white font-bold py-2 px-2 mt-6 rounded-xl w-1/12" onClick={handleClick}>Get Started</button>
        </div>
      </div>

      <div className="w-full max-h-[90vh] justify-center items-center font-light relative px-24 bg-gray-50">
        <h2 className='text-center text-2xl pt-14 pb-5'>
          Enjoy travelling to the peak with us.
        </h2>
        <CircularCarousel products={sampleProducts} />
      </div>

      <div className='w-full bg-gray-50 py-20'>

        <div className='flex justify-center items-center w-full pt-6'>
            <FontAwesomeIcon icon={faDownload} style={{ color: "#ff622e" }} className='mr-3 h-8' />
            <h2 className='text-center text-4xl font-thin'>
              Download the App
            </h2>
            <FontAwesomeIcon icon={faDownload} style={{ color: "#ff622e" }} className='ml-3 h-8' />
        </div>
          <div className='flex justify-center items-center'>
          <div className=' w-4/12 h-96  flex items-end justify-end mt-24'>
           <img src={Traveller10} alt="traveller"  className="object-contain h-full "/>
          </div>

            <div className='flex flex-col justify-center items-center w-2/3  bg-cover '>
            <div className='w-full  flex '>
              <div className='w-1/2  flex flex-col items-center mt-28 pl-48'>
                
                <div className='ml-auto py-2 px-8 mb-9 rounded-md bg-black flex justify-center items-center shadow-md shadow-black' onClick={() => navigate('/downloadPage') }>
                  <img className='w-14 h-18 object-cover' src={playstore} alt='screenshot' />
                  <div className='flex flex-col text-center  text-white ml-10 mr-6' >
                  <p className='text-sm'> GET IT ON</p>
                  <p className='text-xl'>Google Play</p>
                </div>
                </div>

                <div className=' ml-auto py-2 px-8 mb-2 rounded-md bg-black flex justify-center items-center shadow-md shadow-black' onClick={() => navigate('/downloadPage') }>
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

      <div className='flex flex-col justify-center items-center w-full  bg-cover px-10 py-4'>
        <h2 className='text-center text-4xl font-light p-10 pt-3'>
          Trending Events This Week
        </h2>
        <div className='w-full'>
          <EventDisplay items={sampleItems} />
        </div>
      </div>

      <div className="w-full justify-center items-center font-light bg-white">
        <h2 className='text-center text-2xl pt-5'>
          Discover the beauty of exotic destinations with best values in our Top Packages.
        </h2>
        <PricingCards cardData={cardData} />
      </div>


      <div className='flex  w-full  bg-white bg-cover mt-14'>

        <div className='bg-background2 w-4/12 h-80 mt-16 flex items-end justify-end'>
          <img src={myTraveller} alt="traveller"  className="object-contain h-full mb-10"/>
        </div>
        <div className='bg-[#ffd1c1fa] w-8/12 h-80 mt-16 flex flex-col items-center justify-center'>
          <h2 className='text-center text-4xl font-meduim text-orange-600'>
            EXOPIA
          </h2>
          <p className=' text-center text-xl px-14 mt-2'> 
            Effortlessly plan your next adventure with Exopia, your ultimate travel companion. Our user-friendly platform lets you easily find and book flights, accommodations, rides, dining experiences, and events, all in one place.Start your adventure with Exopia today!
          </p>
        </div>
      </div>

      <div className='w-full bg-black'>
        <Footer/>
      </div>
    </div>


    
  );
}

export default LandingPage;
