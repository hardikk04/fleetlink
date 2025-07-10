import React, { useEffect, useState } from "react";
import Card from "../shared/Card";
import { Truck, Plus, Search, Calendar } from "lucide-react";
import SearchBookForm from "../vehicle/SearchBookForm";
import Booking from "../booking/Booking";
import axios from "../../utils/axios";

const Home = () => {
  const [formValue, setformValue] = useState("book");
  const [allVehicles, setallVehicles] = useState([]);
  const [allAvailableVehicles, setallAvailableVehicles] = useState([]);
  const [allActiveBookingVehicles, setAllActiveBookingVehicles] = useState([]);
  const getAllVehicle = async () => {
    const allVehicle = await axios.get("/vehicles/all");
    setallVehicles(allVehicle.data);
    const allAvailableVehicle = allVehicle.data.filter((v) => v.isAvailable);
    setallAvailableVehicles(allAvailableVehicle);
    const allActiveBookingVehicle = allVehicle.data.filter(
      (v) => v.isAvailable === false
    );
    setAllActiveBookingVehicles(allActiveBookingVehicle);
  };
  useEffect(() => {
    getAllVehicle();
  }, [allVehicles]);
  return (
    <main className="">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card
          icon={<Truck className="h-6 w-6 text-blue-600" />}
          title={"Total Vehicles"}
          number={allVehicles.length}
          link={"/allvehicles"}
        ></Card>
        <Card
          icon={<Search className="h-6 w-6 text-green-600" />}
          title={"Available Now"}
          number={allAvailableVehicles.length}
          link={"/available"}

        ></Card>
        <Card
          icon={<Calendar className="h-6 w-6 text-yellow-600" />}
          title={"Active Bookings"}
          number={allActiveBookingVehicles.length}
          link={"/booked"}
        ></Card>
      </div>
      <div className="grid w-full grid-cols-2 bg-[#F5F5F5] rounded-lg p-1">
        <div
          value="search"
          className={`flex items-center justify-center space-x-2 ${
            formValue === "book" && "bg-white"
          } p-2 rounded-md cursor-pointer`}
          onClick={() => setformValue(() => "book")}
        >
          <Search className="h-4 w-4" />
          <span>Search & Book</span>
        </div>
        <div
          value="add"
          className={`flex items-center justify-center space-x-2 ${
            formValue === "add" && "bg-white"
          } p-2 rounded-md cursor-pointer`}
          onClick={() => setformValue(() => "add")}
        >
          <Plus className="h-4 w-4" />
          <span>Add Vehicle</span>
        </div>
      </div>
      <div className="py-6">
        {formValue === "book" ? <SearchBookForm /> : <Booking />}
      </div>
    </main>
  );
};

export default Home;
