// Clear console to enhance visibility
console.clear();

// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dbConfig = require('./configs/db.config.js');
const serverConfig = require('./configs/server.config.js');
const routes = require('./routes/index.js'); // Import routes module

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
  .connect(dbConfig.DB_URL, {
    useNewUrlParser: true, // To avoid Deprecation Warning
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(4000);
    console.log(`Server is running on ${serverConfig.PORT}`);
  })
  .catch((err) => {
    throw err;
  });


// Initialize the Express server
/**
 * Start the Express server.
 * @param {number} PORT - The port on which the server will listen.
 */
// module.exports = app.listen(serverConfig.PORT, () => {
//   console.log(`Server is running on port ${serverConfig.PORT}.`);
// });
