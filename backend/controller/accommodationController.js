const Hotel = require('../models/AccommodationModel');
const hotelApiService = require('./externalAccommodationController');

const searchFilter = async (req, res) => {
  try {
    const query = req.body.name;
    const accommodationType = req.body.accommodationType;
    const minPrice = parseInt(req.body.minPrice, 10); // Parse minPrice to integer with radix 10
    const maxPrice = parseInt(req.body.maxPrice, 10); // Parse maxPrice to integer with radix 10
    
    // it filters the Hotel data. if query has been received from the body it will check and 
    // make comparision without case sensetivity option: "i" and regex is for normal comparision of strings
    const localResults = await Hotel.find({
      ...(query && { name: { $regex: query, $options: 'i' } }),
      ...(accommodationType && { accommodationType }),
    });

    
    // Retrieve real-time pricing and availability information from external API
    const resultsWithDetails = await hotelApiService.getHotelPrices(localResults);

    const filteredResults = resultsWithDetails.filter(hotel => {
      if (minPrice !== undefined && minPrice !== null && hotel.pricing.amount < minPrice) {
        return false;
      }
      if (minPrice !== undefined && minPrice !== null && hotel.pricing.amount > maxPrice) {
        return false;
      }
      return true;
    });

    // Send the combined results to the client
    res.json(filteredResults);
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

const updateHotelRating=async(req,res,next) =>{
  try{
    const hotel = await Hotel.findById(req.params.id);
    const oldRatingSum = hotel.userRating * hotel.totalratings;
    const newUserRating = req.body.userRating;

    hotel.totalratings += 1;
    hotel.userRating = (oldRatingSum + newUserRating) / hotel.totalratings;
    await hotel.save();
    res.status(200).json({message:'Hotel rating updated successfully',hotel})
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

const deleteAccommodation = (req, res,next) =>{
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
  updateHotelRating,
  updateAccommodation,
  deleteAccommodation,
};


