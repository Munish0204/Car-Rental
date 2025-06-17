import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

const Location = () => {
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [showMap, setShowMap] = useState(false);

  const handleFindNearest = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setShowMap(true);
      },
      (err) => {
        console.error('Location error:', err);
        alert("Couldn't get your location. Please allow location access.");
      }
    );
  };

  const branches = [
    {
      name: 'TopCar - Chennai Central',
      address: '123 Main St, Chennai',
      image: 'https://source.unsplash.com/400x250/?car,suv',
      types: ['SUV', 'Sedan'],
    },
    {
      name: 'TopCar - Velachery',
      address: '456 Grand Rd, Chennai',
      image: 'https://source.unsplash.com/400x250/?car,hatchback',
      types: ['Hatchback', 'Electric'],
    },
    {
      name: 'TopCar - Tambaram',
      address: '789 Market Rd, Chennai',
      image: 'https://source.unsplash.com/400x250/?luxury,car',
      types: ['Luxury', 'Convertible'],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#040617] to-[#0a0c1f] text-white px-4 py-10">
      
      {/* Top Section */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="bg-blue-900 p-4 rounded-full mb-4 shadow-md shadow-blue-600/40">
          <FaMapMarkerAlt className="text-3xl text-cyan-300" />
        </div>
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
          Our Locations
        </h1>
        <p className="text-gray-300 mt-2 mb-6 text-lg max-w-md">
          Find your nearest TopCar location for premium car rental services
        </p>
        <div className="flex gap-4">
          <button
            onClick={handleFindNearest}
            className="cursor-pointer flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium px-6 py-2 rounded-full hover:scale-105 hover:brightness-110 transition shadow-md shadow-cyan-500/30"
          >
            <FaMapMarkerAlt /> Find Nearest
          </button>
          <a
            href="tel:+917894561230"
            className="cursor-pointer flex items-center gap-2 border border-cyan-400 px-6 py-2 rounded-full hover:bg-cyan-400 hover:text-black transition"
          >
            <FaPhoneAlt /> Call Now
          </a>
        </div>
      </div>

      {/* Conditional Map */}
      {showMap && (
        <div className="w-full h-96 mb-12 rounded-lg overflow-hidden border-2 border-cyan-600 shadow-lg shadow-cyan-600/20">
          <iframe
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${location.lat},${location.lng}`}
          ></iframe>
        </div>
      )}

      {/* Branch Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {branches.map((branch, idx) => (
          <div
            key={idx}
            className="bg-[#070b1c] p-5 rounded-lg border border-cyan-600 shadow-md shadow-cyan-500/20"
          >
            <img
              src={branch.image}
              alt="Car"
              className="w-full h-40 object-cover rounded-md mb-4 border border-cyan-800"
            />
            <h2 className="text-xl font-semibold text-cyan-300">{branch.name}</h2>
            <p className="text-sm text-gray-300 mb-2">{branch.address}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {branch.types.map((type, i) => (
                <span
                  key={i}
                  className="bg-cyan-700 text-xs px-3 py-1 rounded-full text-white"
                >
                  {type}
                </span>
              ))}
            </div>
            <button className="mt-auto bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded text-white text-sm">
              View on Map
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Location;
