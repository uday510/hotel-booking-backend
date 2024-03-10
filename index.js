/**
 * Module dependencies.
 * @module server
 */

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dbConfig = require('./configs/db.config.js');
const serverConfig = require('./configs/server.config.js');
const cors = require('cors');

/**
 * Express application.
 * @type {express.Application}
 */
const app = express();

const corsOptions = {
  origin: ['http://localhost:3000', 'https://bookings.udayteja.com', '*'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

app.use(cors(corsOptions));

// Configure Express to use JSON body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



/**
 * Middleware that logs the time for every request.
 * @param {express.Request} req - The Express request object.
 * @param {express.Response} res - The Express response object.
 * @param {function} next - The next middleware function.
 */
function requestTime(req, res, next) {
  process.stdout.write(`Request-Date: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} IST, ${req.method} ${req.url} \n`);
  next();
}

app.use(requestTime);

/**
 * Default route.
 * @route GET /
 * @group Health - Server health check
 * @returns {string} 200 - OK response
 */
app.get("/", (req, res) => {
  res.send("Server Health: OK!");
});

// Initialize routes
require("./routes/index.js")(app);

let server; // Declare server variable

/**
 * Connect to the database and start the server.
 */
async function startServer() {
  try {
    // Connect to the database
    await mongoose.connect(dbConfig.DB_URL);
    console.log("Connected to the database!");

    // Start the server after successfully connecting to the database
    server = app.listen(serverConfig.PORT, () => {
      console.log(`Server is running on port ${serverConfig.PORT}`);
    });
  } catch (err) {
    console.log("Cannot connect to the database!", err);
    process.exit(1);
  }
}

// Start the server
startServer();

/**
 * Handle graceful shutdown.
 * @event SIGTERM
 */
process.on('SIGTERM', () => {
  console.log('Received SIGTERM. Closing server gracefully.');
  if (server) {
    server.close(() => {
      console.log('Server closed. Exiting process.');
      process.exit(0);
    });
  }
});

/**
 * Express application instance.
 * @type {express.Application}
 * @exports app
 */
module.exports = app;
