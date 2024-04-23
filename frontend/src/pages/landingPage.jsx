import React from 'react'
import Navigation from '../components/Navigation'
import { useNavigate } from 'react-router-dom'
import PricingCards from '../components/pricingCard';
import cardImage1 from '../assets/entoto 2.jpg'
import cardImage2 from '../assets/kuriftu-water-park.jpg'
import cardImage3 from '../assets/wenchi 2.webp'

function landingPage({isLoggedIn}) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();
    const handleClick = () =>{
        navigate('/register')
    }
    
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
          features: ["Transportation", "Lunch","Swimming pools"],
        },
        {
          image: cardImage3,
          title: "2 day in Wenchi Lodge",
          price: "5500 birr",
          features: ["Transportation", "Lunch","Room & swimming pools"],
        },
      ];


  return (
    <div className='flex flex-col w-full min-h-screen '>
        <Navigation list={['Home','Flights','Rooms','Rides','Dinning','Events']} title='Exopia' islogged={isLoggedIn}/>
        <div className='flex flex-col justify-center items-center w-full min-h-screen bg-background1 bg-cover'>
            <div className='w-full flex flex-col text-center items-center justify-center h-1/3'>
                <h1 className='text-4xl text-orange-600 font-bold w-full'>Discover Your Adventure </h1>
                <p className='text-white text-xl'> book your flights,rides,dinning,events and more!</p>
                <button className="bg-orange-600 text-white font-bold py-2 px-2 mt-6 rounded-xl w-1/12" onClick={handleClick}>Get Started</button>
            </div>
        </div>
        <div className= "w-full h-screen  justify-center items-center font-light" >
            <h2 className='text-center text-2xl pt-5 '>
            Discover the beauty of exotic destinations with best values in our Top Packages.
            </h2>
            <PricingCards cardData={cardData}/>
        </div>
    </div>
  )
}

export default landingPage
