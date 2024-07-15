import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Placeholder } from 'rsuite';
import PricingCards from './pricingCard';
import cardImage from '../assets/wenchi.jpg';

function HomePricingCard() {
    const [cardData, setCardData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const fetchCards = async () => {
            const trending = true;
            try {
                const response = await axios.post('https://guzo-x4ue.onrender.com/search/packages', { trending });
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
        <div className='w-full flex flex-col justify-center items-center my-5'>
            <p className="text-4xl font-serif font-medium text-black w-full text-center mb-6">Our Trending Packages</p>
            {loading && (
                <div className='w-full flex p-10'>
                    <Placeholder.Graph active />
                </div>
            )}
            {!loading && cardData.length > 0 && <PricingCards cardData={cardDataReal(cardData, cardImage)} />}

            <button className='px-10 py-6 rounded-2xl text-orange-600 text-lg font-medium border-2 bg-white shadow-lg mt-[-2rem] mb-10 hover:opacity-85 hover:shadow-2xl'> Create Your Own Package </button>
        </div>
    );
}

export default HomePricingCard;
