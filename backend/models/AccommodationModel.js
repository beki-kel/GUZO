const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  type: { type: String, required: true }, // e.g., 'double bed', 'single bed'
  otherType:{type:String, required:true},
  capacity: { type: Number, required: true }, // number of people the room can accommodate
  price: { type: Number, required: true }, // price per night
  amenities: { type: [String] }, // list of amenities
  description: { type: String },
  image: {
    data: Buffer,
    contentType: String
  },
});

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
  rooms: { type: [roomSchema] }, // Use the roomSchema here
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
  totalratings: { type: Number, default: 0 }
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;

