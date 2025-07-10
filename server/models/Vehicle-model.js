const mongoose = require("mongoose");

const vehicleSchema = mongoose.Schema({
  name: { type: String, required: true },
  capacityKg: { type: Number, required: true },
  tyres: { type: Number, required: true },
  isAvailable: Boolean,
});

module.exports = mongoose.model("Vehicle", vehicleSchema);
