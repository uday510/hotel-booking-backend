const mongoose = require('mongoose');

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

module.exports = mongoose.model('Hotel', hotelSchema);
