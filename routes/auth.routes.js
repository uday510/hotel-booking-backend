const authController = require("../controllers/auth.controller");
const { authUser } = require("../middlewares/index");

/**
 * Sets up authentication-related routes.
 * 
 * @param {Object} app - Express app object.
 */
module.exports = (app) => {
  /**
   * Route for user signup.
   * 
   * @name POST /api/v1/auth/signup
   * @function
   * @memberof module:routes/authRoutes
   * @inner
   * 
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @param {function} authUser.validateSignupRequest - Middleware to validate signup request.
   * @param {function} authController.signup - Controller for user signup.
   */
  app.post("/api/v1/users/signup", [authUser.validateSignupRequest], authController.signup);

  /**
   * Route for user login.
   * 
   * @name POST /api/v1/auth/login
   * @function
   * @memberof module:routes/authRoutes
   * @inner
   * 
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @param {function} authUser.validateSigninRequest - Middleware to validate signin request.
   * @param {function} authController.signin - Controller for user login.
   */
  app.post("/api/v1/users/login", [authUser.validateSigninRequest], authController.signin);

  app.get("/api/v1/users", (req, res) => res.send("Welcome to the Authentication Management System"));
};
