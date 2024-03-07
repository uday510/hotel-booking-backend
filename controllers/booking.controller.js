const Booking = require('../models/booking.model.js');
const Hotel = require('../models/hotel.model.js');
const User = require('../models/user.model.js');

/**
 * Controller for booking a hotel.
 *
 * @param {*} req - Express request object.
 * @param {*} res - Express response object.
 */
exports.bookHotel = async (req, res) => {
  /**
   * Object to store booking information before saving to the database.
   *
   * @typedef {Object} BookingObject
   * @property {string} hotelId - ID of the hotel being booked.
   * @property {string} userId - ID of the user making the booking.
   * @property {string} date - Date for the booking.
   */

  /**
   * Information to be stored in the database for booking.
   *
   * @type {BookingObject}
   */

  // Check if the data is valid
  const dateParts = req.body.date.split("-");
  const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
  const bookingDate = new Date(formattedDate);

  // Check if the date is valid
  if (isNaN(bookingDate) || bookingDate < Date.now()) {
    return res.status(400).send({
      success: false,
      message: "Invalid booking date. Please provide a future date.",
      statusCode: 400,
    });
  }

  const bookingObjToBeStoredInDB = {
    date: bookingDate,
  };

  try {
    // Retrieve hotel information based on hotelId from the request body
    const hotel = await Hotel.findOne({
      hotelId: req.body.hotelId,
    });

    // Retrieve user information based on userId from the request
    const user = await User.findOne({
      userId: req.userId,
    });

    // Check if there is an existing booking for the specified hotel and date
    const existingBooking = await Booking.findOne({
      hotelId: hotel._id,
      date: bookingDate,
    });

    // Set hotelId and userId in the bookingObjToBeStoredInDB
    bookingObjToBeStoredInDB.hotelId = hotel._id;
    bookingObjToBeStoredInDB.userId = user._id;

    // If there's an existing booking, return a conflict response
    if (existingBooking) {
      return res.status(400).send({
        success: false,
        message: "Hotel unavailable for booking on the given date, please try another date.",
        statusCode: 400,
      });
    }

    // Create a new booking in the database
    const data = await Booking.create(bookingObjToBeStoredInDB);

    // Store the booking ID in the user document
    user.bookings.push(data._id);
    await user.save();

    // Send success response with booking information
    res.status(201).send({
      success: true,
      data: data,
      message: "Hotel booked successfully.",
      statusCode: 201,
    });
  } catch (err) {
    // Handle errors during the booking process
    res.status(500).send({
      success: false,
      message: err.message || "Some error occurred while booking the Hotel.",
      statusCode: 500,
    });
  }
}

/**
 * Controller to get all bookings of a user.
 *
 * @param {*} req - Express request object.
 * @param {*} res - Express response object.
 */
exports.getBookingsByUser = async (req, res) => {
  try {
    // Find the user by userId
    const user = await User.findOne({ userId: req.userId }).populate('bookings');

    // Check if the user is not found
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found.",
        statusCode: 404,
      });
    }

    // Extract bookings from the user object
    const userBookings = user.bookings;

    res.status(200).send({
      success: true,
      data: userBookings,
      message: "User bookings retrieved successfully.",
      statusCode: 200,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message || "Some error occurred while retrieving user bookings.",
      statusCode: 500,
    });
  }
};