const axios = require('axios');

const distanceController = async (req, res) => {
    const { currentLocation, destination } = req.body;

    try {
        if (!currentLocation || !destination) {
            throw new Error('Please provide both currentLocation and destination.');
        }

        // Get coordinates for current location
        const currentLocationCoords = await getLocationCoordinates(currentLocation);
        // Get coordinates for destination
        const destinationCoords = await getLocationCoordinates(destination);

        // Calculate distance between coordinates using Haversine formula
        const straightLineDistance = calculateDistance(currentLocationCoords, destinationCoords);

        // Calculate road distance and travel time using Mapbox Directions API
        const { roadDistance, travelTime } = await calculateRoadDistanceAndTime(currentLocationCoords, destinationCoords);


        // Send response to the client
        res.json({
            straightLineDistance,
            roadDistance,
            travelTime,
        });
        
    } catch (error) {
        console.error('Error calculating distance:', error.message);
        if (error.response && error.response.data && error.response.data.message) {
            // If the error is from the Mapbox API response
            res.status(400).json({ error: error.response.data.message });
        } else {
            // For other errors
            res.status(500).json({ error: 'Failed to calculate distance' });
        }
    }
}

// Function to calculate road distance and travel time using Mapbox Directions API
async function calculateRoadDistanceAndTime(originCoords, destinationCoords) {
    const apiKey = process.env.MAPBOX_ACCESS_TOKEN;
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${originCoords.longitude},${originCoords.latitude};${destinationCoords.longitude},${destinationCoords.latitude}?access_token=${apiKey}`;

    try {
        const response = await axios.get(url);
        const route = response.data.routes[0];
        const roadDistance = route.distance / 1000; // Convert meters to kilometers
        const travelTime = route.duration / 3600; // Convert seconds to minutes
        return { roadDistance, travelTime };
    } catch (error) {
        throw new Error('Failed to calculate road distance and travel time: ' + error.message);
    }
}

// Function to get coordinates from Mapbox API
async function getLocationCoordinates(location) {
    const apiKey = process.env.MAPBOX_ACCESS_TOKEN;
    const encodedLocation = encodeURIComponent(location.trim()); // Trim whitespace and encode URI
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedLocation}.json?bbox=32.997734,-4.070008,47.982379,14.959431&access_token=${apiKey}`;

    try {
        const response = await axios.get(url);
        const features = response.data.features;
        if (features.length === 0) {
            throw new Error('Location not found');
        }

        // Assume the first result is the most relevant one
        const [longitude, latitude] = features[0].center;
        return { latitude, longitude };
    } catch (error) {
        throw new Error('Failed to get coordinates: ' + error.message);
    }
}


// Function to calculate distance between two coordinates using Haversine formula
function calculateDistance(coord1, coord2) {
    const earthRadius = 6371; // Radius of the Earth in kilometers
    const { latitude: lat1, longitude: lon1 } = coord1;
    const { latitude: lat2, longitude: lon2 } = coord2;

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadius * c;
    return distance;
}

function toRadians(degrees) {
    return degrees * Math.PI / 180;
}


module.exports = distanceController;