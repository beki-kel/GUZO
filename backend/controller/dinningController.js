const Restaurant = require('../models/diningModel');
const diningApiService = require('./externalDinningController');

const searchFilterDinning = async (req, res) => {
  try {
    const query = req.body.name;
    const cuisineType = req.body.cuisineType;
    const minPrice = req.body.minPrice;
    const maxPrice = req.body.maxPrice;

    // Retrieve real-time pricing and availability information from external API
    const localResults = await Restaurant.find({
      ...(query && { name: { $regex: query, $options: 'i' } }),
      ...(cuisineType && { cuisine: { $regex: cuisineType, $options: 'i' } }),
    });

    const resultsWithDetails = await diningApiService.getDiningPrices(localResults);

    // Apply minPrice and maxPrice filters after fetching prices
    const filteredResults = resultsWithDetails.filter(restaurant => {
      if (minPrice !== undefined && restaurant.price < minPrice) {
        return false;
      }
      if (maxPrice !== undefined && restaurant.price > maxPrice) {
        return false;
      }
      return true;
    });

    // Send the filtered results to the client
    res.json(filteredResults);
  } catch (error) {
    console.error('Error searching restaurants:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

module.exports = { searchFilterDinning };
