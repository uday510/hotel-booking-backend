// Clear console to enhance visibility
console.clear();

// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dbConfig = require('./configs/db.config.js');
const serverConfig = require('./configs/server.config');
const routes = require('./routes'); // Import routes module

const app = express();

// Configure Express to use JSON body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Logs time for every request
function requestTime(req, res, next) {
  process.stdout.write(`Request-Date: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} IST, ${req.method} ${req.url} \n`);
  next();
}

app.use(requestTime);

// Initialize routes
require("./routes")(app);

// Connect to MongoDB
try {
  mongoose.connect(dbConfig.DB_URL);
  mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
  });
} catch (err) {
  // Handle database connection error
  console.error('Database connection error', err);
  process.exit(1); // Exit the process with an error code
}

// Initialize the Express server
/**
 * Start the Express server.
 * @param {number} PORT - The port on which the server will listen.
 */
module.exports = app.listen(serverConfig.PORT || 4000, () => {
  console.log(`Server is running on port ${serverConfig.PORT}.`);
});
