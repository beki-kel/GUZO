const mongoose = require('mongoose');

const eventBookingSchema =  new mongoose.Schema({
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  eventDate: {
    type: Date,
    required: true
  }
});

const EventBooking = mongoose.model('EventBooking', eventBookingSchema);
module.exports = EventBooking;
