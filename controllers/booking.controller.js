const Booking = require('../models/booking.model.js');
const Hotel = require('../models/hotel.model.js');
const User = require('../models/user.model.js');

exports.bookHotel = async (req, res) => {
  const bookingObjToBeStoredInDB = {
    date: req.body.date,
  };

  try {
    // get hotel by id
    const hotel = await Hotel.findOne({
      hotelId: req.body.hotelId,
    });
    // get user by id
    const user = await User.findOne({
      userId: req.userId,
    });

    const existingBooking = await Booking.findOne({
      hotelId: hotel._id,
      date: req.body.date,
    });

    bookingObjToBeStoredInDB.hotelId = hotel._id;
    bookingObjToBeStoredInDB.userId = user._id;

    if (existingBooking) {
      return res.status(400).send({
        success: false,
        message: "Hotel unavailable for booking on the given date, please try another date.",
        statusCode: 400,
      });
    }
    const data = await Booking.create(bookingObjToBeStoredInDB);
    res.status(201).send({
      success: true,
      data: data,
      message: "Hotel booked successfully.",
      statusCode: 201,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message || "Some error occurred while booking the Hotel.",
      statusCode: 500,
    });
  }
}