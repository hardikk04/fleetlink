import { toast } from "react-toastify";
import axios from "../../utils/axios";
import { v4 as uuidv4 } from "uuid";
import React, { useState } from "react";

const SearchForm = () => {
  const notify = (msg) => toast(msg);

  const [formData, setFormData] = useState({
    capacityRequired: "",
    startTime: "",
    fromPincode: "",
    toPincode: "",
  });

  const [vehicles, setVehicles] = useState([]);
  const [estimatedRideDurationHours, setEstimatedRideDurationHours] =
    useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // API call or state update logic here
    try {
      const result = await axios.get("/vehicles/available", {
        params: formData,
      });

      setVehicles(result.data.vehicles);
      console.log(vehicles.length);

      setEstimatedRideDurationHours(result.data.estimatedRideDurationHours);
    } catch (error) {
      notify("Error adding vehicle: ", error);
    }
  };

  const bookVehicle = async (_id, fromPincode, startTime, toPincode) => {
    try {
      const uniqueId = uuidv4();

      const result = await axios.post("/bookings", {
        vehicleId: _id,
        fromPincode,
        startTime,
        toPincode,
        customerId: uniqueId,
      });
      console.log("Vehicle Booked: ", result.data);

      notify("Vehicle Booked");

      const result1 = await axios.get("/vehicles/available", {
        params: formData,
      });

      setVehicles(result1.data.vehicles);

      setEstimatedRideDurationHours(result1.data.estimatedRideDurationHours);
    } catch (error) {
      notify("Error adding vehicle: ", error);
    }
  };

  return (
    <>
      <div className="mx-auto p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-1">
          <span className="bg-green-100 p-1 rounded-full">
            <svg
              className="w-5 h-5 text-green-600"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M21 21l-4.35-4.35M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" />
            </svg>
          </span>
          Search Available Vehicles
        </h2>
        <p className="text-gray-500 mb-4 text-sm">
          Find and book vehicles based on your capacity and route requirements
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Capacity Required (KG) *
              </label>
              <input
                type="number"
                name="capacityRequired"
                placeholder="e.g., 1000"
                value={formData.capacityRequired}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Start Date & Time *
              </label>
              <input
                type="datetime-local"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                From Pincode *
              </label>
              <input
                type="text"
                name="fromPincode"
                placeholder="e.g., 110001"
                value={formData.fromPincode}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                To Pincode *
              </label>
              <input
                type="text"
                name="toPincode"
                placeholder="e.g., 110002"
                value={formData.toPincode}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full mt-4 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition flex items-center justify-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M21 21l-4.35-4.35M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" />
            </svg>
            Search Availability
          </button>
        </form>
      </div>
      {vehicles.length >= 0 && (
        <div
          className={`${
            vehicles.length != 0
              ? "bg-green-100 border-green-300 text-green-800"
              : "bg-red-100 border-red-300 text-red-800"
          } border px-4 py-5 rounded mb-4 flex items-center gap-2 my-4`}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
          Found {vehicles.length} available vehicle(s) for your requirements.
        </div>
      )}

      <div className="">
        {/* Vehicle Cards */}
        {vehicles.map((vehicle, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-md shadow-sm mt-2 p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          >
            <div>
              <h3 className="text-lg font-semibold text-blue-800 flex items-center gap-2">
                <span role="img" aria-label="truck">
                  🚚
                </span>
                {vehicle.name}
              </h3>
              <div className="text-sm text-gray-600 mt-1 flex flex-wrap gap-3">
                <span>🛞 {vehicle.tyres} Tyres</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-2 text-xs font-medium">
                {vehicle.isAvailable ? (
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                    Available
                  </span>
                ) : (
                  <span className="bg-red-100 text-white-800 px-2 py-1 rounded">
                    Unvailable
                  </span>
                )}

                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">
                  Capacity: {vehicle.capacityKg}kg
                </span>
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">
                  Est. Duration: {estimatedRideDurationHours}h
                </span>
              </div>
            </div>

            <div className="text-sm text-right">
              <button
                onClick={() =>
                  bookVehicle(
                    vehicle._id,
                    formData.fromPincode,
                    formData.startTime,
                    formData.toPincode
                  )
                }
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SearchForm;
