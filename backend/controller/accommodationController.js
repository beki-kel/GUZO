const Hotel = require('../models/AccommodationModel');
const hotelApiService = require('./externalAccommodationController');

const searchFilter = async (req, res) => {
  try {
    const query = req.body.name;
    const city = req.body.stayLocation; // Add city filter
    const location = req.body.Location; // Add location filter
    const accommodationType = req.body.accommodation;
    const minPrice = parseInt(req.body.minPrice, 10);
    const maxPrice = parseInt(req.body.maxPrice, 10);
    const numOfPersons = parseInt(req.body.stayTravllers, 10);
    const amenities = req.body.amenities; // Array of desired amenities
    const roomType = req.body.roomType; // Desired room type
    const totalRating = parseInt(req.body.rating);// Add total rating filter

    const localResults = await Hotel.find({
      ...(query && { name: { $regex: query, $options: 'i' } }),
      ...(city && { city }), // Filter by city
      ...(location && { location }), // Filter by location
      ...(accommodationType && { accommodationType }),
      ...(numOfPersons && { 'rooms.capacity': { $gte: numOfPersons } }),
      ...(amenities && { 'rooms.amenities': { $all: amenities } }), // Filter by amenities
      ...(roomType && { 'rooms.type': roomType }), // Filter by room type
      ...(totalRating && { 'rating': { $gte: totalRating } }) // Filter by total rating
    });

    res.json(localResults );
  } catch (error) {
    console.error('Error searching hotels:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};


// Function to add a new accommodation
const addAccommodation = async (req, res, next) => {
  try {
    const newHotel = new Hotel({
      externalId: req.body.externalId,
      name: req.body.name,
      city: req.body.city,
      location: req.body.location,
      accommodationType: req.body.accommodationType,
      description: req.body.description,
      image: req.body.image,
      rating: req.body.rating,
      rooms: req.body.rooms // Array of room objects
    });

    await newHotel.save();
    res.status(201).json({ message: 'Hotel added successfully', hotel: newHotel });
  } catch (error) {
    next(error);
  }
};

// Function to update hotel rating
const updateHotelRating = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const oldRatingSum = hotel.userRating * hotel.totalratings; // Corrected property name
    const newUserRating = req.body.userRating;
    
    hotel.totalratings += 1; // Corrected property name
    hotel.userRating = (oldRatingSum + newUserRating) / hotel.totalratings;
    await hotel.save();
    res.status(200).json({ message: 'Hotel rating updated successfully', hotel });
  } catch (error) {
    next(error);
  }
};

// Function to update an accommodation
const updateAccommodation = async (req, res, next) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({ message: 'Hotel updated successfully', hotel });
  } catch (error) {
    next(error);
  }
};

// Function to delete an accommodation
const deleteAccommodation = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Hotel deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  searchFilter,
  addAccommodation,
  updateHotelRating,
  updateAccommodation,
  deleteAccommodation,
};
