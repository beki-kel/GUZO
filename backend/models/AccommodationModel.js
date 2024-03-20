// models/Hotel.js
const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  externalId: { type: String, unique: true },
  name: { type: String, required: true, unique: true },
  city: { type: String, required: true },
  location: { type: String, required: true },
  accommodationType: { type: String, required: true },
  description: { type: String, required: true },
  image: {
    data: Buffer,
    contentType: String
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    required: true
  },
  rooms: { type: [String] },
  featured: {
    type: Boolean,
    default: false,
  },
  userRating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0
  },
  totalratings: {type: Number,default: 0 }
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
