import React, { useState, useEffect } from 'react';
import { Menu, X, Car, Phone, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState({ name: '', email: '', phone: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name') || 'John Doe';
    const email = localStorage.getItem('email') || 'johndoe@example.com';
    const phone = localStorage.getItem('phone') || '+91 1234567890';

    setIsAuthenticated(!!token);
    setUserData({ name, email, phone });
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <header className="bg-black border-b border-blue-900 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Car className="h-8 w-8 text-blue-400" />
            <div>
              <h1 className="text-xl font-bold text-white">TopCar</h1>
              <p className="text-xs text-blue-400">by Nexora</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-blue-400 transition-colors">Home</Link>
            <a href="#about" className="text-white hover:text-blue-400 transition-colors">About</a>
            <a href="#services" className="text-white hover:text-blue-400 transition-colors">Services</a>
            <Link to="/locations" className="text-white hover:text-blue-400 transition-colors">Location</Link>
          </nav>

          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-sm">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-white">+91 1234567890</span>
              </div>
              <div className="flex items-center space-x-1 text-sm">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-white">topcar@nexora.com</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {isAuthenticated ? (
                <div className="relative group">
                  <div className="cursor-pointer text-white bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-600 text-lg">
                    👤
                  </div>
                  <div className="absolute top-12 right-0 bg-white text-black rounded-md shadow-lg p-4 w-64 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                    <h3 className="font-semibold mb-2">Profile Details</h3>
                    <p><strong>Name:</strong> {userData.name}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>Phone:</strong> {userData.phone}</p>
                    <button
                      onClick={handleLogout}
                      className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md font-medium transition cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <Link to="/login" className="text-white hover:text-blue-400 transition-colors font-medium">
                    Login
                  </Link>
                  <Link
                    to="/registration"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all transform hover:scale-105"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white hover:text-blue-400"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-gray-900 rounded-lg mt-2 py-4 px-4 border border-blue-900">
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="text-white hover:text-blue-400 transition-colors py-2">Home</Link>
              <a href="#about" className="text-white hover:text-blue-400 transition-colors py-2">About</a>
              <a href="#services" className="text-white hover:text-blue-400 transition-colors py-2">Services</a>
              <Link to="/locations" className="text-white hover:text-blue-400 transition-colors py-2">Location</Link>

              <div className="border-t border-blue-900 pt-3 mt-3">
                {isAuthenticated ? (
                  <div className="text-white space-y-2 text-sm">
                    <p><strong>Name:</strong> {userData.name}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>Phone:</strong> {userData.phone}</p>
                    <button
                      onClick={handleLogout}
                      className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md font-medium transition cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-3">
                    <Link to="/login" className="text-white hover:text-blue-400 transition-colors py-2 font-medium">
                      Login
                    </Link>
                    <Link
                      to="/registration"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all text-center"
                    >
                      Register
                    </Link>
                  </div>
                )}

                <div className="flex items-center space-x-2 text-sm text-white mt-4">
                  <Phone className="h-4 w-4 text-blue-400" />
                  <span>+91 1234567890</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-white">
                  <Mail className="h-4 w-4 text-blue-400" />
                  <span>topcar@nexora.com</span>
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