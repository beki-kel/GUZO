import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Navigation from '../components/Navigation'
import HomePricingCard from '../components/HomePricingCard'
import axios from 'axios';
import { Placeholder } from 'rsuite';
import PricingCards from '../components/pricingCard';
import cardImage from '../assets/wenchi.jpg';


function Packages({isLoggedIn}) {
  const [cardDatas, setCardData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      setLoading(true);
      const fetchCards = async () => {
          const trending = true;
          try {
              const response = await axios.post('https://guzo-jet.vercel.app/search/packages');
              const data = response.data.packages;
              console.log(data);
              setCardData(data);
              setLoading(false);
          } catch (error) {
              console.error('Error fetching data:', error);
              setLoading(false);
          }
      };
      fetchCards();
  }, []);

  const cardDataReal = (cardData, cardImage) => {
    return cardData.map((card) => ({
        title: card.name,
        features: card.includes,
        price: card.price,
        image: cardImage
    }));
};

  return (
    <div className='flex flex-col w-full min-h-screen bg-white'>
        <Navigation list={['Home', 'Blog', 'Bookings', 'Packages']} title='Exopia' isLoggedIn={isLoggedIn} App={false} />
        <div className='w-full mt-24'>
        <HomePricingCard isLoggedIn={isLoggedIn}/>
        </div>

        <div className='w-full mb-24 flex flex-col'>
          <p className="text-4xl font-serif font-medium text-black w-full text-center mb-6">All Our Packages</p>
          {loading && (
                <div className='w-full flex p-10'>
                    <Placeholder.Graph active />
                </div>
            )}

          {!loading && cardDatas.length > 0 && <PricingCards cardData={cardDataReal(cardDatas, cardImage)} isLogged={isLoggedIn}/>}
        </div>
        <Footer/>
    </div>
  )
}

export default Packages
