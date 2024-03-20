const express = require('express');
const {searchFilter} = require('../controller/accommodationController');
const {addAccommodation} = require('../controller/accommodationController');
const {updateHotelRating} = require('../controller/accommodationController');
const {updateAccommodation} = require('../controller/accommodationController');
const {deleteAccommodation} = require('../controller/accommodationController');

const router = express.Router();

router.get('/search/filter/Accomadation', searchFilter);
router.post('/add/Accommodation', addAccommodation);
router.put('/update/Accomdation/rating/:id', updateHotelRating);
router.put('/update/accommodation/:id', updateAccommodation);
router.delete('/delete/accommodation/:id', deleteAccommodation);
module.exports = router;
