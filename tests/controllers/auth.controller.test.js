const { mockRequest, mockResponse } = require('../interceptor');
const { signup, signin } = require('../../controllers/auth.controller');
const User = require('../../models/user.model');
const dbHandler = require('../db');
const bcrypt = require('bcryptjs');

/**
 * Set up the database connection before running the tests.
 */
beforeAll(async () => await dbHandler.connect());


/**
 * Close the database connection after running all the tests.
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
const testPayload = {
  email: "uday510@icloud.com",
  userId: "uday10",
  name: "uday",
  type: "admin",
  password: "Budd@i1028"
};

/**
 * Tests for the Signup functionality.
 */
describe('Signup', () => {
  /**
   * Test to check if a user can be successfully registered.
   */
  it('should register a user', async () => {
    const req = mockRequest();
    const res = mockResponse();
    req.body = testPayload;

    await signup(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalled();
    expect(res.send).toHaveBeenCalledWith({
      statusCode: 201,
      data: {
        name: testPayload.name,
        userId: testPayload.userId,
        email: testPayload.email,
        type: testPayload.type,
        bookings: []
      },
      message: "User created successfully",
      success: true
    });
  });

  /**
   * Test to check if a user is not registered with missing fields.
   */
  it('should not register a user with missing fields', async () => {
    const req = mockRequest();
    const res = mockResponse();
    req.body = {
      email: "uday510@icloud.com",
      name: "uday",
      password: "Budd@i1028"
    };

    await signup(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalled();
    expect(res.send).toHaveBeenCalledWith({
      statusCode: 500,
      message: "Internal server error while creating user: User validation failed: userId: Path `userId` is required.",
      success: false
    });
  });
});

/**
 * Tests for the Signin functionality.
 */
describe('Signin', () => {
  /**
   * Test to check if a user can successfully sign in.
   */
  it('should signin a user', async () => {
    const req = mockRequest();
    const res = mockResponse();
    req.body = {
      email: testPayload.email,
      password: testPayload.password
    };

    const userSpy = jest.spyOn(User, 'findOne').mockReturnValue(Promise.resolve(testPayload));
    const bcryptSpy = jest.spyOn(bcrypt, 'compareSync').mockReturnValue(true);

    await signin(req, res);

    expect(userSpy).toHaveBeenCalled();
    expect(bcryptSpy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalled();
  });

  /**
   * Test to check if a user cannot sign in with the wrong password.
   */
  it('should not signin a user with wrong password', async () => {
    const req = mockRequest();
    const res = mockResponse();
    req.body = {
      email: testPayload.email,
      password: "wrongPassword"
    };

    const userSpy = jest.spyOn(User, 'findOne').mockReturnValue(Promise.resolve(testPayload));
    const bcryptSpy = jest.spyOn(bcrypt, 'compareSync').mockReturnValue(false);

    await signin(req, res);

    expect(userSpy).toHaveBeenCalled();
    expect(bcryptSpy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalled();
    expect(res.send).toHaveBeenCalledWith({
      statusCode: 401,
      message: "Invalid Password",
      success: false
    });
  });
});
