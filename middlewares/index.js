const authUser = require("./auth.middleware");
const hotelMiddleware = require("./hotel.middleware");
const bookingMiddleware = require("./booking.middleware");

module.exports = {
  authUser,
  hotelMiddleware,
  bookingMiddleware
}

