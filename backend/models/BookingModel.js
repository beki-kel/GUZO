const mongoose = require('mongoose');


const bookingSchema =  new mongoose.Schema ({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['hotel', 'flight', 'transportation', 'event', 'package'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'Booked'],
    default: 'pending'
  },
  details: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'typeDetails',
    required: true
  },
  typeDetails: {
    type: String,
    required: true,
    enum: ['HotelBooking', 'FlightBooking', 'TransportationBooking', 'EventBooking', 'PackageBooking']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

bookingSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
