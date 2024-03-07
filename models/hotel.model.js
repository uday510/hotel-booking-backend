const mongoose = require('mongoose');

/**
 * @typedef {Object} HotelSchema
 * @property {string} hotelId - Unique identifier for the hotel.
 * @property {string} name - Name of the hotel.
 * @property {mongoose.Schema.Types.ObjectId[]} bookings - Array of Booking references.
 * @property {string} location - Location of the hotel.
 * @property {Date} createdAt - Date when the hotel was created.
 * @property {Date} updatedAt - Date when the hotel was last updated.
 */

/**
 * Mongoose schema for the Hotel model.
 *
 * @type {mongoose.Schema<HotelSchema>}
 */
const hotelSchema = new mongoose.Schema({
  hotelId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  bookings: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Booking',
    default: []
  },
  location: {
    type: String,
    required: true
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

/**
 * Mongoose model for the Hotel schema.
 *
 * @typedef {import('mongoose').Model<HotelSchema, {}, {}>} HotelModel
 */

/**
 * @type {HotelModel}
 */
const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
