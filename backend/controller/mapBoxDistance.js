const axios = require('axios');

async function distanceController(currentLocation, destination) {
    try {
        // Get coordinates for current location
        const currentLocationCoords = await getLocationCoordinates(currentLocation);
        // Get coordinates for destination
        const destinationCoords = await getLocationCoordinates(destination);

        // Calculate distance between coordinates using Haversine formula
        const straightLineDistance = calculateDistance(currentLocationCoords, destinationCoords);

        // Calculate road distance and travel time using Mapbox Directions API
        const { roadDistance, travelTime } = await calculateRoadDistanceAndTime(currentLocationCoords, destinationCoords);

        return {
            straightLineDistance,
            roadDistance,
            travelTime,
        };
    } catch (error) {
        console.error('Error calculating distance:', error.message);
        throw error;
    }
}

async function calculateRoadDistanceAndTime(originCoords, destinationCoords) {
    const apiKey = process.env.MAPBOX_ACCESS_TOKEN;
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${originCoords.longitude},${originCoords.latitude};${destinationCoords.longitude},${destinationCoords.latitude}?access_token=${apiKey}`;

    try {
        const response = await axios.get(url);
        const route = response.data.routes[0];
        const roadDistance = route.distance / 1000;
        const travelTime = route.duration / 3600;
        return { roadDistance, travelTime };
    } catch (error) {
        throw new Error('Failed to calculate road distance and travel time: ' + error.message);
    }
}

async function getLocationCoordinates(location) {
    const apiKey = process.env.MAPBOX_ACCESS_TOKEN;
    const encodedLocation = encodeURIComponent(location.trim());
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedLocation}.json?bbox=32.997734,-4.070008,47.982379,14.959431&access_token=${apiKey}`;

    try {
        const response = await axios.get(url);
        const features = response.data.features;
        if (features.length === 0) {
            throw new Error('Location not found');
        }

        const [longitude, latitude] = features[0].center;
        return { latitude, longitude };
    } catch (error) {
        throw new Error('Failed to get coordinates: ' + error.message);
    }
}

function calculateDistance(coord1, coord2) {
    const earthRadius = 6371;
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
