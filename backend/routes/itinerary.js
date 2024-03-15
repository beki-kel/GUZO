const express = require("express");
const router = express.Router();
const itinerary = require('../controller/itineraryController')

router.put('/itinerary/:userId', itinerary)

module.exports = router