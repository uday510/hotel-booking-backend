const { TOKEN_EXPIRATION_TIME_SECONDS } = require('../utils/util');
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const config = require("../configs/auth.config");

/**
 * Controller for user signup.
 * 
 * @param {*} req - Express request object.
 * @param {*} res - Express response object.
 */
exports.signup = async (req, res) => {
  // Create a user object with hashed password
  const userObj = {
    name: req.body.name,
    userId: req.body.userId,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    type: req.body.type || "user",
  };

  try {
    // Create a new user in the database
    const userCreated = await User.create(userObj);
    const userCreationResponse = {
      name: userCreated.name,
      userId: userCreated.userId,
      email: userCreated.email,
      type: userCreated.type,
    };

    // Send success response
    res.status(201).send({
      statusCode: 201,
      data: userCreationResponse,
      message: "User created successfully",
      success: true,
    });
  } catch (err) {
    // Handle errors during user creation
    console.error("Error while creating user", err.message);
    res.status(500).send({
      statusCode: 500,
      message: `Internal server error while creating user: ${err.message}`,
      success: false,
    });
  }
};

/**
 * Controller for user signin.
 * 
 * @param {*} req - Express request object.
 * @param {*} res - Express response object.
 */
exports.signin = async (req, res) => {
  try {
    // Search for the user by email
    const user = await User.findOne({ email: req.body.email });

    // Check if the user exists
    if (!user) {
      return res.status(400).send({
        statusCode: 400,
        message: "Failed! Email doesn't exist",
        success: false,
      });
    }

    // Check if the entered password matches the stored hashed password
    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);

    // Handle invalid password
    if (!isPasswordValid) {
      return res.status(401).send({
        statusCode: 401,
        message: "Invalid Password",
      });
    }

    // Generate JWT token
    const token = generateToken(user.userId);

    // Send success response with token
    res.status(200).send({
      statusCode: 200,
      data: {
        name: user.name,
        userId: user.userId,
        email: user.email,
        accessToken: token,
        type: user.type,
      },
      message: "Token sent successfully",
      success: true,
    });
  } catch (err) {
    // Handle errors during user signin
    console.error(err.message);
    res.status(500).send({
      statusCode: 500,
      error: err.message,
      message: `Internal server error while signing user: ${err.message}`,
      success: false,
    });
  }
};

/**
 * Generates a JWT token based on the provided user ID.
 * 
 * @param {string} userId - User ID for which the token is generated.
 * @returns {string} Generated JWT token.
 */
function generateToken(userId) {
  return jwt.sign({ id: userId }, config.secret, {
    expiresIn: TOKEN_EXPIRATION_TIME_SECONDS
  });
}
