const request = require('supertest');
const app = require('../../index');
const dbHandler = require('../db');

/**
 * Clears the database before all tests.
 */
beforeAll(async () => {
  await dbHandler.clearDatabase();
});

/**
 * Closes the database connection and server after all tests.
 */
afterAll(async () => {
  await dbHandler.closeDatabase();
  app.close();
});

const API_URL = '/v1/auth';

/**
 * Test payload for user creation.
 * @type {Object}
 */
const testPayload = {
  name: 'uday',
  email: 'uday@icloud.com',
  password: 'P@ssword510',
  userId: 'uday510',
  type: 'admin'
};

/**
 * Test suite for the '/signup' endpoint.
 */
describe('POST /signup', () => {
  /**
   * Tests the successful creation of a new user.
   */
  it('Should create a new user', async () => {
    const response = await request(app)
      .post(API_URL + '/signup')
      .send(testPayload);


    // Assertions
    expect(response.status).toEqual(201); // Use toEqual instead of toHaveBeenCalledWith
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('User created successfully');
  });
});
