const hotelController = require('../controllers/hotel.controller');
const { authUser, hotelMiddleware } = require('../middlewares/index');

/**
 * Configure routes related to hotels.
 * 
 * @param {Object} app - Express application object.
 */
module.exports = (app) => {
  /**
   * Endpoint to create a new hotel.
   * 
   * @function
   * @name POST /v1/hotels/
   * @param {Function[]} middleware - Middleware functions to be executed before the controller.
   * @param {Function} controller - Controller function to handle the route.
   */
  app.post("/v1/hotels", [authUser.verifyToken, hotelMiddleware.validateHotelCreateRequest], hotelController.create);
  app.post("/v1/hotels/view", [authUser.verifyToken], hotelController.getAvailableHotels);
};


