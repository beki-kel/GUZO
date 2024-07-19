const mongoose = require('mongoose');

const transportBookingSchema =  new mongoose.Schema({
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
  },
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    required: true
  },
  pickupLocation: {
    type: String,
    required: true
  },
  dropoffLocation: {
    type: String,
    required: true
  },
  pickupDate: {
    type: Date,
  },
  finalPrice:{
    type: Number,
    required: true
  }
});

const TransportationBooking = mongoose.model('TransportationBooking', transportBookingSchema);
module.exports = TransportationBooking;
