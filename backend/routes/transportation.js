const express=require('express');
const router = express.Router();
const distanceController=require('../controller/mapBoxDistance')
const searchRide=require('../controller/TransportaionController')

router.get('/search/filter/Transportation', searchRide)
router.post('/transportation/disatnce', distanceController);
router.post('/add/transportation', );
router.put('/update/Transportation/rating/:id', );
router.put('/update/Transportation/:id');
router.delete('/delete/Transportation/:id', );



module.exports = router;
