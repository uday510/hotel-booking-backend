const { mockRequest, mockResponse } = require('../interceptor');
const { create } = require('../../controllers/hotel.controller');
const User = require('../../models/user.model');
const Hotel = require('../../models/hotel.model');
const dbHandler = require('../db');

/**
 * Setup before running the test suite.
 */
beforeAll(async () => await dbHandler.connect());


/**
 * Cleanup after running the test suite.
 */
afterAll(async () => await dbHandler.closeDatabase());

/**
 * Test payload for a user.
 * @type {{
 *   email: string,
 *   userId: string,
 *   name: string,
 *   type: string,
 *   password: string
 * }}
 */
const userTestPayload = {
  email: "uday510@icloud.com",
  userId: "uday10",
  name: "uday",
  type: "admin",
  password: "Budd@i1028"
};

/**
 * Test payload for a hotel.
 * @type {{
 *   hotelId: string,
 *   name: string,
 *   location: string,
 *   price: number
 * }}
 */
const hotelTestPayload = {
  hotelId: "hotel100",
  name: "The Grand Hotel",
  location: "Delhi",
  price: 5000,
};

/**
 * Test payload for creating a hotel.
 * @type {{
 *   hotelId: string,
 *   name: string,
 *   bookings: [],
 *   location: string,
 *   price: number,
 *   createdAt: number,
 *   updatedAt: number
 * }}
 */
const hotelCreateTestPayLoad = {
  hotelId: "hotel100",
  name: "The Grand Hotel",
  bookings: [],
  location: "Delhi",
  price: 5000,
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

describe('Hotel Controller', () => {
  /**
   * Test case: should create a hotel.
   */
  it('should create a hotel', async () => {
    const userSpy = jest.spyOn(User, 'findOne').mockReturnValue(Promise.resolve(userTestPayload));
    const hotelSpy = jest.spyOn(Hotel, 'create').mockReturnValue(Promise.resolve(hotelCreateTestPayLoad));

    const req = mockRequest();
    const res = mockResponse();

    req.body = hotelTestPayload;
    req.userId = userTestPayload.userId;

    await create(req, res);
    expect(userSpy).toHaveBeenCalled();
    expect(hotelSpy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith({
      success: true,
      message: "Hotel created successfully.",
      statusCode: 201,
      data: expect.objectContaining(hotelTestPayload),
    });
  });

  /**
   * Test case: should return 404 if user not found.
   */
  it("should return 404 if user not found", async () => {
    const userSpy = jest.spyOn(User, 'findOne').mockReturnValue(Promise.resolve(null));
    const hotelSpy = jest.spyOn(Hotel, 'create').mockReturnValue(Promise.resolve(hotelCreateTestPayLoad));

    const req = mockRequest();
    const res = mockResponse();

    req.body = hotelTestPayload;
    req.userId = userTestPayload.userId;
    await create(req, res);
    expect(userSpy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({
      success: false,
      message: "User not found.",
      statusCode: 404,
    });
  });

});
