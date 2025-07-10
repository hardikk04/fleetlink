import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";

import AllVehicles from "./components/AllVehicles";
import AllAvailable from "./components/AllAvailable";
import AllBooked from "./components/AllBooked";

const App = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/allvehicles" element={<AllVehicles />}></Route>
        <Route path="/available" element={<AllAvailable />}></Route>
        <Route path="/booked" element={<AllBooked />}></Route>
      </Routes>
    </div>
  );
};

export default App;
