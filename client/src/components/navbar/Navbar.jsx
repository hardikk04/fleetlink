import { Truck } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-white shadow-sm ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Truck className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">FleetLink</h1>
              <p className="text-sm text-gray-500">
                Logistics Vehicle Booking System
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                Admin Dashboard
              </p>
              <p className="text-xs text-gray-500">
                Manage your fleet efficiently
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
