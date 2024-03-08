const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../index'); // Adjust the path accordingly
const dbConfig = require('../../configs/db.config.js');


beforeAll(async () => {
  await mongoose.connect(dbConfig.DB_URL);
});


afterAll(async () => {
  await mongoose.connection.close();
})

test('should check if the server is running', () => {
  return request(app).get('/').expect(200);
});