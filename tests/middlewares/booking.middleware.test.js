/**
 * Middleware to validate the booking request.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Next middleware function.
 */
const validateBookingRequest = (req, res, next) => {
  // Check if hotelId and date are provided in the request body
  if (!req.body.hotelId || !req.body.date) {
    return res.status(400).send({
      message: "Failed! Both hotelId and bookingDate are required.",
      statusCode: 400,
    });
  }

  // If validation passes, proceed to the next middleware
  next();
};

/**
 * Object containing booking validation middleware.
 */
const validateBooking = {
  validateBookingRequest: validateBookingRequest,
};

module.exports = validateBooking;
