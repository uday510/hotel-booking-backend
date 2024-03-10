const jwt = require("jsonwebtoken");
const Config = require("../configs/auth.config");
const User = require("../models/user.model");
const Util = require("../utils/util");

/**
 * Middleware to validate the request body for user sign-in.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Next middleware function.
 */
const validateSigninRequest = (req, res, next) => {
  /**
   * Check if email and password are provided.
   * @type {string} req.body.email - User's email.
   * @type {string} req.body.password - User's password.
   */
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({
      message: "Failed! Email and password are required.",
      statusCode: 400,
    });
  }
  next();
};

/**
 * Middleware to validate the request body for user sign-up.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Next middleware function.
 */
const validateSignupRequest = async (req, res, next) => {
  /**
   * Check if name, email, userId, and password are provided.
   * @type {string} req.body.name - User's name.
   * @type {string} req.body.email - User's email.
   * @type {string} req.body.userId - User's ID.
   * @type {string} req.body.password - User's password.
   */
  if (!req.body.name || !req.body.email || !req.body.password || !req.body.userId) {
    return res.status(400).send({
      message: "Failed! Name, email, userId, and password are required.",
      statusCode: 400,
    });
  }

  try {
    /**
     * Check if the user with the provided email already exists.
     * @type {Object} user - User object from the database.
     */
    const user = await User.findOne({ email: req.body.email });

    if (user !== null) {
      return res.status(400).send({
        message: "Failed! Email already exists.",
        statusCode: 400,
      });
    }

    /**
     * Validate email format using utility function.
     * @type {boolean} isValidEmail - Indicates if the email format is valid.
     */
    const isValidEmail = Util.validateEmail(req.body.email);

    if (!isValidEmail) {
      return res.status(400).send({
        message: "Failed! Invalid email format.",
        statusCode: 400,
      });
    }

    /**
     * Validate password format using utility function.
     * @type {boolean} isValidPassword - Indicates if the password format is valid.
     */
    const isValidPassword = Util.validatePassword(req.body.password);

    if (!isValidPassword) {
      return res.status(400).send({
        message: "Failed! Invalid password format. Password should be a minimum of 8 characters with at least a symbol, upper and lower case letters, and a number.",
        statusCode: 400,
        success: false,
      });
    }

    next();
  } catch (error) {
    console.error('Error validating sign-up request:', error.message);
    return res.status(500).send({
      message: "Internal server error while validating sign-up request.",
      statusCode: 500,
      success: false,
    });
  }
};

/**
 * Middleware to verify the JWT token provided in the request headers.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Next middleware function.
 */
const verifyToken = (req, res, next) => {
  /**
   * Get the token from the request headers.
   * @type {string} token - JWT token.
   */
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(401).send({
      message: "Unauthorized! No token provided.",
      statusCode: 401,
      success: false,
    });
  }

  /**
   * Verify the JWT token using the configured secret.
   * @type {Object} err - Error object from token verification.
   * @type {Object} decoded - Decoded user ID from the token.
   */
  jwt.verify(token, Config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: `Unauthorized! Token expired, please create a new token.`,
        statusCode: 401,
      });
    }
    req.userId = decoded.id;
    next();
  });
};

/**
 * Middleware object containing various authentication functions.
 * @namespace
 * @property {function} validateSignupRequest - Middleware to validate sign-up requests.
 * @property {function} validateSigninRequest - Middleware to validate sign-in requests.
 * @property {function} verifyToken - Middleware to verify JWT tokens.
 */
const authUser = {
  validateSignupRequest: validateSignupRequest,
  validateSigninRequest: validateSigninRequest,
  verifyToken: verifyToken,
};

module.exports = authUser;
