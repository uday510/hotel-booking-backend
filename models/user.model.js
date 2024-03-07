const { UserType } = require("../utils/util");
const mongoose = require('mongoose');
/**
 * @typedef {Object} UserSchema
 * @property {string} name - User's name.
 * @property {string} email - User's email (must be unique).
 * @property {string} password - User's hashed password.
 * @property {('user' | 'admin')} type - User type, either 'user' or 'admin'.
 * @property {string} userId - Unique identifier for the user (must be unique).
 * @property {mongoose.Schema.Types.ObjectId[]} hotels - Array of Hotel references.
 * @property {Date} createdAt - Date when the user was created.
 * @property {Date} updatedAt - Date when the user was last updated.
 */

/**
 * Mongoose schema for the User model.
 *
 * @type {mongoose.Schema<UserSchema>}
 */
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: [UserType.USER, UserType.ADMIN],
    default: UserType.USER
  },
  userId: {
    type: String,
    required: true,
    unique: true
  },
  bookings: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Booking',
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * Mongoose model for the User schema.
 *
 * @typedef {import('mongoose').Model<UserSchema, {}, {}>} UserModel
 */

/**
 * @type {UserModel}
 */
const User = mongoose.model('User', userSchema);

module.exports = User;
