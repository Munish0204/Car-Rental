import React, { useState } from 'react';
import { Menu, X, Car, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-black border-b border-blue-900 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Car className="h-8 w-8 text-blue-400" />
            <div>
              <h1 className="text-xl font-bold text-white">TopCar</h1>
              <p className="text-xs text-blue-400">by Nexora</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-blue-400 transition-colors">Home</Link>
            <a href="#about" className="text-white hover:text-blue-400 transition-colors">About</a>
            <a href="#services" className="text-white hover:text-blue-400 transition-colors">Services</a>
            <a href="#inventory" className="text-white hover:text-blue-400 transition-colors">Inventory</a>
            <a href="#contact" className="text-white hover:text-blue-400 transition-colors">Contact</a>
          </nav>

          {/* Contact Info & Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-sm">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-white">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-1 text-sm">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-white">info@topcar.com</span>
              </div>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-3">
              <Link to="/login" className="text-white hover:text-blue-400 transition-colors font-medium">
                Login
              </Link>
              <Link
                to="/registration"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all transform hover:scale-105"
              >
                Register
              </Link>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white hover:text-blue-400"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-900 rounded-lg mt-2 py-4 px-4 border border-blue-900">
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="text-white hover:text-blue-400 transition-colors py-2">Home</Link>
              <a href="#about" className="text-white hover:text-blue-400 transition-colors py-2">About</a>
              <a href="#services" className="text-white hover:text-blue-400 transition-colors py-2">Services</a>
              <a href="#inventory" className="text-white hover:text-blue-400 transition-colors py-2">Inventory</a>
              <a href="#contact" className="text-white hover:text-blue-400 transition-colors py-2">Contact</a>

              {/* Auth Buttons */}
              <div className="border-t border-blue-900 pt-3 mt-3">
                <div className="flex flex-col space-y-3 mb-4">
                  <Link to="/login" className="text-white hover:text-blue-400 transition-colors py-2 text-left font-medium">
                    Login
                  </Link>
                  <Link
                    to="/registration"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all text-center"
                  >
                    Register
                  </Link>
                </div>

                {/* Contact Info */}
                <div className="flex items-center space-x-2 text-sm text-white mb-2">
                  <Phone className="h-4 w-4 text-blue-400" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-white">
                  <Mail className="h-4 w-4 text-blue-400" />
                  <span>info@topcar.com</span>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
