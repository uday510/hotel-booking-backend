const Hotel = require('../models/hotel.model.js');
const User = require('../models/user.model.js');
/**
 * Controller function to create a new hotel.
 * 
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
exports.create = async (req, res) => {
  // Prepare hotel object to be stored in the database
  const hotelObjToBeStoredInDB = {
    hotelId: req.body.hotelId,
    name: req.body.name,
    location: req.body.location,
  };

  try {
    // check user type only admin can create hotel
    const user = await User.findOne({ userId: req.userId });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found.",
        statusCode: 404,
      });
    }
    if (user.type !== 'admin') {
      return res.status(403).send({
        success: false,
        message: "Unauthorized! Only admin can create hotel.",
        statusCode: 403,
      });
    }

    // Create a hotel
    const data = await Hotel.create(hotelObjToBeStoredInDB);

    // Success response format
    res.status(201).send({
      success: true,
      data: data,
      message: "Hotel created successfully.",
      statusCode: 201,
    });
  } catch (err) {
    // Error response format
    res.status(500).send({
      success: false,
      message: err.message || "Some error occurred while creating the Hotel.",
      statusCode: 500,
    });
  }
};
