import axios from "../../utils/axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Booking = () => {
  const notify = (msg) => toast(msg);
  const [formData, setFormData] = useState({
    name: "",
    capacityKg: null,
    tyres: null,
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // API call or state update logic here
    try {
      const result = await axios.post("/vehicles", formData);
      console.log("Vehicle added: ", result.data);
      notify("Vehicle Added");
      setFormData({ name: "", capacityKg: null, tyres: null });
    } catch (error) {
      notify("Error adding vehicle: ", error);
    }
  };

  return (
    <div className="mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-1">
        <span className="bg-blue-100 p-2 rounded-full">
          <svg
            className="w-5 h-5 text-blue-600"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path d="M12 4v16m8-8H4" />
          </svg>
        </span>
        Add New Vehicle
      </h2>
      <p className="text-gray-500 mb-4 text-sm">
        Register a new vehicle to your fleet for booking management
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Vehicle Name *
            </label>
            <input
              type="text"
              name="name"
              placeholder="e.g., Truck-001, Delivery Van A"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Capacity (KG) *
            </label>
            <input
              type="number"
              name="capacityKg"
              placeholder="e.g., 1000, 2500"
              value={formData.capacityKg}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Number of Tyres *
          </label>
          <input
            type="number"
            name="tyres"
            placeholder="e.g., 4, 6, 8"
            value={formData.tyres}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="bg-gray-50 p-4 rounded mt-4">
          <p className="font-semibold mb-2">Vehicle Preview</p>
          <p className="flex items-center gap-2 text-gray-700 text-sm">
            <span role="img" aria-label="truck">
              🚚
            </span>
            <span>Vehicle Name: {formData.vehicleName || "Vehicle Name"}</span>
            <span>Capacity: {formData.capacityKg || 0} KG</span>
            <span>Tyres: {formData.tyres || 0}</span>
          </p>
        </div>

        <button
          type="submit"
          className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition flex items-center justify-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path d="M12 4v16m8-8H4" />
          </svg>
          Add Vehicle to Fleet
        </button>
      </form>
    </div>
  );
};

export default Booking;
