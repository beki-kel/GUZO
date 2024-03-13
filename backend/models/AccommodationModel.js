// models/Hotel.js
const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  externalId: { type: String, unique: true },
  name: String,
  location: String,
  accommodationType: String
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
