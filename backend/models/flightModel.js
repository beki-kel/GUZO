const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  airline: {
    type: String,
    required: true,
  },
  flightNumber: {
    type: String,
    required: true,
    unique: true,
  },
  flightDate:{
    type: String,
    required: true,
  },
  flightTime:{
    type: Date,
    required: true,
  },
  departure: {
    airport: {
      type: String,
      required: true,
    },
  },
  arrival: {
    airport: {
      type: String,
      required: true,
    },
  },
  price: {
    type: Number,
    required: true,
  },
  seatsAvailable: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

const Flight = mongoose.model('Flight', flightSchema);
module.exports = Flight;
