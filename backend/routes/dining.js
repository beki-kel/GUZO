const express = require('express')
const { searchFilterDinning }= require('../controller/dinningController')
const { addRestaurant }= require('../controller/dinningController')
const { updateRestaurantRating }= require('../controller/dinningController')
const { updateRestaurant }= require('../controller/dinningController')
const { deleteRestaurant }= require('../controller/dinningController')
const {verifyUser,verifyAdmin} = require('../utils/verifyToken')

const router = express.Router();
router.get('/search/filter/Dinning',searchFilterDinning);
router.post('/add/Restaurant',verifyAdmin,addRestaurant);
router.put('/update/Restaurant/rating/:id',verifyUser ,updateRestaurantRating);
router.put('/update/Restaurant/:id',verifyAdmin ,updateRestaurant);
router.delete('/delete/Restaurant/:id', verifyAdmin,deleteRestaurant);


module.exports = router;