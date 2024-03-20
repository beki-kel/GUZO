const express = require('express')
const { searchFilterDinning }= require('../controller/dinningController')


const router = express.Router();
router.get('/search/filter/Dinning', searchFilterDinning);


module.exports = router;