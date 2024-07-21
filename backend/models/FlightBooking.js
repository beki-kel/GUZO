const mongoose = require('mongoose');

const flightBookingSchema =  new mongoose.Schema({
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
  },
  depflightId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Flight',
    required: true
  },
  retflightId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Flight',
    default: null,
  },
});

const FlightBooking = mongoose.model('FlightBooking', flightBookingSchema);
module.exports = FlightBooking;
