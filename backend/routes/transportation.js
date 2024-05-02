const express=require('express');
const router = express.Router();
const distanceController= require('../controller/distanceCalculator')
const {searchFlights,addFlight,updateFlight,deleteFlight}=require('../controller/flightController')
const {searchRide} = require('../controller/TransportaionController')
const {addTransportation} =require('../controller/TransportaionController')
const {updateDriverRating} =require('../controller/TransportaionController')
const {updateTransportation}=require('../controller/TransportaionController')
const {deleteTransportation}=require('../controller/TransportaionController')
const {verifyUser,verifyAdmin} = require('../utils/verifyToken')

router.post('/search/transportation', searchRide);
router.post('/search/flight', searchFlights);
router.post('/add/flight', addFlight);
router.put('/update/flight', updateFlight);
router.delete('/delete/flight', deleteFlight);
router.post('/transportation/disatnce',distanceController);
router.post('/add/transportation', verifyAdmin, addTransportation);
router.put('/update/transportation/rating/:id',verifyUser, updateDriverRating);
router.put('/update/transportation/:id', verifyAdmin,updateTransportation);
router.delete('/delete/transportation/:id',verifyAdmin, deleteTransportation);



module.exports = router;
