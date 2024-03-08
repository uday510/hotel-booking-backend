const { mockRequest, mockResponse } = require('../interceptor');
const { bookHotel, getBookingsByUser } = require('../../controllers/booking.controller');
const Booking = require('../../models/booking.model');
const Hotel = require('../../models/hotel.model');
const User = require('../../models/user.model');
const dbHandler = require('../db');

/**
 * Set up the database connection before running the tests.
 */
beforeAll(async () => await dbHandler.connect());

/**
 * Close the database connection after running all the tests.
 */
afterAll(async () => await dbHandler.closeDatabase());

/**
 * User payload for testing.
 */
const userTestPayload = {
  email: "uday510@icloud.com",
  userId: "uday10",
  name: "uday",
  type: "admin",
  password: "Budd@i1028",
  bookings: [],
  save: jest.fn(),
};

/**
 * Hotel payload for testing.
 */
const hotelTestPayload = {
  hotelId: "hotel123",
  name: "Hotel Lemon",
  location: "City G",
  price: 40000
};

/**
 * Booking payload for testing.
 */
const bookingTestPayload = {
  hotelId: "hotel123",
  hotelName: "Hotel Lemon",
  price: 40000,
  location: "City G",
  checkIn: "29-06-2024"
}

/**
 * Booking create payload for testing.
 */
const bookingCreateTestPayload = {
  hotelName: "Hotel Lemon",
  price: 40000,
  location: "City G",
  checkIn: "29-06-2024"
};

/**
 * Test suite for Booking Controller.
 */
describe('Booking Controller', () => {
  /**
   * Test to book a hotel successfully.
   */
  it('should book a hotel successfully', async () => {
    const hotelSpy = jest.spyOn(Hotel, 'findOne').mockReturnValue(Promise.resolve(hotelTestPayload));
    const userSpy = jest.spyOn(User, 'findOne').mockReturnValue(Promise.resolve(userTestPayload));
    const bookingSpy = jest.spyOn(Booking, 'findOne').mockReturnValue(Promise.resolve(null));
    const createBookingSpy = jest.spyOn(Booking, 'create').mockReturnValue(Promise.resolve(bookingTestPayload));

    const req = mockRequest();
    const res = mockResponse();

    req.body.hotelId = hotelTestPayload.hotelId;
    req.body.date = "29-06-2024";

    req.userId = userTestPayload.userId;

    await bookHotel(req, res);

    expect(hotelSpy).toHaveBeenCalled();
    expect(userSpy).toHaveBeenCalled();
    expect(bookingSpy).toHaveBeenCalled();
    expect(createBookingSpy).toHaveBeenCalled();
    expect(res.send).toHaveBeenCalledWith({
      success: true,
      data: bookingCreateTestPayload,
      message: "Hotel booked successfully.",
      statusCode: 201,
    });
  });
  /**
   * Test to return a not found response when user is not found.
   */
  it('should return a not found response when user is not found', async () => {
    // Mock User.findOne to return null
    const userSpy = jest.spyOn(User, 'findOne').mockReturnValue(Promise.resolve(null));

    const req = mockRequest();
    const res = mockResponse();

    req.userId = userTestPayload.userId;

    await getBookingsByUser(req, res);

    // Check if the response contains the expected data
    expect(res.send).toHaveBeenCalledWith({
      success: false,
      message: "User not found.",
      statusCode: 404,
    });
  });

});
