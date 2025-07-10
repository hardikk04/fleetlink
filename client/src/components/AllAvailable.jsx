import { Link } from "react-router-dom";
import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";

const AllAvailable = () => {
  const [vehicles, setVehicles] = useState([]);

  const getAllAvailableVehicle = async () => {
    const allVehicle = await axios.get("/vehicles/all");
    const allAvailableVehicle = allVehicle.data.filter((v) => v.isAvailable);

    setVehicles(allAvailableVehicle);
  };

  useEffect(() => {
    getAllAvailableVehicle();
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
            </div>
          </div>

          <div className="text-sm text-right">
            <button
              className={`mt-2 text-white px-4 py-2 rounded transition text-sm ${
                vehicle.isAvailable
                  ? "hover:bg-blue-700 bg-blue-600"
                  : "cursor-not-allowed pointer-events-none hover:bg-red-700 bg-red-600 opacity-60"
              }`}
            >
              {vehicle.isAvailable ? "Available" : "Unvailable"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllAvailable;
