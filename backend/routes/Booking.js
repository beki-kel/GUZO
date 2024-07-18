const express = require('express');

const router = express.Router();
const {AddBooking,GetAllBookings,GetBookingById,UpdateBookingStatus,DeleteBooking,GetUserBookings} = require('../controller/bookingController');

router.post('/add/book', AddBooking);
router.get('/find/book', GetAllBookings);
router.get('/find/book/:id', GetBookingById);
router.get('/book/user/:userId', GetUserBookings);
router.put('/update/book/:id', UpdateBookingStatus);
router.delete('/delete/book/:id', DeleteBooking);

module.exports = router;