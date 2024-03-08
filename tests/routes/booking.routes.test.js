const request = require('supertest');
const app = require('../../app');
const db = require('../db');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config');
const User = require('../../models/user.model');

/**
 * Clears the database and creates a user before all tests.
 */
beforeAll(async () => {
  await db.clearDatabase();
  await User.create({
    name: 'uday',
    email: 'uday@icloud.com',
    password: 'P@ssword510',
    userId: 'uday510',
    type: 'admin'
  });
});

/**
 * Closes the database connection and the app after all tests.
 */
afterAll(async () => {
  await db.closeDatabase();
  // Note: The app is usually closed automatically when the Node.js process exits.
  // You may not need to explicitly close it unless there's a specific reason.
  // app.close();
});

/**
 * Base URL for the bookings API.
 * @type {string}
 */
const API_URL = '/v1/bookings';

/**
 * Payload for creating a new booking.
 * @type {Object}
 */
const bookingPayload = {
  hotelId: "hotel10",
  date: "16-05-2024"
};

/**
 * Test suite for the POST /v1/bookings endpoint.
 */
describe('POST /v1/bookings', () => {
  /**
   * Test case for creating a new booking.
   */
  test('It should create a new booking', async () => {
    // Retrieve the user from the database
    const user = await User.findOne({ email: 'uday@icloud.com' });

    // Generate a token for authentication
    const token = jwt.sign({ userId: user.userId }, JWT_SECRET, {
      expiresIn: '1d'
    });

    // Send a request to create a new booking
    const response = await request(app)
      .post(API_URL)
      .set('Authorization', `Bearer ${token}`)
      .send(bookingPayload);

    // Assertions for the response
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('message');
  });
});
