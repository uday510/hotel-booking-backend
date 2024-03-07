const bookingController = require('../controllers/booking.controller');
const { authUser, bookingMiddleware } = require('../middlewares/index');

/**
 * Set up routes related to hotel bookings.
 *
 * @param {Object} app - Express application object.
 */
module.exports = (app) => {
  /**
   * Endpoint to book a hotel.
   *
   * @name POST /api/v1/bookings/
   * @function
   * @memberof module:Routes~bookingRoutes
   * @inner
   * @param {string} path - Express route path.
   * @param {function[]} middleware - Array of middleware functions.
   * @param {function} controller - Controller function to handle the request.
   */
  app.post("/api/v1/bookings/", [authUser.verifyToken, bookingMiddleware.validateBookingRequest], bookingController.bookHotel);
}
