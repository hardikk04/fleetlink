const bookingModel = require("../models/Booking-model");
const vehicleModel = require("../models/Vehicle-model");
const {
  getAvailablevehicleZodSchema,
  vehicleZodSchema,
} = require("../utils/validation");

const addVehicle = async (req, res) => {
  const result = vehicleZodSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ error: "Missing data in add vehicle" });
  }

  const vehicle = await vehicleModel.create(result.data);
  vehicle.isAvailable = true;
  await vehicle.save();
  return res.status(201).json(vehicle);
};

const getAllVehicle = async (req,res)=>{
  const vehicle = await vehicleModel.find();
  return res.status(201).json(vehicle);
}

const getAvailableVehicles = async (req, res) => {
  const result = getAvailablevehicleZodSchema.safeParse(req.query);
  if (!result.success) {
    return res
      .status(400)
      .json({ error: "Missing data in get available vehicles" });
  }
  const { capacityRequired, fromPincode, toPincode, startTime } = result.data;

  const start = new Date(startTime);
  const now = new Date();

  if (isNaN(start.getTime()) || start < now) {
    return res
      .status(400)
      .json({ error: "startTime must be a valid future date/time" });
  }

  const estimatedRideDurationHours =
    Math.abs(parseInt(toPincode) - parseInt(fromPincode)) % 24;

  const end = new Date(
    start.getTime() + estimatedRideDurationHours * 60 * 60 * 1000
  );

  const allVehicles = await vehicleModel.find({
    capacityKg: { $gte: parseInt(capacityRequired) },
  });

  const bookings = await bookingModel.find({
    $or: [{ startTime: { $lt: end }, endTime: { $gt: start } }],
  });

  const bookedIds = bookings.map((b) => b.vehicleId.toString());
  const availableVehicles = allVehicles.filter(
    (v) => !bookedIds.includes(v._id.toString())
  );

  res.json({ vehicles: availableVehicles, estimatedRideDurationHours });
};

module.exports = { addVehicle, getAvailableVehicles,getAllVehicle };
