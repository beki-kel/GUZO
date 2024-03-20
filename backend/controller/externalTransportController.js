const axios = require('axios');
const Car = require('../models/transportationModel');
async function getRidePrices(cars, distance) {
  try {
      console.log('Cars:', cars); // Debugging statement
      if (!Array.isArray(cars)) {
          throw new Error('cars is not an array');
      }

      const pricingPromises = cars.map(async (car) => {
          try {
              const externalId = car.externalId;
              const externalApiResponse = await axios.get(`https://my-json-server.typicode.com/beki-kel/cars/car/${externalId}`);
              const { pricing } = externalApiResponse.data;

              const pricingAmount = pricing.amount;
              const finalPrice = calculatePrice(pricingAmount, distance);

              await Car.updateOne({ externalId: car.externalId }, { finalPrice });

              return { ...car.toObject(), finalPrice };
          } catch (error) {
              console.error(`Error fetching details for car ${car.externalId}:`, error.message);
              return { ...car.toObject(), finalPrice: null };
          }
      });

      return Promise.all(pricingPromises);
  } catch (error) {
      console.error('Error in getRidePrices:', error.message);
      throw error;
  }
}

function calculatePrice(pricingAmount, distance) {
  // Your pricing calculation logic here
  // Assuming pricing is linearly dependent on distance, you can simply multiply pricing amount by distance
  return pricingAmount * distance;
}

module.exports = getRidePrices;