// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dbConfig = require('./configs/db.config.js');
const serverConfig = require('./configs/server.config.js');

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

app.get("/", (req, res) => {
  res.send("Server Health: OK!");
});

// Initialize routes
require("./routes/index.js")(app);

// Connect to the Database
mongoose
  .connect(dbConfig.DB_URL)
  .then(() => {
    app.listen(4000);
    console.log(`Server is running on ${serverConfig.PORT}`);
  })
  .catch((err) => {
    console.error("Database connection error:", err);
    process.exit(1); // Exit the application with an error code
  });
