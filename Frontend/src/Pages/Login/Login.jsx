import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Car, ArrowLeft, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear errors on input
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/accounts/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password
        })
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token); // save token
        window.location.href = '/'; // redirect to home
      } else {
        alert(data.detail || 'Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Server error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative z-10 w-full max-w-md">
        <a href="/" className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 mb-6">
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Home</span>
        </a>

        <div className="bg-black/80 backdrop-blur-sm border border-blue-900 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Car className="h-8 w-8 text-blue-400" />
              <div>
                <h1 className="text-2xl font-bold text-white">TopCar</h1>
                <p className="text-xs text-blue-400">by Nexora</p>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-gray-400">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 bg-gray-900 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                    errors.username ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 focus:ring-blue-500'
                  }`}
                  placeholder="Enter your username"
                />
              </div>
              {errors.username && <p className="text-sm text-red-500 mt-1">{errors.username}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 bg-gray-900 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                    errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 focus:ring-blue-500'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm text-gray-300">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="mr-2 h-4 w-4 rounded border-gray-600 bg-gray-900 text-blue-600 focus:ring-blue-500"
                />
                Remember me
              </label>
              <a href="#" className="text-sm text-blue-400 hover:text-blue-300">Forgot password?</a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-semibold py-3 px-4 rounded-lg transition-all transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Sign up link */}
          <div className="mt-6 text-center text-gray-400">
            Don't have an account?{' '}
            <a href="/registration" className="text-blue-400 hover:text-blue-300 font-medium">
              Sign up here
            </a>
          </div>
        </div>

        <div className="text-center mt-6 text-gray-500 text-sm">
          &copy; 2024 TopCar by Nexora. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Login;
  