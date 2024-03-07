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
   * @name POST/api/v1/hotel/create
   * @param {Function[]} middleware - Middleware functions to be executed before the controller.
   * @param {Function} controller - Controller function to handle the route.
   */
  app.post("/api/v1/hotels", [authUser.verifyToken, hotelMiddleware.validateHotelCreateRequest], hotelController.create);

  app.get("/api/v1/hotels", (req, res) => res.send("Welcome to Hotel Management System"));
};


