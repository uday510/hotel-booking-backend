const Hotel = require('../models/hotel.model.js');
const User = require('../models/user.model.js');

/**
 * Controller function to create a new hotel.
 * 
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
exports.create = async (req, res) => {
  /**
   * Object to store hotel information before saving to the database.
   *
   * @typedef {Object} HotelObject
   * @property {string} hotelId - Unique identifier for the hotel.
   * @property {string} name - Name of the hotel.
   * @property {string} location - Location of the hotel.
   */

  /**
   * Information to be stored in the database for creating a hotel.
   *
   * @type {HotelObject}
   */
  const hotelObjToBeStoredInDB = {
    hotelId: req.body.hotelId,
    name: req.body.name,
    location: req.body.location,
    price: req.body.price,
  };

  try {
    // Check user type to ensure only admin can create a hotel
    const user = await User.findOne({ userId: req.userId });

    // Handle case where the user is not found
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found.",
        statusCode: 404,
      });
    }

    // Check if the user is an admin
    if (user.type !== 'admin') {
      return res.status(403).send({
        success: false,
        message: "Unauthorized! Only admin can create a hotel.",
        statusCode: 403,
      });
    }

    // Create a new hotel in the database
    const data = await Hotel.create(hotelObjToBeStoredInDB);

    // Send success response with created hotel information
    res.status(201).send({
      success: true,
      data: data,
      message: "Hotel created successfully.",
      statusCode: 201,
    });
  } catch (err) {
    // Handle errors during the hotel creation process
    res.status(500).send({
      success: false,
      message: err.message || "Some error occurred while creating the Hotel.",
      statusCode: 500,
    });
  }
};
