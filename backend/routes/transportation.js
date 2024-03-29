const express=require('express');
const router = express.Router();
const distanceController= require('../controller/distanceCalculator')
const {searchRide} = require('../controller/TransportaionController')
const {addTransportation} =require('../controller/TransportaionController')
const {updateDriverRating} =require('../controller/TransportaionController')
const {updateTransportation}=require('../controller/TransportaionController')
const {deleteTransportation}=require('../controller/TransportaionController')
const {verifyUser,verifyAdmin} = require('../utils/verifyToken')

router.post('/search/Transportation', searchRide)
router.post('/transportation/disatnce', verifyAdmin,distanceController);
router.post('/add/transportation', verifyAdmin, addTransportation);
router.put('/update/Transportation/rating/:id',verifyUser, updateDriverRating);
router.put('/update/Transportation/:id', verifyAdmin,updateTransportation);
router.delete('/delete/Transportation/:id',verifyAdmin, deleteTransportation);



module.exports = router;
