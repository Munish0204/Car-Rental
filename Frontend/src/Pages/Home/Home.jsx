import React, { useState, useEffect } from 'react';
import { Car, Shield, Clock, MapPin, Star, ArrowRight, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TopCarWelcome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const heroSlides = [
    {
      title: "Premium Car Rentals",
      subtitle: "Experience luxury and comfort with our premium fleet",
      image: "🚗"
    },
    {
      title: "Affordable Rates",
      subtitle: "Best prices guaranteed with transparent pricing",
      image: "💰"
    },
    {
      title: "24/7 Support",
      subtitle: "Round-the-clock assistance for your peace of mind",
      image: "🛡️"
    }
  ];

  const features = [
    {
      icon: Car,
      title: "Premium Fleet",
      description: "Choose from our extensive collection of well-maintained, modern vehicles"
    },
    {
      icon: Shield,
      title: "Fully Insured",
      description: "Complete insurance coverage for worry-free driving experience"
    },
    {
      icon: Clock,
      title: "24/7 Service",
      description: "Round-the-clock customer support and roadside assistance"
    },
    {
      icon: MapPin,
      title: "Multiple Locations",
      description: "Convenient pickup and drop-off points across the city"
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-blue-950/30">
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full bg-gradient-to-r from-blue-500/5 to-transparent animate-pulse"></div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-bounce"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-400/10 rounded-full blur-xl animate-pulse"></div>

        <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
          {/* Logo Section */}
          <div className={`mb-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center space-x-3 mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                <Car className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  TopCar
                </h1>
                <p className="text-gray-400 text-sm">by Nexora</p>
              </div>
            </div>
          </div>

          {/* Hero Content with Slides */}
          <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="mb-8">
              <div className="text-6xl mb-4 animate-bounce">
                {heroSlides[currentSlide].image}
              </div>
              <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent">
                {heroSlides[currentSlide].title}
              </h2>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                {heroSlides[currentSlide].subtitle}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 flex items-center space-x-2">
                <span>Book Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <Link to="/post-car" className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 flex items-center space-x-2">
                <span>Rent Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="border-2 border-blue-500 hover:bg-blue-500/10 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105">
                View Fleet
              </button>
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center space-x-2">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'bg-blue-500 scale-125' : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-blue-500 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-blue-500 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black"></div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Why Choose TopCar?
            </h3>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience the difference with our premium car rental services
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-blue-500/50 rounded-2xl p-8 text-center transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/10"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold mb-4 text-white">{feature.title}</h4>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-blue-900/20 to-blue-800/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "5000+", label: "Happy Customers" },
              { number: "200+", label: "Premium Cars" },
              { number: "24/7", label: "Support" },
              { number: "15+", label: "Locations" }
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 to-transparent"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h3 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
            Ready to Hit the Road?
          </h3>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Book your perfect ride today and experience the TopCar difference
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <button className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-12 py-5 rounded-full text-xl font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25 flex items-center space-x-3">
              <Phone className="w-6 h-6" />
              <span>Call Now</span>
            </button>
            <button className="group border-2 border-blue-500 hover:bg-blue-500/10 px-12 py-5 rounded-full text-xl font-bold transition-all duration-300 transform hover:scale-105 flex items-center space-x-3">
              <Mail className="w-6 h-6" />
              <span>Email Us</span>
            </button>
          </div>

          <div className="flex justify-center space-x-1 text-blue-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-current" />
            ))}
            <span className="ml-3 text-gray-300">Rated 5.0 by our customers</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-800 bg-black/50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Car className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-lg font-bold text-blue-400">TopCar</div>
              <div className="text-xs text-gray-400">by Nexora</div>
            </div>
          </div>
          <p className="text-gray-400">
            © 2025 Nexora. All rights reserved. | Premium car rental services you can trust.
          </p>
        </div>
      </footer>
    </div>
  );
}