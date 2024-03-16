const express = require('express');
const axios = require('axios');

const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN;

// Express router
const router = express.Router();

// Function to convert location name to coordinates using Mapbox Geocoding API
async function geocodeLocation(locationName) {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(locationName)}.json?access_token=${MAPBOX_ACCESS_TOKEN}`;
    
    try {
        const response = await axios.get(url);
        const data = response.data;
        
        // Extract coordinates from the response
        const coordinates = data.features[0].geometry.coordinates; // [longitude, latitude]
        return coordinates;
    } catch (error) {
        console.error('Error geocoding location:', error);
        return null;
    }
}

// Function to calculate distance using Mapbox Directions API
async function calculateDistance(origin, destination) {
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${origin};${destination}?access_token=${MAPBOX_ACCESS_TOKEN}`;
    
    try {
        const response = await axios.get(url);
        const data = response.data;
        
        // Extract distance from the response
        const distance = data.routes[0].distance; // Distance in meters
        
        // Convert distance to miles
        const distanceInMiles = distance * 0.000621371; // Conversion factor from meters to miles
        
        return distanceInMiles;
    } catch (error) {
        console.error('Error calculating distance:', error);
        return null;
    }
}

const distanceController = async (req, res) => {
    try {
        const { originName, destinationName } = req.body;
        
        // Geocode origin and destination names to get coordinates
        const originCoordinates = await geocodeLocation(originName);
        const destinationCoordinates = await geocodeLocation(destinationName);
        
        if (originCoordinates && destinationCoordinates) {
            // Calculate distance between coordinates
            const distance = await calculateDistance(originCoordinates.join(','), destinationCoordinates.join(','));
            
            // Prepare JSON response
            const jsonResponse = {
                origin: originName,
                destination: destinationName,
                distance: distance.toFixed(2) + ' miles'
            };
            
            // Return JSON response
            res.json(jsonResponse);
        } else {
            res.status(400).json({ error: 'Unable to geocode one or both locations' });
        }
    } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
module.exports = { distanceController };
