import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Promotion = () => {
    // State to store the fetched promotion data
    const [promotions, setPromotions] = useState([]);

    // Function to fetch promotion data from the server
    const fetchPromotions = async () => {
        try {
            const response = await axios.get('/promotions'); // Assuming endpoint is '/api/promotions'
            setPromotions(response.data.promotions);
        } catch (error) {
            console.error('Error fetching promotions:', error);
        }
    };

    // Fetch promotion data when the component mounts
    useEffect(() => {
        fetchPromotions();
    }, []); // Empty dependency array ensures fetchPromotions is only called once

    return (
        <div className="promotion-container">
            <h1>This is promotion</h1>
            {promotions.map(promotion => (
                <div className="promotion" key={promotion._id}>
                    <div className="promotion-image"></div>
                    <div className="promotion-details">
                        <img src={promotion.imageUrl}/>
                        <h2>{promotion.title}</h2>
                        <p>{promotion.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Promotion;
