/**
 * @description: This middleware is used to validate the booking request.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Next middleware function.
 */

validateBookingRequest = (req, res, next) => {
  if (!req.body.hotelId || !req.body.date) {
    return res.status(400).send({
      message: "Failed! hotelId and bookingDate are required.",
      statusCode: 400,
    });
  }

  next();
}

const validateBooking = {
  validateBookingRequest: validateBookingRequest
};

module.exports = validateBooking;