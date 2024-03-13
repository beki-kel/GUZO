const axios = require('axios');
const Hotel = require('../models/AccommodationModel');

async function getHotelPrices(hotels) {
  try {
    const pricingPromises = hotels.map(async (hotel) => {
      try {
        const externalId = hotel.externalId;
        const externalApiResponse = await axios.get(`https://my-json-server.typicode.com/beki-kel/Hotels/hotel/${externalId}`);
        const { pricing, availability } = externalApiResponse.data;

        await Hotel.updateOne({ externalId: hotel.externalId }, { pricing, availability });

        return { ...hotel.toObject(), pricing, availability };
      } catch (error) {
        console.error(`Error fetching details for hotel ${hotel.externalId}:`, error.message);
        return { ...hotel.toObject(), pricing: null, availability: null };
      }
    });

    return Promise.all(pricingPromises);
  } catch (error) {
    console.error('Error in getHotelPrices:', error.message);
    throw error; // Rethrow the error to indicate a problem with the entire operation
  }
}

module.exports = { getHotelPrices };
