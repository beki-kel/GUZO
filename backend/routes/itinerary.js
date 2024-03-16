const express = require("express");
const router = express.Router();
const {itineraryuserData, itinerary, createItinerary} = require('../controller/itineraryController')
//this is for basic user data
router.put('/itinerary/userdata/:userId', itineraryuserData)
//this is for booking and main itinerary things
router.put('/itinerary/:userId', itinerary)
//this is for creating plan
router.post('/createItinerary/:userId', createItinerary)

module.exports = router