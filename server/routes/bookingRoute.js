const express = require("express");
const {
  bookVehicle,
  getAllBooked,
  deleteBooking,
} = require("../controllers/bookingController");

const router = express.Router();

router.post("/", bookVehicle);
router.get("/all", getAllBooked);
router.delete("/delete", deleteBooking);

module.exports = router;
