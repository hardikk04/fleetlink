const express = require("express");
require("dotenv").config();

const connectDB = require("./config/db");
const cors = require('cors');
const vehicleRouter = require("./routes/vehicleRoute");
const bookingRouter = require("./routes/bookingRoute");

const app = express();

app.use(cors({
  origin: '*',              // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connectDB();

app.use("/api/vehicles/", vehicleRouter);
app.use("/api/bookings", bookingRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
