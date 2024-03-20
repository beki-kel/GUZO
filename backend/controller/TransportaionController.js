const Car = require('../models/transportationModel');
const getRidePrices = require('./externalTransportController');
const distanceController = require('./mapBoxDistance');

const searchRide = async (req, res) => {
    try {
        const cars = await Car.find(); // Example query, adjust as needed

        // Ensure cars is an array
        if (!Array.isArray(cars)) {
            throw new Error('Cars is not an array');
        }
        const { currentLocation, destination } = req.body;

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
}

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
}


module.exports = searchRide
