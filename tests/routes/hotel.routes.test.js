const request = require('supertest');
const app = require('../../index');
const db = require('../db');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../configs/auth.config');
const User = require('../../models/user.model');

/**
 * Clears the database before each test.
 */
beforeEach(async () => {
  await db.clearDatabase();
});

/**
 * Closes the database connection and the server after all tests.
 */
afterAll(async () => {
  await db.closeDatabase();
});

/**
 * Base URL for the hotels API.
 * @type {string}
 */
const API_URL = '/v1/hotels';

/**
 * Payload for creating a new hotel.
 * @type {Object}
 */
const hotelPayload = {
  hotelId: "hote999",
  name: "Hotel Heaven",
  location: "City Z",
  price: 1299
};

/**
 * Test suite for the POST /hotels endpoint.
 */
describe('POST /hotels', () => {
  /**
   * Test case for creating a new hotel.
   */
  it('Should create a new hotel', async () => {
    // Generate a token for authentication
    const token = jwt.sign({ id: 'uday510' }, JWT_SECRET, { expiresIn: 120 });

    // Send a request to create a new hotel
    const response = await request(app)
      .post(API_URL)
      .set("x-access-token", token)
      .send(hotelPayload);

    // Assertions for the response
    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Hotel created successfully');
  });
});
