const express = require("express");
const { addVehicle, getAvailableVehicles, getAllVehicle } = require("../controllers/vehicleController");

const router = express.Router();

router.post("/", addVehicle);
router.get("/available", getAvailableVehicles);
router.get("/all", getAllVehicle);

module.exports = router;
