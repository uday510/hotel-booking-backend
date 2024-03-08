const Hotel = require('../models/hotel.model');

/**
 * Middleware to validate the request body for creating a hotel.
 * 
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Next middleware function.
 */
validateHotelCreateRequest = async (req, res, next) => {
  // Check if hotelId is provided and is a non-empty string
  if (!req.body.hotelId || typeof req.body.hotelId !== 'string' || req.body.hotelId.trim() === '') {
    return res.status(400).send({
      message: "Failed! hotelId is invalid or not provided",
      statusCode: 400,
      success: false,
    });
  }

  // Check if name is provided and is a non-empty string
  if (!req.body.name || typeof req.body.name !== 'string' || req.body.name.trim() === '') {
    return res.status(400).send({
      message: "Failed! Name is invalid or not provided",
      statusCode: 400,
      success: false,
    });
  }

  // check if price is provided and is a number
  if (!req.body.price || typeof req.body.price !== 'number') {
    return res.status(400).send({
      message: "Failed! Price is invalid or not provided",
      statusCode: 400,
      success: false,
    });
  }

  // Check if location is provided and is a non-empty string
  if (!req.body.location || typeof req.body.location !== 'string' || req.body.location.trim() === '') {
    return res.status(400).send({
      message: "Failed! Location is invalid or not provided",
      statusCode: 400,
      success: false,
    });
  }

  try {
    // Check if a hotel with the same hotelId already exists
    const existingHotelWithId = await Hotel.findOne({ hotelId: req.body.hotelId });
    if (existingHotelWithId) {
      return res.status(400).send({
        message: "Failed! Hotel with the same hotelId already exists",
        statusCode: 400,
        success: false,
      });
    }

    // Check if a hotel with the same name already exists
    const existingHotelWithName = await Hotel.findOne({ name: req.body.name });
    if (existingHotelWithName) {
      return res.status(400).send({
        message: "Failed! Hotel with the same name already exists",
        statusCode: 400,
        success: false,
      });
    }

    // If no existing hotel is found, proceed to the next middleware
    next();
  } catch (error) {
    console.error('Error checking for existing hotels:', error.message);
    return res.status(500).send({
      message: "Internal server error while checking for existing hotels",
      statusCode: 500,
      success: false,
    });
  }
};


const validateHotel = {
  validateHotelCreateRequest: validateHotelCreateRequest,
}

module.exports = validateHotel;
