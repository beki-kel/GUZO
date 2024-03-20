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

const addRestaurant = async (req, res, next) => {
  try {
    const newRestaurant = new Restaurant({
      externalId: req.body.externalId,
      name: req.body.name,
      cuisine: req.body.cuisine,
      address: req.body.address,
      openingHours: req.body.openingHours
    });

    await newRestaurant.save();
    res.status(201).json({ message: 'Restaurant added successfully', restaurant: newRestaurant });
  } catch (error) {
    next(error);
  }
};

const updateRestaurantRating = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    const oldRatingSum = restaurant.rating * restaurant.totalratings;
    const newUserRating = req.body.userRating;

    restaurant.totalratings += 1;
    restaurant.rating = (oldRatingSum + newUserRating) / restaurant.totalratings;
    await restaurant.save();
    res.status(200).json({ message: 'Restaurant rating updated successfully', restaurant });
  } catch (error) {
    next(error);
  }
};

const updateRestaurant = async (req, res, next) => {
  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({ message: 'Restaurant updated successfully', restaurant: updatedRestaurant });
  } catch (error) {
    next(error);
  }
};

const deleteRestaurant = async (req, res, next) => {
  try {
    await Restaurant.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Restaurant deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { searchFilterDinning,
  addRestaurant,
  updateRestaurantRating,
  updateRestaurant,
  deleteRestaurant
  };
