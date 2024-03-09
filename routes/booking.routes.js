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
   * @name POST /v1/bookings/
   * @function
   * @memberof module:Routes~bookingRoutes
   * @inner
   * 
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @param {function} next - Express next middleware function.
   * 
   * @returns {void}
   */
  app.post("/v1/bookings", [authUser.verifyToken, bookingMiddleware.validateBookingRequest], bookingController.bookHotel);

  /**
   * Endpoint to get bookings for a user.
   *
   * @name GET /v1/bookings
   * @function
   * @memberof module:Routes~bookingRoutes
   * @inner
   * 
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @param {function} next - Express next middleware function.
   * 
   * @returns {void}
   */
  app.get("/v1/bookings", [authUser.verifyToken], bookingController.getBookingsByUser);
};
