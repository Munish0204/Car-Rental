import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Users, Gauge, Fuel, Settings, Star, Shield } from 'lucide-react';

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/cars/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch car details');
        }
        
        const data = await response.json();
        setCar(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching car details:', error);
        setError('Unable to load car details. Please try again later.');
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-blue-400 text-xl">Loading car details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
        <div className="text-red-400 text-xl mb-4">{error}</div>
        <button 
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <button 
          className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 mb-6 transition-colors"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Home</span>
        </button>

        <div className="bg-black rounded-lg border border-blue-900/40 overflow-hidden shadow-lg">
          {/* Car Images */}
          <div className="relative h-[300px] md:h-[400px] bg-gray-800">
            {car.images && car.images.length > 0 ? (
              <img 
                src={car.images[0]} 
                alt={`${car.make} ${car.model}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No image available
              </div>
            )}
            <div className="absolute top-4 right-4 bg-blue-600 text-white py-1 px-3 rounded-full font-semibold">
              ${car.pricePerDay} / day
            </div>
          </div>

          {/* Car Info */}
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-2">{car.make} {car.model}</h1>
            <div className="flex items-center mb-4">
              <div className="flex items-center text-yellow-400 mr-2">
                <Star className="h-5 w-5 fill-current" />
                <span className="ml-1 font-medium">{car.rating || 4.8}</span>
              </div>
              <span className="text-gray-400">({car.reviews || 28} reviews)</span>
            </div>

            <p className="text-gray-300 mb-8">{car.description || `Experience the thrill of driving the ${car.year} ${car.make} ${car.model}. This vehicle combines performance, comfort, and style for an unforgettable driving experience.`}</p>

            {/* Car Specifications */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center text-blue-400 mb-2">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span className="font-semibold">Year</span>
                </div>
                <p className="text-lg">{car.year}</p>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center text-blue-400 mb-2">
                  <Users className="h-5 w-5 mr-2" />
                  <span className="font-semibold">Capacity</span>
                </div>
                <p className="text-lg">{car.capacity || 5} Persons</p>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center text-blue-400 mb-2">
                  <Fuel className="h-5 w-5 mr-2" />
                  <span className="font-semibold">Fuel Type</span>
                </div>
                <p className="text-lg">{car.fuelType || 'Gasoline'}</p>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center text-blue-400 mb-2">
                  <Settings className="h-5 w-5 mr-2" />
                  <span className="font-semibold">Transmission</span>
                </div>
                <p className="text-lg">{car.transmission || 'Automatic'}</p>
              </div>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Car Features</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {car.features ? (
                  car.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Shield className="h-4 w-4 text-blue-400 mr-2" />
                      <span>{feature}</span>
                    </div>
                  ))
                ) : (
                  ['Air Conditioning', 'Bluetooth', 'Backup Camera', 'Navigation', 'Sunroof', 'Heated Seats'].map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Shield className="h-4 w-4 text-blue-400 mr-2" />
                      <span>{feature}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Booking Section */}
            <div className="border-t border-gray-800 pt-6 mt-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <span className="text-gray-400">Rental Price</span>
                  <div className="text-3xl font-bold">${car.pricePerDay} <span className="text-lg font-normal text-gray-400">/ day</span></div>
                </div>
                
                <Link
                  to={`/booking/${car._id}`}
                  className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;