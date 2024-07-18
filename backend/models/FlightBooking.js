const mongoose = require('mongoose');

const flightBookingSchema =  new mongoose.Schema({
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true
  },
  flightId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Flight',
    required: true
  },
  departureDate: {
    type: Date,
    required: true
  },
  returnDate: {
    type: Date
  },
  seatClass: {
    type: String,
    required: true
  }
});

const FlightBooking = mongoose.model('FlightBooking', flightBookingSchema);
module.exports = FlightBooking;
