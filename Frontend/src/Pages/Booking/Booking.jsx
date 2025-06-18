import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, Phone, Mail, Car, Users, Shield, Star, CreditCard, CheckCircle } from 'lucide-react';

export default function CarBookingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: '',
    pickupTime: '',
    dropoffDate: '',
    dropoffTime: '',
    carCategory: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    driverLicense: '',
    additionalDrivers: 0,
    insurance: 'standard',
    specialRequests: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleBooking = () => {
    console.log('Booking submitted:', formData);
    alert('Booking request submitted successfully!');
  };

  const carCategories = [
    { id: 'economy', name: 'Economy', price: '$35/day', features: ['4 seats', 'Manual', 'AC'] },
    { id: 'compact', name: 'Compact', price: '$45/day', features: ['5 seats', 'Automatic', 'AC'] },
    { id: 'midsize', name: 'Midsize', price: '$55/day', features: ['5 seats', 'Automatic', 'GPS'] },
    { id: 'luxury', name: 'Luxury', price: '$85/day', features: ['5 seats', 'Premium', 'All features'] },
    { id: 'suv', name: 'SUV', price: '$75/day', features: ['7 seats', 'AWD', 'Spacious'] }
  ];

  const steps = [
    { number: 1, title: 'Booking Details', icon: MapPin },
    { number: 2, title: 'Choose Car', icon: Car },
    { number: 3, title: 'Personal Info', icon: User },
    { number: 4, title: 'Review & Book', icon: CheckCircle }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Book Your <span className="text-purple-400">Car</span>
          </h1>
          <p className="text-slate-300 text-xl max-w-2xl mx-auto">
            Choose your perfect rental car and hit the road with confidence. 
            Simple booking, great prices, and exceptional service.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                  currentStep >= step.number 
                    ? 'bg-purple-600 border-purple-600 text-white' 
                    : 'border-slate-600 text-slate-400'
                }`}>
                  <step.icon size={20} />
                </div>
                <div className="ml-3 hidden md:block">
                  <div className={`text-sm font-medium ${
                    currentStep >= step.number ? 'text-purple-400' : 'text-slate-400'
                  }`}>
                    Step {step.number}
                  </div>
                  <div className={`text-xs ${
                    currentStep >= step.number ? 'text-white' : 'text-slate-500'
                  }`}>
                    {step.title}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-0.5 ml-4 ${
                    currentStep > step.number ? 'bg-purple-600' : 'bg-slate-600'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Booking Details */}
        {currentStep === 1 && (
          <div className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl p-8 mb-8">
            <div className="flex items-center mb-6">
              <MapPin className="text-purple-400 mr-3" size={24} />
              <h2 className="text-2xl font-semibold text-white">Booking Details</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Pickup Location *
                </label>
                <input
                  type="text"
                  name="pickupLocation"
                  value={formData.pickupLocation}
                  onChange={handleInputChange}
                  placeholder="Enter pickup location"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Drop-off Location *
                </label>
                <input
                  type="text"
                  name="dropoffLocation"
                  value={formData.dropoffLocation}
                  onChange={handleInputChange}
                  placeholder="Enter drop-off location"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Pickup Date *
                </label>
                <input
                  type="date"
                  name="pickupDate"
                  value={formData.pickupDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Pickup Time *
                </label>
                <input
                  type="time"
                  name="pickupTime"
                  value={formData.pickupTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Drop-off Date *
                </label>
                <input
                  type="date"
                  name="dropoffDate"
                  value={formData.dropoffDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Drop-off Time *
                </label>
                <input
                  type="time"
                  name="dropoffTime"
                  value={formData.dropoffTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Car Selection */}
        {currentStep === 2 && (
          <div className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl p-8 mb-8">
            <div className="flex items-center mb-6">
              <Car className="text-purple-400 mr-3" size={24} />
              <h2 className="text-2xl font-semibold text-white">Choose Your Car</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {carCategories.map((category) => (
                <div key={category.id} className="relative">
                  <input
                    type="radio"
                    name="carCategory"
                    value={category.id}
                    onChange={handleInputChange}
                    className="sr-only"
                    id={category.id}
                  />
                  <label
                    htmlFor={category.id}
                    className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.carCategory === category.id
                        ? 'border-purple-500 bg-purple-500/20'
                        : 'border-slate-600 bg-slate-800/30 hover:border-slate-500'
                    }`}
                  >
                    <div className="text-white font-semibold mb-1">{category.name}</div>
                    <div className="text-purple-400 font-bold mb-2">{category.price}</div>
                    <div className="space-y-1">
                      {category.features.map((feature, index) => (
                        <div key={index} className="text-sm text-slate-300">• {feature}</div>
                      ))}
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Personal Information */}
        {currentStep === 3 && (
          <div className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl p-8 mb-8">
            <div className="flex items-center mb-6">
              <User className="text-purple-400 mr-3" size={24} />
              <h2 className="text-2xl font-semibold text-white">Personal Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter your first name"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter your last name"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Age *
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  min="18"
                  max="100"
                  placeholder="25"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Driver's License Number *
                </label>
                <input
                  type="text"
                  name="driverLicense"
                  value={formData.driverLicense}
                  onChange={handleInputChange}
                  placeholder="Enter license number"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Additional Drivers
                </label>
                <select
                  name="additionalDrivers"
                  value={formData.additionalDrivers}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value={0}>None</option>
                  <option value={1}>1 Additional Driver (+$10/day)</option>
                  <option value={2}>2 Additional Drivers (+$18/day)</option>
                  <option value={3}>3 Additional Drivers (+$25/day)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Insurance Coverage
                </label>
                <select
                  name="insurance"
                  value={formData.insurance}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="standard">Standard Coverage (Included)</option>
                  <option value="premium">Premium Coverage (+$15/day)</option>
                  <option value="comprehensive">Comprehensive Coverage (+$25/day)</option>
                </select>
              </div>
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Special Requests
              </label>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleInputChange}
                rows={4}
                placeholder="Any special requests or requirements..."
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              />
            </div>
          </div>
        )}

        {/* Step 4: Review & Book */}
        {currentStep === 4 && (
          <div className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl p-8 mb-8">
            <div className="flex items-center mb-6">
              <CheckCircle className="text-purple-400 mr-3" size={24} />
              <h2 className="text-2xl font-semibold text-white">Review Your Booking</h2>
            </div>
            
            <div className="space-y-6">
              {/* Booking Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Trip Details</h3>
                  <div className="space-y-2 text-slate-300">
                    <p><strong>Pickup:</strong> {formData.pickupLocation || 'Not specified'}</p>
                    <p><strong>Drop-off:</strong> {formData.dropoffLocation || 'Not specified'}</p>
                    <p><strong>Pickup Date:</strong> {formData.pickupDate} at {formData.pickupTime}</p>
                    <p><strong>Drop-off Date:</strong> {formData.dropoffDate} at {formData.dropoffTime}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Car & Pricing</h3>
                  <div className="space-y-2 text-slate-300">
                    <p><strong>Vehicle:</strong> {formData.carCategory ? carCategories.find(car => car.id === formData.carCategory)?.name : 'Not selected'}</p>
                    <p><strong>Base Price:</strong> {formData.carCategory ? carCategories.find(car => car.id === formData.carCategory)?.price : '$0/day'}</p>
                    <p><strong>Insurance:</strong> {formData.insurance}</p>
                    <p><strong>Additional Drivers:</strong> {formData.additionalDrivers}</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-slate-600 pt-6">
                <h3 className="text-lg font-semibold text-white mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-300">
                  <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
                  <p><strong>Email:</strong> {formData.email}</p>
                  <p><strong>Phone:</strong> {formData.phone}</p>
                  <p><strong>Age:</strong> {formData.age}</p>
                </div>
              </div>

              {formData.specialRequests && (
                <div className="border-t border-slate-600 pt-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Special Requests</h3>
                  <p className="text-slate-300">{formData.specialRequests}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={`font-semibold py-3 px-8 rounded-lg transition-all duration-300 ${
                currentStep === 1 
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                  : 'bg-slate-700 hover:bg-slate-600 text-white'
              }`}
            >
              Previous
            </button>
            
            {currentStep < 4 ? (
              <button
                onClick={handleNext}
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleBooking}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/25"
              >
                Book Now
              </button>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="text-center">
            <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Secure Payment</h3>
            <p className="text-slate-300">Your payment information is protected with bank-level security encryption.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Insurance Coverage</h3>
            <p className="text-slate-300">Comprehensive insurance options to keep you protected on the road.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">5-Star Service</h3>
            <p className="text-slate-300">Award-winning customer service and well-maintained vehicles.</p>
          </div>
        </div>
      </div>
    </div>
  );
}