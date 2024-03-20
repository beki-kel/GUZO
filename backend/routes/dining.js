const express = require('express')
const { searchFilterDinning }= require('../controller/dinningController')
const { addRestaurant }= require('../controller/dinningController')
const { updateRestaurantRating }= require('../controller/dinningController')
const { updateRestaurant }= require('../controller/dinningController')
const { deleteRestaurant }= require('../controller/dinningController')

const router = express.Router();
router.get('/search/filter/Dinning', searchFilterDinning);
router.post('/add/Restaurant', addRestaurant);
router.put('/update/Restaurant/rating/:id', updateRestaurantRating);
router.put('/update/Restaurant/:id', updateRestaurant);
router.delete('/delete/Restaurant/:id', deleteRestaurant);


module.exports = router;