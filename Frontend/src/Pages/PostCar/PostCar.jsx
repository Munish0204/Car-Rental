import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Car, DollarSign, Upload, Calendar, Users, Fuel, Shield, Image as ImageIcon, Plus, X } from 'lucide-react';

const PostCar = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  
  const [carData, setCarData] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    color: '',
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    pricePerDay: '',
    capacity: '5',
    description: '',
    features: [],
    images: []
  });

  // Available features for checkbox selection
  const availableFeatures = [
    'Air Conditioning', 
    'Navigation System', 
    'Bluetooth', 
    'Backup Camera', 
    'Sunroof',
    'Heated Seats',
    'Cruise Control',
    'Parking Sensors',
    'Premium Audio',
    'Leather Seats'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData({
      ...carData,
      [name]: value
    });
  };

  const handleFeatureToggle = (feature) => {
    setCarData(prevData => {
      if (prevData.features.includes(feature)) {
        return {
          ...prevData,
          features: prevData.features.filter(f => f !== feature)
        };
      } else {
        return {
          ...prevData,
          features: [...prevData.features, feature]
        };
      }
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    // Placeholder for image URLs - in production, replace with actual upload logic
    const imageUrls = files.map(file => URL.createObjectURL(file));
    
    setCarData({
      ...carData,
      images: [...carData.images, ...imageUrls]
    });
  };

  const removeImage = (index) => {
    const updatedImages = [...carData.images];
    updatedImages.splice(index, 1);
    setCarData({
      ...carData,
      images: updatedImages
    });
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8000/api/cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(carData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to post car');
      }

      setSuccess(true);
      // Redirect to the newly created car details page after a short delay
      setTimeout(() => {
        navigate(`/cars/${data._id}`);
      }, 2000);
    } catch (error) {
      console.error('Error posting car:', error);
      setError(error.message || 'Failed to post car. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-20">
      {/* Hero Section with Gradient Background */}
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
            Rent Out Your <span className="text-blue-400">Car</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Join our community of car owners and earn money by sharing your vehicle when you're not using it.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-5xl px-4 -mt-16">
        <div className="bg-black/80 backdrop-blur-sm border border-blue-900/40 rounded-2xl overflow-hidden shadow-xl shadow-blue-900/20">
          {/* Progress Steps */}
          <div className="px-8 py-6 border-b border-gray-800">
            <div className="flex justify-between items-center">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex flex-col items-center">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-medium
                    ${currentStep === step
                      ? 'bg-blue-600 text-white'
                      : currentStep > step
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-800 text-gray-400'
                    }`}
                  >
                    {step}
                  </div>
                  <span className="mt-2 text-sm text-gray-400">
                    {step === 1 ? 'Car Details' : step === 2 ? 'Features' : 'Images'}
                  </span>
                </div>
              ))}
            </div>
            <div className="relative mt-2">
              <div className="absolute top-0 left-0 h-1 bg-gray-700 w-full rounded-full"></div>
              <div
                className="absolute top-0 left-0 h-1 bg-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>

          {error && (
            <div className="mx-8 mt-6 bg-red-900/40 border border-red-500 text-red-100 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {success && (
            <div className="mx-8 mt-6 bg-green-900/40 border border-green-500 text-green-100 px-4 py-3 rounded-lg">
              Car successfully posted! Redirecting to car details...
            </div>
          )}

          {/* Form Content */}
          <form onSubmit={handleSubmit}>
            <div className="p-8">
              {/* Step 1: Basic Car Details */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Tell us about your car</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Car Make */}
                    <div className="space-y-2">
                      <label htmlFor="make" className="block font-medium text-gray-200">Car Make*</label>
                      <div className="relative group">
                        <Car className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 h-5 w-5" />
                        <input
                          type="text"
                          id="make"
                          name="make"
                          value={carData.make}
                          onChange={handleChange}
                          placeholder="e.g. Toyota"
                          className="w-full pl-10 pr-4 py-3 bg-gray-800/80 border border-gray-700 group-hover:border-blue-500 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-800/50 focus:outline-none transition-all"
                          required
                        />
                      </div>
                    </div>

                    {/* Car Model */}
                    <div className="space-y-2">
                      <label htmlFor="model" className="block font-medium text-gray-200">Car Model*</label>
                      <div className="relative group">
                        <input
                          type="text"
                          id="model"
                          name="model"
                          value={carData.model}
                          onChange={handleChange}
                          placeholder="e.g. Camry"
                          className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700 group-hover:border-blue-500 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-800/50 focus:outline-none transition-all"
                          required
                        />
                      </div>
                    </div>

                    {/* Year */}
                    <div className="space-y-2">
                      <label htmlFor="year" className="block font-medium text-gray-200">Year*</label>
                      <div className="relative group">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 h-5 w-5" />
                        <input
                          type="number"
                          id="year"
                          name="year"
                          value={carData.year}
                          onChange={handleChange}
                          min="1990"
                          max={new Date().getFullYear()}
                          placeholder="e.g. 2021"
                          className="w-full pl-10 pr-4 py-3 bg-gray-800/80 border border-gray-700 group-hover:border-blue-500 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-800/50 focus:outline-none transition-all"
                          required
                        />
                      </div>
                    </div>

                    {/* Color */}
                    <div className="space-y-2">
                      <label htmlFor="color" className="block font-medium text-gray-200">Color*</label>
                      <div className="relative group">
                        <input
                          type="text"
                          id="color"
                          name="color"
                          value={carData.color}
                          onChange={handleChange}
                          placeholder="e.g. Black"
                          className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700 group-hover:border-blue-500 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-800/50 focus:outline-none transition-all"
                          required
                        />
                      </div>
                    </div>

                    {/* Price Per Day */}
                    <div className="space-y-2">
                      <label htmlFor="pricePerDay" className="block font-medium text-gray-200">Price Per Day ($)*</label>
                      <div className="relative group">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 h-5 w-5" />
                        <input
                          type="number"
                          id="pricePerDay"
                          name="pricePerDay"
                          value={carData.pricePerDay}
                          onChange={handleChange}
                          min="1"
                          placeholder="e.g. 50"
                          className="w-full pl-10 pr-4 py-3 bg-gray-800/80 border border-gray-700 group-hover:border-blue-500 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-800/50 focus:outline-none transition-all"
                          required
                        />
                      </div>
                    </div>

                    {/* Capacity */}
                    <div className="space-y-2">
                      <label htmlFor="capacity" className="block font-medium text-gray-200">Capacity (persons)*</label>
                      <div className="relative group">
                        <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 h-5 w-5" />
                        <input
                          type="number"
                          id="capacity"
                          name="capacity"
                          value={carData.capacity}
                          onChange={handleChange}
                          min="1"
                          max="10"
                          placeholder="e.g. 5"
                          className="w-full pl-10 pr-4 py-3 bg-gray-800/80 border border-gray-700 group-hover:border-blue-500 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-800/50 focus:outline-none transition-all"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Transmission */}
                    <div className="space-y-2">
                      <label htmlFor="transmission" className="block font-medium text-gray-200">Transmission*</label>
                      <div className="relative group">
                        <select
                          id="transmission"
                          name="transmission"
                          value={carData.transmission}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700 group-hover:border-blue-500 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-800/50 focus:outline-none appearance-none transition-all"
                          required
                        >
                          <option value="Automatic">Automatic</option>
                          <option value="Manual">Manual</option>
                          <option value="Semi-Automatic">Semi-Automatic</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                          <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Fuel Type */}
                    <div className="space-y-2">
                      <label htmlFor="fuelType" className="block font-medium text-gray-200">Fuel Type*</label>
                      <div className="relative group">
                        <Fuel className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 h-5 w-5" />
                        <select
                          id="fuelType"
                          name="fuelType"
                          value={carData.fuelType}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 bg-gray-800/80 border border-gray-700 group-hover:border-blue-500 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-800/50 focus:outline-none appearance-none transition-all"
                          required
                        >
                          <option value="Gasoline">Gasoline</option>
                          <option value="Diesel">Diesel</option>
                          <option value="Electric">Electric</option>
                          <option value="Hybrid">Hybrid</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                          <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <label htmlFor="description" className="block font-medium text-gray-200">Description*</label>
                    <textarea
                      id="description"
                      name="description"
                      value={carData.description}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Describe your car, its condition, and any special features..."
                      className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700 hover:border-blue-500 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-800/50 focus:outline-none transition-all"
                      required
                    ></textarea>
                    <p className="text-sm text-gray-400">
                      A detailed description helps renters understand what makes your car special.
                    </p>
                  </div>
                </div>
              )}

              {/* Step 2: Features */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6">What features does your car have?</h2>
                  
                  <p className="text-gray-300 mb-6">
                    Select all the features that apply to your vehicle. These details help renters find the right car for their needs.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {availableFeatures.map(feature => (
                      <div 
                        key={feature} 
                        className={`relative flex items-center p-4 rounded-xl cursor-pointer transition-all duration-200
                          ${carData.features.includes(feature) 
                            ? 'bg-blue-900/30 border-blue-500 border-2' 
                            : 'bg-gray-800/60 border border-gray-700 hover:border-blue-400'}`}
                        onClick={() => handleFeatureToggle(feature)}
                      >
                        <input
                          type="checkbox"
                          id={`feature-${feature}`}
                          checked={carData.features.includes(feature)}
                          onChange={() => {}} // Handled by the div's onClick
                          className="sr-only"
                        />
                        <Shield className={`h-5 w-5 ${carData.features.includes(feature) ? 'text-blue-400' : 'text-gray-400'}`} />
                        <label 
                          htmlFor={`feature-${feature}`} 
                          className={`ml-3 text-sm font-medium cursor-pointer ${carData.features.includes(feature) ? 'text-blue-100' : 'text-gray-300'}`}
                        >
                          {feature}
                        </label>
                        
                        {carData.features.includes(feature) && (
                          <div className="absolute top-1 right-1">
                            <svg className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Images */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Upload images of your car</h2>
                  
                  <p className="text-gray-300 mb-6">
                    Great photos increase your chances of renting out your car. Include pictures of the exterior, interior, and any special features.
                  </p>
                  
                  {/* Image Upload Box */}
                  <div className="border-2 border-dashed border-blue-900/50 bg-blue-900/10 rounded-xl p-8 text-center cursor-pointer group hover:border-blue-500 transition-all">
                    <input
                      type="file"
                      id="images"
                      multiple
                      onChange={handleImageChange}
                      className="hidden"
                      accept="image/*"
                    />
                    <label htmlFor="images" className="cursor-pointer w-full h-full block">
                      <div className="flex flex-col items-center justify-center">
                        <div className="bg-blue-900/40 p-4 rounded-full mb-4 group-hover:bg-blue-700 transition-colors">
                          <ImageIcon className="h-10 w-10 text-blue-300" />
                        </div>
                        <h4 className="text-blue-300 text-lg mb-2">Drag photos here or click to upload</h4>
                        <p className="text-gray-400 text-sm mb-4">PNG, JPG, GIF up to 10MB</p>
                        <button
                          type="button"
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white flex items-center transition-colors"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Photos
                        </button>
                      </div>
                    </label>
                  </div>

                  {/* Preview Images */}
                  {carData.images.length > 0 && (
                    <div className="mt-8">
                      <h4 className="text-lg font-medium text-white mb-4">Uploaded Images ({carData.images.length})</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {carData.images.map((img, index) => (
                          <div key={index} className="relative group">
                            <img 
                              src={img} 
                              alt={`Car upload ${index + 1}`} 
                              className="w-full h-40 object-cover rounded-lg border border-gray-800 group-hover:border-blue-500 transition-all"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-2 right-2 bg-red-600/80 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-700 transition-all"
                              aria-label="Remove image"
                            >
                              <X className="h-4 w-4" />
                            </button>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 rounded-lg transition-opacity">
                              <div className="absolute bottom-2 left-2 text-xs text-white font-medium">
                                {index === 0 ? 'Main Image' : `Image ${index + 1}`}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              )}
            </div>

            {/* Form Navigation */}
            <div className="border-t border-gray-800 px-8 py-6 bg-black/40 flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${
                  currentStep === 1 
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
                disabled={currentStep === 1}
              >
                Previous
              </button>

              <div className="flex gap-3">
                {currentStep !== totalSteps ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all transform hover:scale-105"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isLoading || carData.images.length === 0}
                    className={`px-8 py-2.5 rounded-lg font-medium transition-all transform
                      ${isLoading 
                        ? 'bg-blue-800 cursor-not-allowed' 
                        : carData.images.length === 0
                        ? 'bg-gray-700 cursor-not-allowed text-gray-300'
                        : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white hover:scale-105 hover:shadow-lg hover:shadow-blue-600/20'
                      }`}
                  >
                    {isLoading ? 'Posting...' : 'Post Your Car'}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-gradient-to-br from-blue-900/20 to-black/90 p-6 rounded-xl border border-blue-900/30 shadow-lg">
            <div className="bg-blue-900/40 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <DollarSign className="text-blue-400 h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Earn Extra Income</h3>
            <p className="text-gray-400">
              Your car can earn money when you're not using it. Most car owners make $500-$1000 per month.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-900/20 to-black/90 p-6 rounded-xl border border-blue-900/30 shadow-lg">
            <div className="bg-blue-900/40 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Shield className="text-blue-400 h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Insurance Coverage</h3>
            <p className="text-gray-400">
              We provide comprehensive insurance coverage for your vehicle during every rental period.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-900/20 to-black/90 p-6 rounded-xl border border-blue-900/30 shadow-lg">
            <div className="bg-blue-900/40 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Users className="text-blue-400 h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Verified Renters</h3>
            <p className="text-gray-400">
              All renters go through a thorough verification process, ensuring your car is in good hands.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCar;