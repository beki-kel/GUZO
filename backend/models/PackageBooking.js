const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const packageBookingSchema = new Schema({
  booking: {
    type: Schema.Types.ObjectId,
    ref: 'Booking',
    required: true
  },
  packageId: {
    type: Schema.Types.ObjectId,
    ref: 'Package',
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  activities: {
    type: [String]
  }
});

const PackageBooking = mongoose.model('PackageBooking', packageBookingSchema);
module.exports = PackageBooking;
