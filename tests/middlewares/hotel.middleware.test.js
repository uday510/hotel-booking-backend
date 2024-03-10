/**
 * @file validateHotel.test.js
 * @description Test file for validateHotel middleware using Jest.
 */

const Hotel = require('../models/hotel.model');
const validateHotel = require('./validateHotel');

describe('validateHotel middleware', () => {
  // Mock data for testing
  const validHotelData = {
    hotelId: '123',
    name: 'Example Hotel',
    price: 100,
    location: 'Example Location',
  };

  // Mock request and response objects
  let req, res, next;

  beforeEach(() => {
    req = {
      body: validHotelData,
    };
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    next = jest.fn();
  });

  it('should pass validation for valid hotel data', async () => {
    // Mock the findOne method to return null (no existing hotel)
    jest.spyOn(Hotel, 'findOne').mockResolvedValue(null);

    // Call the middleware
    await validateHotel.validateHotelCreateRequest(req, res, next);

    // Expect no response status other than 400 (indicating validation failure)
    expect(res.status).not.toHaveBeenCalledWith(400);
  });

  it('should fail validation if hotelId is missing', async () => {
    delete req.body.hotelId;

    // Call the middleware
    await validateHotel.validateHotelCreateRequest(req, res, next);

    // Expect a 400 status and a specific error message
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      message: "Failed! hotelId is invalid or not provided",
      statusCode: 400,
      success: false,
    });
  });

  // Add similar tests for other validation scenarios...

  // Cleanup after each test
  afterEach(() => {
    jest.restoreAllMocks();
  });
});
