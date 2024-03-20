const axios = require('axios');
const Restaurant = require('../models/diningModel');

async function getDiningPrices(restaurants) {
    try {
        const pricingPromises = restaurants.map(async (restaurant) => {
            try {
                const externalId = restaurant.externalId;
                const externalApiResponse = await axios.get(`https://my-json-server.typicode.com/beki-kel/Restaurants/restaurant/${externalId}`);
                const { price, availableTable } = externalApiResponse.data;

                await Restaurant.updateOne({ externalId: restaurant.externalId }, { price , availableTable  });

                return { ...restaurant.toObject(), price };
            } catch (error) {
                console.error(`Error fetching details for restaurant ${restaurant.externalId}:`, error.message);
                return { ...restaurant.toObject(), price: null, availableTable:null };
            }
        });

        return Promise.all(pricingPromises);
    } catch (error) {
        console.error('Error in getDiningPrices:', error.message);
        throw error; // Rethrow the error to indicate a problem with the entire operation
    }
}

module.exports = { getDiningPrices };

