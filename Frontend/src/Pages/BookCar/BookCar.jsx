import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, CreditCard, Clock, CheckCircle, AlertCircle, User, Car as CarIcon } from 'lucide-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BookCar = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Booking details
  const [bookingData, setBookingData] = useState({
    carId: carId,
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 3)), // Default to 3 days rental
    paymentMethod: 'card',
    specialRequests: ''
  });

  // Calculate rental duration and total price
  const rentalDays = Math.max(1, Math.ceil((bookingData.endDate - bookingData.startDate) / (1000 * 60 * 60 * 24)));
  const basePrice = car ? car.pricePerDay * rentalDays : 0;
  const serviceFee = basePrice * 0.1; // 10% service fee
  const totalPrice = basePrice + serviceFee;

  // Fetch car details
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/cars/${carId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch car details');
        }
        
        const data = await response.json();
        setCar(data);
      } catch (error) {
        console.error('Error fetching car details:', error);
        setError('Unable to load car details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [carId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData({
      ...bookingData,
      [name]: value
    });
  };

  const handleDateChange = (name, date) => {
    setBookingData({
      ...bookingData,
      [name]: date
    });
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Format dates for the API
      const formattedData = {
        ...bookingData,
        startDate: bookingData.startDate.toISOString(),
        endDate: bookingData.endDate.toISOString(),
        totalAmount: totalPrice
      };

      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/login?redirect=booking');
        return;
      }

      const response = await fetch('http://localhost:8000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formattedData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to book car');
      }

      // Booking successful
      setSuccess(true);
      
      // Redirect to my bookings page after a short delay
      setTimeout(() => {
        navigate('/my-bookings');
      }, 3000);
    } catch (error) {
      console.error('Booking error:', error);
      setError(error.message || 'Failed to book car. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-blue-400 text-xl">Loading booking details...</div>
      </div>
    );
  }

  if (error && !car) {
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
    <div className="min-h-screen bg-gray-900 text-white pb-20">
      {/* Hero Section with Gradient Background */}
      <div className="bg-gradient-to-br from-gray-900 via-blue-900/30 to-gray-900 pt-10 pb-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <button 
            className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 mb-10 transition-all hover:translate-x-[-5px]"
            onClick={() => navigate(`/cars/${carId}`)}
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Car Details</span>
          </button>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Book <span className="text-blue-400">{car?.make} {car?.model}</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Complete your booking details to reserve this car for your dates.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-4 -mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-black/80 backdrop-blur-sm border border-blue-900/40 rounded-2xl overflow-hidden shadow-xl shadow-blue-900/20 mb-8">
              {success && (
                <div className="bg-green-900/40 border-l-4 border-green-500 p-6 flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-400 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="text-green-400 font-medium">Booking Successful!</h3>
                    <p className="text-gray-300 mt-1">Your booking has been confirmed. Redirecting to your bookings...</p>
                  </div>
                </div>
              )}

              {error && !success && (
                <div className="bg-red-900/40 border-l-4 border-red-500 p-6 flex items-start">
                  <AlertCircle className="h-6 w-6 text-red-400 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="text-red-400 font-medium">Booking Failed</h3>
                    <p className="text-gray-300 mt-1">{error}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleBooking} className="p-8">
                <h2 className="text-2xl font-bold mb-6">Booking Details</h2>
                
                {/* Dates Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-gray-300 mb-2">Pickup Date</label>
                    <div className="relative flex items-center">
                      <Calendar className="absolute left-3 text-blue-400 h-5 w-5" />
                      <DatePicker
                        selected={bookingData.startDate}
                        onChange={(date) => handleDateChange('startDate', date)}
                        minDate={new Date()}
                        className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 hover:border-blue-500 rounded-lg text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 mb-2">Return Date</label>
                    <div className="relative flex items-center">
                      <Calendar className="absolute left-3 text-blue-400 h-5 w-5" />
                      <DatePicker
                        selected={bookingData.endDate}
                        onChange={(date) => handleDateChange('endDate', date)}
                        minDate={new Date(bookingData.startDate.getTime() + 24 * 60 * 60 * 1000)} // Next day from start date
                        className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 hover:border-blue-500 rounded-lg text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Payment Method */}
                <div className="mb-8">
                  <label className="block text-gray-300 mb-3">Payment Method</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className={`flex items-center border ${bookingData.paymentMethod === 'card' ? 'border-blue-500 bg-blue-900/20' : 'border-gray-700 bg-gray-800/50'} rounded-lg p-4 cursor-pointer transition-all`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={bookingData.paymentMethod === 'card'}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded-full border-2 ${bookingData.paymentMethod === 'card' ? 'border-blue-500' : 'border-gray-500'} flex items-center justify-center mr-3`}>
                        {bookingData.paymentMethod === 'card' && <div className="w-3 h-3 rounded-full bg-blue-500"></div>}
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center">
                          <CreditCard className="h-5 w-5 text-blue-400 mr-2" />
                          <span className="font-medium">Credit/Debit Card</span>
                        </div>
                        <p className="text-sm text-gray-400 mt-1">Secure payment via credit or debit card</p>
                      </div>
                    </label>
                    
                    <label className={`flex items-center border ${bookingData.paymentMethod === 'paypal' ? 'border-blue-500 bg-blue-900/20' : 'border-gray-700 bg-gray-800/50'} rounded-lg p-4 cursor-pointer transition-all`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        checked={bookingData.paymentMethod === 'paypal'}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded-full border-2 ${bookingData.paymentMethod === 'paypal' ? 'border-blue-500' : 'border-gray-500'} flex items-center justify-center mr-3`}>
                        {bookingData.paymentMethod === 'paypal' && <div className="w-3 h-3 rounded-full bg-blue-500"></div>}
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center">
                          <span className="font-medium">PayPal</span>
                        </div>
                        <p className="text-sm text-gray-400 mt-1">Pay securely with your PayPal account</p>
                      </div>
                    </label>
                  </div>
                </div>
                
                {/* Special Requests */}
                <div className="mb-8">
                  <label htmlFor="specialRequests" className="block text-gray-300 mb-2">Special Requests (Optional)</label>
                  <textarea
                    id="specialRequests"
                    name="specialRequests"
                    value={bookingData.specialRequests}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="Any special requests or notes for your booking..."
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 hover:border-blue-500 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                  ></textarea>
                </div>
                
                <div className="border-t border-gray-800 pt-6 mt-6 flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting || success}
                    className={`px-8 py-3 rounded-lg font-medium transition-all transform ${
                      isSubmitting || success
                        ? 'bg-blue-800 text-blue-200 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white hover:scale-105 hover:shadow-lg hover:shadow-blue-600/20'
                    }`}
                  >
                    {isSubmitting ? 'Processing...' : success ? 'Booked!' : 'Confirm Booking'}
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-black/80 backdrop-blur-sm border border-blue-900/40 rounded-2xl overflow-hidden shadow-xl shadow-blue-900/20 sticky top-4">
              <div className="p-6 border-b border-gray-800">
                <h3 className="text-xl font-bold mb-4">Booking Summary</h3>
                
                {/* Car Details */}
                <div className="flex items-center mb-6">
                  <div className="bg-gray-800 rounded-lg overflow-hidden w-20 h-20 flex-shrink-0">
                    {car?.images && car.images.length > 0 ? (
                      <img 
                        src={car.images[0]} 
                        alt={car.make} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-800">
                        <CarIcon className="h-10 w-10 text-gray-600" />
                      </div>
                    )}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-white">{car?.make} {car?.model}</h4>
                    <p className="text-gray-400 text-sm">{car?.year} · {car?.transmission}</p>
                    <div className="flex items-center mt-1">
                      <User className="h-3 w-3 text-gray-500 mr-1" />
                      <span className="text-gray-400 text-xs">{car?.capacity || 5} seats</span>
                    </div>
                  </div>
                </div>
                
                {/* Dates */}
                <div className="mb-6">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-blue-400 mr-2" />
                      <span>Pickup Date</span>
                    </div>
                    <span className="text-gray-300">{bookingData.startDate.toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-blue-400 mr-2" />
                      <span>Return Date</span>
                    </div>
                    <span className="text-gray-300">{bookingData.endDate.toLocaleDateString()}</span>
                  </div>
                </div>
                
                {/* Duration */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-blue-400 mr-2" />
                    <span className="text-sm">Rental Duration</span>
                  </div>
                  <span className="text-gray-300 font-medium">{rentalDays} {rentalDays === 1 ? 'day' : 'days'}</span>
                </div>
              </div>
              
              {/* Price Breakdown */}
              <div className="p-6">
                <div className="flex justify-between mb-3">
                  <span className="text-gray-400">Base Price ({rentalDays} {rentalDays === 1 ? 'day' : 'days'})</span>
                  <span className="text-white">${basePrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-3">
                  <span className="text-gray-400">Service Fee</span>
                  <span className="text-white">${serviceFee.toFixed(2)}</span>
                </div>
                
                <div className="border-t border-gray-800 my-4"></div>
                
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-blue-400">${totalPrice.toFixed(2)}</span>
                </div>
                
                <p className="text-gray-500 text-xs mt-4">
                  By confirming this booking, you agree to our terms and conditions and cancellation policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Information Section */}
      <div className="container mx-auto max-w-6xl px-4 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-900/20 to-black/90 p-6 rounded-xl border border-blue-900/30 shadow-lg">
            <div className="bg-blue-900/40 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Clock className="text-blue-400 h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Fast & Easy Booking</h3>
            <p className="text-gray-400">
              Our simple booking process takes less than 2 minutes. Choose your dates and confirm your reservation instantly.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-900/20 to-black/90 p-6 rounded-xl border border-blue-900/30 shadow-lg">
            <div className="bg-blue-900/40 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <CreditCard className="text-blue-400 h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Secure Payment</h3>
            <p className="text-gray-400">
              All payments are processed securely. We never store your credit card information.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-900/20 to-black/90 p-6 rounded-xl border border-blue-900/30 shadow-lg">
            <div className="bg-blue-900/40 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <CheckCircle className="text-blue-400 h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Free Cancellation</h3>
            <p className="text-gray-400">
              Plans change? No problem. Free cancellation up to 24 hours before your pickup time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCar;