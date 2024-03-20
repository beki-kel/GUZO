const express=require('express');
const router = express.Router();
const distanceController= require('../controller/distanceCalculator')
const {searchRide} = require('../controller/TransportaionController')
const {addTransportaion} =require('../controller/TransportaionController')
const {updateDriverRating} =require('../controller/TransportaionController')
const {updateTransportation}=require('../controller/TransportaionController')
const {deleteTransportation}=require('../controller/TransportaionController')

router.get('/search/Transportation', searchRide)
router.post('/transportation/disatnce', distanceController);
router.post('/add/transportation', addTransportaion);
router.put('/update/Transportation/rating/:id', updateDriverRating);
router.put('/update/Transportation/:id', updateTransportation);
router.delete('/delete/Transportation/:id', deleteTransportation);



module.exports = router;
