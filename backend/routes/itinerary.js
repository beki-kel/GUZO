const express = require("express");
const router = express.Router();
const {itinerary, createItinerary} = require('../controller/itineraryController')
//this is for booking and main itinerary things
router.put('/itinerary/:userId', itinerary)
//this is for creating plan
router.post('/createItinerary/:userId', createItinerary)

module.exports = router