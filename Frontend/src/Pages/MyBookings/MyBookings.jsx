import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Car as CarIcon, User, MapPin, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

const MyBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          navigate('/login?redirect=my-bookings');
          return;
        }

        const response = await fetch('http://localhost:8000/api/bookings/my', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }
        
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setError('Unable to load your bookings. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMyBookings();
  }, [navigate]);

  const getBookingStatus = (booking) => {
    const now = new Date();
    const startDate = new Date(booking.startDate);
    const endDate = new Date(booking.endDate);

    if (booking.status === 'cancelled') return 'cancelled';
    if (now < startDate) return 'upcoming';
    if (now >= startDate && now <= endDate) return 'active';
    return 'completed';
  };

  // Format date to display in a readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-blue-400 text-xl">Loading your bookings...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-900 via-blue-900/30 to-gray-900 pt-10 pb-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <button 
            className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 mb-10 transition-all hover:translate-x-[-5px]"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </button>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="text-blue-400">Bookings</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Manage and track all your car rental reservations in one place.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-4 -mt-16">
        {error ? (
          <div className="bg-red-900/40 border border-red-500 text-red-100 px-6 py-4 rounded-xl mb-6">
            <div className="flex items-start">
              <AlertTriangle className="h-6 w-6 text-red-400 mr-3" />
              <p>{error}</p>
            </div>
          </div>
        ) : bookings.length === 0 ? (
          <div className="bg-black/80 backdrop-blur-sm border border-blue-900/40 rounded-xl shadow-xl p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-900/30 mb-6">
              <CarIcon className="h-8 w-8 text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold mb-3">No bookings yet</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              You haven't made any car bookings yet. Browse our collection of cars and book your first rental.
            </p>
            <button 
              onClick={() => navigate('/cars')}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-lg font-medium transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-blue-600/20"
            >
              Browse Cars
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Filter or tabs can be added here */}
            <div className="mb-6 flex gap-4">
              <button className="bg-blue-600 px-4 py-2 rounded-lg font-medium">All Bookings</button>
              <button className="text-gray-400 hover:text-white px-4 py-2 rounded-lg font-medium">Upcoming</button>
              <button className="text-gray-400 hover:text-white px-4 py-2 rounded-lg font-medium">Active</button>
              <button className="text-gray-400 hover:text-white px-4 py-2 rounded-lg font-medium">Completed</button>
            </div>

            {/* Booking cards */}
            {bookings.map((booking) => {
              const status = getBookingStatus(booking);
              const car = booking.car; // Assuming booking has car info nested
              
              return (
                <div key={booking._id} className="bg-black/80 backdrop-blur-sm border border-blue-900/40 rounded-xl overflow-hidden shadow-xl">
                  {/* Status indicator */}
                  <div className={`px-4 py-2 text-xs font-medium flex items-center justify-center
                    ${status === 'active' ? 'bg-green-900/70 text-green-400' : 
                      status === 'upcoming' ? 'bg-blue-900/70 text-blue-400' : 
                      status === 'cancelled' ? 'bg-red-900/70 text-red-400' : 
                      'bg-gray-800 text-gray-400'}`}
                  >
                    {status === 'active' ? (
                      <><CheckCircle className="h-3 w-3 mr-1" /> Active Rental</>
                    ) : status === 'upcoming' ? (
                      <><Calendar className="h-3 w-3 mr-1" /> Upcoming</>
                    ) : status === 'cancelled' ? (
                      <><XCircle className="h-3 w-3 mr-1" /> Cancelled</>
                    ) : (
                      <><CheckCircle className="h-3 w-3 mr-1" /> Completed</>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row">
                      {/* Car image */}
                      <div className="md:w-1/4 mb-4 md:mb-0">
                        <div className="bg-gray-800 rounded-lg overflow-hidden h-48 md:h-32">
                          {car?.images && car.images.length > 0 ? (
                            <img 
                              src={car.images[0]} 
                              alt={`${car.make} ${car.model}`} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <CarIcon className="h-12 w-12 text-gray-700" />
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Booking details */}
                      <div className="md:w-3/4 md:pl-6">
                        <div className="flex flex-wrap justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold">{car?.make} {car?.model}</h3>
                            <p className="text-gray-400">{car?.year} · {car?.transmission}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-blue-400">${booking.totalAmount.toFixed(2)}</div>
                            <p className="text-sm text-gray-500">Booking #{booking._id.slice(-6)}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 text-blue-400 mr-2" />
                              <span className="text-sm text-gray-400">Pickup</span>
                            </div>
                            <p className="font-medium">{formatDate(booking.startDate)}</p>
                          </div>
                          <div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 text-blue-400 mr-2" />
                              <span className="text-sm text-gray-400">Return</span>
                            </div>
                            <p className="font-medium">{formatDate(booking.endDate)}</p>
                          </div>
                          <div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 text-blue-400 mr-2" />
                              <span className="text-sm text-gray-400">Duration</span>
                            </div>
                            <p className="font-medium">
                              {Math.ceil((new Date(booking.endDate) - new Date(booking.startDate)) / (1000 * 60 * 60 * 24))} days
                            </p>
                          </div>
                        </div>
                        
                        {/* Action buttons */}
                        <div className="flex flex-wrap gap-3">
                          <button 
                            onClick={() => navigate(`/booking-details/${booking._id}`)}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                          >
                            View Details
                          </button>
                          
                          {status === 'upcoming' && (
                            <>
                              <button className="px-4 py-2 bg-transparent border border-blue-500 text-blue-400 hover:bg-blue-900/20 rounded-lg text-sm font-medium transition-colors">
                                Modify
                              </button>
                              <button className="px-4 py-2 bg-transparent border border-red-500 text-red-400 hover:bg-red-900/20 rounded-lg text-sm font-medium transition-colors">
                                Cancel
                              </button>
                            </>
                          )}
                          
                          {status === 'completed' && (
                            <button className="px-4 py-2 bg-transparent border border-gray-600 text-gray-400 hover:bg-gray-800 rounded-lg text-sm font-medium transition-colors">
                              Leave Review
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;