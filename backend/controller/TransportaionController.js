const Car = require('../models/transportationModel');
const getRidePrices = require('./externalTransportController');
const distanceController = require('./mapBoxDistance');

const searchRide = async (req, res) => {
    try {
        const { currentLocation, destination } = req.body;

        if (!currentLocation || !destination) {
            throw new Error('Please provide both currentLocation and destination.');
        }

        const response = await distanceController(currentLocation, destination);
        const distance = response.roadDistance;

        const pricingInfo = await getRidePrices(Car, distance);

        res.json(pricingInfo);
    } catch (error) {
        console.error('Error searching ride:', error.message);
        res.status(500).json({ error: 'Failed to search ride' });
    }
}

module.exports = searchRide;
