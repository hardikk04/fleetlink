# FleetLink - Logistics Vehicle Booking System

A comprehensive full-stack application for managing and booking logistics vehicles for B2B clients, built with separate client and server architectures.

## 🚀 Features

### Backend (Node.js + Express + MongoDB)
- **Vehicle Management**: Add and manage fleet vehicles
- **Robust Availability Checking**: Complex logic for checking vehicle availability considering existing bookings
- **Booking System**: Handle booking requests with race condition prevention
- **MVC Architecture**: Clean separation of concerns with models, views, and controllers
- **Input Validation**: Robust validation using Zod
- **Error Handling**: Proper error responses

### Frontend (React + TypeScript)
- **Add Vehicle Page**: Form to add new vehicles to the fleet
- **Search & Book Page**: Search for available vehicles and initiate bookings
- **Bookings Management**: View and cancel bookings
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Feedback**: Loading states, success/error messages
- **Modern UI**: Clean interface using Tailwind CSS and Lucide icons

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, React Router, Axios, Lucide React
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, Zod
- **Development**: Nodemon, Concurrently

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd fleetlink
   \`\`\`

2. **Install all dependencies**
   \`\`\`bash
   npm run install-all
   \`\`\`

3. **Set up environment variables**
   
   **Server (.env in server folder):**
   \`\`\`env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/fleetlink
   \`\`\`


4. **Start the development servers**
   \`\`\`bash
   npm run start
   \`\`\`

   This will start both the backend server (port 3000) and frontend client (port 5000).

## 📚 API Documentation

### Base URL
\`\`\`
http://localhost:5000/api
\`\`\`

### Endpoints

#### Vehicles
- `POST /vehicles` - Add a new vehicle
- `GET /vehicles/available` - Get all available vehicles 
- `GET /vehicles/all` - Get all vehicles

#### Bookings
- `POST /bookings` - Create a new booking
- `GET /bookings/all` - Get all booked vehicles 
- `DELETE /bookings/delete` - For delete booking
