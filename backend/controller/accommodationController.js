const express = require('express');
const Hotel = require('../models/AccommodationModel');
const hotelApiService = require('./externalAccommodationController');

const searchFilter = async (req, res) => {
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

const addAccommodation = async (req, res,next) => {
  try{
    const newHotel = new Hotel({
      externalId: req.body.externalId,
      name: req.body.name,
      city:req.body.city,
      location: req.body.location,
      accommodationType: req.body.type,
      description:req.body.description,
      image: req.body.image,
      rating:req.body.rating
    })

    await newHotel.save()
    res.status(201).json({ message: 'hotel added successfully', hotel:newHotel })
 }catch(error){
  next(error)
 }
};

const updateRating=async(req,res,next) =>{
  try{
    const hotel = await Hotel.findById(req.params.id);
    hotel.userRating = req.body.userRating;
    await hotel.save();
    res.status(200).json({message:'rating updated successfully',hotel})
  }catch(error){
    next(error)
  }
}

const updateAccommodation=async (req,res,next)=>{
  try{
    const hotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body},
      { new: true });
    res.status(200).json({message:'Hotel Updated Successfully', hotel})
  }catch(error){
    next(error)
  }
}

const deleteAccommodation = (req, res) =>{
  try{
    Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json({message:'hotel deleted successfully'})
  }catch(error){
    next(error)
  }
}


module.exports = {
  searchFilter,
  addAccommodation,
  updateRating,
  updateAccommodation,
  deleteAccommodation,
};


