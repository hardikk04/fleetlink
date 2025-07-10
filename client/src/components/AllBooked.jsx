import { Link } from "react-router-dom";
import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";

const AllBooked = () => {
  const notify = (msg) => toast(msg);

  const [vehicles, setVehicles] = useState([]);

  const getAllBookedVehicle = async () => {
    const allVehicle = await axios.get("/bookings/all");

    setVehicles(allVehicle.data);
    // console.log(vehicles);
  };

  useEffect(() => {
    getAllBookedVehicle();
  }, [vehicles]);
  return (
    <div className="">
      <Link
        to={"/"}
        className="flex items-center gap-2 text-blue-600 hover:underline text-xl pb-4 cursor-pointer"
      >
        <ArrowLeft size={30} />
        Back
      </Link>
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
              {vehicle.vehicleId.name}
            </h3>
            <div className="text-sm text-gray-600 mt-1 flex flex-wrap gap-3">
              <span>🆔 {vehicle.vehicleId._id}</span>
            </div>
            <div className="text-sm text-gray-600 mt-1 flex flex-wrap gap-3">
              <span>🛞 {vehicle.tyres} Tyres</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-2 text-xs font-medium">
              {vehicle.vehicleId.isAvailable ? (
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                  Available
                </span>
              ) : (
                <span className="bg-red-100 text-white-800 px-2 py-1 rounded">
                  Unvailable
                </span>
              )}

              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">
                Capacity: {vehicle.vehicleId.capacityKg}kg
              </span>
              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">
                From Pincode: {vehicle.fromPincode}
              </span>
              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">
                To Pincode: {vehicle.toPincode}
              </span>
            </div>
          </div>

          <div className="text-sm text-right">
            <p>
              <b>Start:</b> {vehicle.startTime}
            </p>
            <p>
              <b>Est. End:</b> {vehicle.endTime}
            </p>
            <div className="flex gap-2 justify-end">
              <button
                className={`mt-2 text-white px-4 py-2 rounded transition text-sm ${
                  vehicle.vehicleId.isAvailable
                    ? "hover:bg-blue-700 bg-blue-600"
                    : "cursor-not-allowed pointer-events-none hover:bg-green-700 bg-green-600 opacity-60"
                }`}
              >
                {vehicle.vehicleId.isAvailable ? "Available" : "Booked"}
              </button>
              <button
                onClick={async () => {
                  try {
                    const result = await axios.delete("/bookings/delete", {
                      data: {
                        id: vehicle._id,
                      },
                    });
                    console.log(result.data);

                    notify("Booking Deleted");
                  } catch (error) {
                    notify("Error adding vehicle: ", error);
                  }
                }}
                className="mt-2 text-white px-4 py-2 rounded transition text-sm hover:bg-red-700 bg-red-600 opacity-60"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllBooked;
