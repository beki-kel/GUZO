const express = require('express');
const {searchFilter} = require('../controller/accommodationController');
const {addAccommodation} = require('../controller/accommodationController');
const {updateRating} = require('../controller/accommodationController');
const {updateAccommodation} = require('../controller/accommodationController');
const {deleteAccommodation} = require('../controller/accommodationController');

const router = express.Router();

router.get('/search/filter', searchFilter);
router.post('/add/Accommodation', addAccommodation);
router.put('/update/rating/:id', updateRating);
router.put('/update/accommodation/:id', updateAccommodation);
router.delete('/delete/accommodation/:id', deleteAccommodation);
module.exports = router;
