const mongoose = require('mongoose');

/**
 * Mongoose schema for the Booking model.
 * @typedef {Object} BookingSchema
 * @property {mongoose.Types.ObjectId} hotelId - Reference to the Hotel model.
 * @property {mongoose.Types.ObjectId} userId - Reference to the User model.
 * @property {Date} date - Date for the booking.
 * @property {Date} createdAt - Timestamp for when the booking was created.
 * @property {Date} updatedAt - Timestamp for the last update of the booking.
 */

const bookingSchema = new mongoose.Schema({
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
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
 * Mongoose model for the Booking schema.
 * @typedef {Model<BookingSchema>} Booking
 */
module.exports = mongoose.model('Booking', bookingSchema);
