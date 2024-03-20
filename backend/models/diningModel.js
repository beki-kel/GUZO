const mongoose = require('mongoose');
const { Schema } = mongoose;

// Schema for dining reservations
const reservationSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user making the reservation
  restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true }, // Reference to the restaurant
  date: { type: Date, required: true }, // Date of reservation
  time: { type: String, required: true }, // Time of reservation
  numberOfPeople: { type: Number, required: true }, // Number of people for the reservation
  specialRequests: { type: String }, // Any special requests for the reservation
  createdAt: { type: Date, default: Date.now } // Timestamp of when the reservation was created
});

const restaurantSchema = new Schema({
    externalId: { type: String, unique: true, required: true },
    name: { type: String, required: true }, // Name of the restaurant
    cuisine: { type: String, required: true }, // Cuisine type of the restaurant
    address: {
      street: { type: String, required: true }, // Street address of the restaurant
      city: { type: String, required: true }, // City of the restaurant
      state: { type: String, required: true }, // State of the restaurant
      zip: { type: String, required: true } // Zip code of the restaurant
    },
    rating: {     type: Number,
      min: 0,
      max: 10,
      default: 0 }, // Average rating of the restaurant
    openingHours: {
      // Opening hours of the restaurant
      monday: { type: { open: String, close: String } },
      tuesday: { type: { open: String, close: String } },
      wednesday: { type: { open: String, close: String } },
      thursday: { type: { open: String, close: String } },
      friday: { type: { open: String, close: String } },
      saturday: { type: { open: String, close: String } },
      sunday: { type: { open: String, close: String } }
    },
    totalratings: {type: Number,default: 0 },
    createdAt: { type: Date, default: Date.now } // Timestamp of when the restaurant was created
  });
  
  // Exporting schema as model
  const Restaurant = mongoose.model('Restaurant', restaurantSchema);

  module.exports = Restaurant;