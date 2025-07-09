const bookingModel = require("../models/Booking-model");
const vehicleModel = require("../models/Vehicle-model");
const { bookingZodSchema } = require("../utils/validation");

const bookVehicle = async (req, res) => {
  const result = bookingZodSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: "Missing data in book vehicle" });
  }

  const { vehicleId, fromPincode, toPincode, startTime, customerId } =
    result.data;

  const vehicle = await vehicleModel.findById(vehicleId);
  if (!vehicle) return res.status(404).json({ error: "Vehicle not found" });

  const estimatedRideDurationHours =
    Math.abs(parseInt(toPincode) - parseInt(fromPincode)) % 24;
  const start = new Date(startTime);
  const now = new Date();
  const end = new Date(
    start.getTime() + estimatedRideDurationHours * 60 * 60 * 1000
  );



  if (isNaN(start.getTime()) || start < now) {
    return res
      .status(400)
      .json({ error: "startTime must be a valid future date/time" });
  }

  const conflict = await bookingModel.findOne({
    vehicleId,
    $or: [{ startTime: { $lt: end }, endTime: { $gt: start } }],
  });

  if (conflict)
    return res
      .status(409)
      .json({ error: "Vehicle already booked for this time slot" });

  const booking = await bookingModel.create({
    vehicleId,
    fromPincode,
    toPincode,
    startTime: start,
    endTime: end,
    customerId,
  });

  res.status(201).json(booking);
};

module.exports = { bookVehicle };
