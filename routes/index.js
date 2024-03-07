const authRoutes = require("./auth.routes");
const hotelRoutes = require("./hotel.routes");
const bookingRoutes = require("./booking.routes");

module.exports = (app) => {
  hotelRoutes(app),
  bookingRoutes(app),
  authRoutes(app)
  app.get("/api/v1", (req, res) => res.send("Welcome to Hotel Management System"));
}