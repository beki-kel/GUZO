const express = require('express');
const {searchFilter} = require('../controller/accommodationController');
const {addAccommodation} = require('../controller/accommodationController');
const {updateHotelRating} = require('../controller/accommodationController');
const {updateAccommodation} = require('../controller/accommodationController');
const {deleteAccommodation} = require('../controller/accommodationController');
const {verifyUser,verifyAdmin} = require('../utils/verifyToken');

const router = express.Router();

router.get('/search/filter/Accomadation',  searchFilter);
router.post('/add/Accommodation',verifyAdmin, addAccommodation);
router.put('/update/Accomdation/rating/:id',verifyUser, updateHotelRating);
router.put('/update/accommodation/:id',verifyAdmin, updateAccommodation);
router.delete('/delete/accommodation/:id',verifyAdmin, deleteAccommodation);
module.exports = router;
