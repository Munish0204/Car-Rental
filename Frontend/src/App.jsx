import React from "react";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-blue-700 mb-4 text-center">
          Car Rental App
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Welcome to your car rental platform. Start exploring and book your ride!
        </p>
        <div className="flex justify-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;