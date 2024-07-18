const mongoose = require('mongoose');


const hotelBookingSchema =  new mongoose.Schema({
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
  },
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true
  },
  checkInDate: {
    type: Date,
  },
  checkOutDate: {
    type: Date,
  },
  roomType: {
    type: String,
    required: true
  }
});

const HotelBooking = mongoose.model('HotelBooking', hotelBookingSchema);
module.exports = HotelBooking;
