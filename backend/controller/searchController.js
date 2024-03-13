const express = require('express');
const Hotel = require('../models/AccommodationModel');
const hotelApiService = require('../controller/externalAccommodationController');

const search = async (req, res) => {
  try {
    const query = req.body.name;
    const accommodationType = req.body.accommodationType;
    const minPrice = req.body.minPrice;
    const maxPrice = req.body.maxPrice;

    // Build the search query based on the user's input
    const searchQuery = {
      ...(query && { name: { $regex: query, $options: 'i' } }),
      ...(accommodationType && { accommodationType }),
      ...(minPrice && maxPrice && { 'pricing.amount': { $gte: minPrice, $lte: maxPrice } }),
    };

    // Search local database for matching hotels
    const localResults = await Hotel.find(searchQuery);

    // Retrieve real-time pricing and availability information from external API
    const resultsWithDetails = await hotelApiService.getHotelPrices(localResults);

    // Send the combined results to the client
    res.json(resultsWithDetails);
  } catch (error) {
    console.error('Error searching hotels:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

module.exports = search;
