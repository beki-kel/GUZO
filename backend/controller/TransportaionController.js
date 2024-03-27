const Hotel = require('../models/AccommodationModel');
const Car = require('../models/transportationModel');
const getRidePrices = require('./externalTransportController');
const distanceController = require('./mapBoxDistance');

const searchRide = async (req, res) => {
    try {
        const { currentLocation, destination } = req.body;
        
        const cars = await Car.find({
            $and: [
                { pickUp: currentLocation },
                { dropOff: destination }
            ]
        });

        // Ensure cars is an array
        if (!Array.isArray(cars)) {
            throw new Error('Cars is not an array');
        }
        

        if (!currentLocation || !destination) {
            throw new Error('Please provide both currentLocation and destination.');
        }

        const response = await distanceController(currentLocation, destination);
        const distance = response.roadDistance;

        const pricingInfo = await getRidePrices(cars, distance);

        // Filter the pricingInfo based on the request criteria
        const filteredResults = searchFilter(req.body, pricingInfo);

        res.json(filteredResults);
    } catch (error) {
        console.error('Error searching ride:', error.message);
        res.status(500).json({ error: 'Failed to search ride' });
    }
};

const searchFilter = (filterParams, cars) => {
    const { Passengers, minPrice, maxPrice,minRating} = filterParams;
    let filteredResults = [...cars]; // Create a copy of the array

    if (Passengers) {
        filteredResults = filteredResults.filter(car => car.capacity >= Passengers);
    }
    if(minRating){
        filteredResults = filteredResults.filter(car => car.driverrating >= minRating);
    }

    if (minPrice !== undefined) {
        filteredResults = filteredResults.filter(car => car.finalPrice >= minPrice);
    }

    if (maxPrice !== undefined) {
        filteredResults = filteredResults.filter(car => car.finalPrice <= maxPrice);
    }

    return filteredResults;
};

const addTransportation= async (req, res,next) =>{
    try{
        const newTransportaion= new Car({
            externalId : req.body.externalId ,
            brand: req.body.brand, 
            owner: req.body.owner,
            plateNo: req.body.plateNo,
            color:req.body.color,
            capacity: req.body.capacity,
            numberOfPassengers:req.body.numberOfPassengers,
            driverID:req.body.driverID,
            drivername:req.body.drivername,
        })
    
        await newTransportaion.save()
        res.status(201).json({ message: 'transportaion added successfully', transportaion:newTransportaion })
    }catch(error){
        next(error)
    }

};

const updateDriverRating = async (req, res, next) => {
    try {
        const car = await Car.findById(req.params.id);
        const oldRatingSum = car.driverrating * car.totalratings;
        const userRating = req.body.userRating;
        
        // Update total ratings and rating sum
        car.totalratings += 1;
        car.driverrating = (oldRatingSum + userRating) / car.totalratings;
        
        await car.save();
        
        res.status(200).json({ message: 'Driver rating updated successfully', car });
    } catch (error) {
        next(error);
    }
}

const updateTransportation= async (req,res,next) => {
try{
    const car =await Car.findByIdAndUpdate(
        req.params.id,
        { $set: req.body},
        { new: true })

        res.status(200).json({message:'Transoprtation Updated Successfully', car})
}catch(error) {
    next(error)
}
}

const deleteTransportation=async (req, res, next) => {
    try {
        const car = await Car.findByIdAndDelete(req.params.id);
        res.status(200).json({message:'transportaion deleted successfully'})
    } catch (error) {
        next(error);
    }
}



module.exports = {
    searchRide,
    addTransportation,
    updateDriverRating,
    updateTransportation,
    deleteTransportation
}
