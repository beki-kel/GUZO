const express=require('express');
const router = express.Router();
const distanceController= require('../controller/distanceCalculator')
const {searchRide} = require('../controller/TransportaionController')
const {addTransportation} =require('../controller/TransportaionController')
const {updateDriverRating} =require('../controller/TransportaionController')
const {updateTransportation}=require('../controller/TransportaionController')
const {deleteTransportation}=require('../controller/TransportaionController')
const {verifyUser,verifyAdmin} = require('../utils/verifyToken')

router.get('/search/transportation', searchRide)
router.post('/transportation/disatnce', verifyAdmin,distanceController);
router.post('/add/transportation', verifyAdmin, addTransportation);
router.put('/update/transportation/rating/:id',verifyUser, updateDriverRating);
router.put('/update/transportation/:id', verifyAdmin,updateTransportation);
router.delete('/delete/transportation/:id',verifyAdmin, deleteTransportation);



module.exports = router;
